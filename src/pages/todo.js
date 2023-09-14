import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/todo.css";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodoText, setNewTodoText] = useState("");

  const apiUrl = "https://www.pre-onboarding-selection-task.shop/todos";
  const access_token = localStorage.getItem("access_token");

  const fetchData = () => {
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setTodos(response.data);
        } else {
          console.error("할 일 목록을 불러오는 데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("할 일 목록을 불러오는 데 실패했습니다.", error);
      });
  };

  useEffect(() => {
    // 페이지가 처음 로드될 때 데이터를 불러옴
    fetchData();
  }, []); // 빈 배열을 전달하여 최초 로드시에만 실행되도록 함

  const handleAddTodo = () => {
    if (newTodoText.trim() === "") {
      return;
    }

    const newTodo = {
      todo: newTodoText,
      isCompleted: false,
    };

    axios
      .post(apiUrl, newTodo, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          // 새로운 todo를 추가하고 상태를 업데이트
          setTodos((prevTodos) => [...prevTodos, response.data]);
          setNewTodoText(""); // 입력 필드 초기화
        } else {
          console.error("할 일을 추가하는 데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("할 일을 추가하는 데 실패했습니다.", error);
      });
  };

  const handleToggleTodo = (todo) => {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };

    axios
      .put(`${apiUrl}/${todo.id}`, updatedTodo, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          fetchData();
        } else {
          console.error("할 일을 수정하는 데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("할 일을 수정하는 데 실패했습니다.", error);
      });
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setNewTodoText(todo.todo);
  };

  const handleSaveEdit = () => {
    if (newTodoText.trim() === "") {
      return;
    }

    const updatedTodo = {
      todo: newTodoText,
      isCompleted: editingTodo.isCompleted,
    };

    axios
      .put(`${apiUrl}/${editingTodo.id}`, updatedTodo, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          fetchData();
          setEditingTodo(null);
          setNewTodoText("");
        } else {
          console.error("할 일을 수정하는 데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("할 일을 수정하는 데 실패했습니다.", error);
      });
  };

  const handleDeleteTodo = (todoId) => {
    axios
      .delete(`${apiUrl}/${todoId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("할 일을 삭제하는 데 실패했습니다.", error);
      });
  };

  return (
    <div className="wrapper">
      <h1 className="todo-title">This is the Todo page</h1>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={handleAddTodo}>추가</button>
      </div>
      <div>
        {todos.map((todo) => (
            <div key={todo.id}>
            <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleToggleTodo(todo)}
            />
            {editingTodo && editingTodo.id === todo.id ? (
                <div>
                <input
                    type="text"
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>저장</button>
                </div>
            ) : (
                <span>{todo.todo}</span>
            )}
            {editingTodo && editingTodo.id === todo.id ? (
                null
            ) : (
                <>
                <button onClick={() => handleEditClick(todo)}>수정</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
                </>
            )}
            </div>
        ))}
        </div>
    </div>
  );
};

export default TodoPage;
