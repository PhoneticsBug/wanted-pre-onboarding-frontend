import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/todo.css";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodoText, setNewTodoText] = useState("");
  const [editingTodoText, setEditingTodoText] = useState(""); // 수정 중인 todo의 텍스트를 따로 관리

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
    fetchData();
  }, []);

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
          setTodos((prevTodos) => [...prevTodos, response.data]);
          setNewTodoText("");
        } else {
          console.error("할 일을 추가하는 데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("할 일을 추가하는 데 실패했습니다.", error);
      });
  };

  const handleToggleTodo = (todo) => {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };
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
    setEditingTodoText(todo.todo); // 수정 모드로 들어갈 때 현재 텍스트를 저장
  };

  const handleSaveEdit = () => {
    if (editingTodoText.trim() === "") {
      return;
    }
    const updatedTodo = {
      todo: editingTodoText, // 수정 중인 todo의 텍스트 업데이트
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
          setEditingTodoText("");
        } else {
          console.error("할 일을 수정하는 데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("할 일을 수정하는 데 실패했습니다.", error);
      });
  };

  // 수정 모드 취소 처리
  const handleCancelEdit = () => {
    // 이전 내용으로 돌아가기 위해 상태를 이전 텍스트로 설정
    setEditingTodoText(editingTodo.todo);
    setEditingTodo(null);
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
      <div className="content-box">
        <h1 className="todo-title">My Todo Page</h1>
        <div className="new-todo-wrapper">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="할 일을 입력하세요"
            className="new-todo-input"
            data-testid="new-todo-input"
          />
          <button 
            onClick={handleAddTodo} 
            className="new-todo-btn"
            data-testid="new-todo-add-button">
            추가
          </button>
        </div>
        <div>
          {todos.map((todo) => (
            <il key={todo.id} className="todo-list">
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleToggleTodo(todo)}
                className="input-checkbox"
              />
              {editingTodo && editingTodo.id === todo.id ? (
                <div className="checkbox-content">
                  <input
                    type="text"
                    value={editingTodoText}
                    onChange={(e) => setEditingTodoText(e.target.value)}
                    className="edit-todo-input"
                    data-testid="modify-input"
                  />
                  <button 
                    onClick={handleSaveEdit} 
                    className="edit-del-btns"
                    data-testid="submit-button">
                    제출
                  </button>
                  <button 
                    onClick={handleCancelEdit} 
                    className="edit-del-btns"
                    data-testid="cancel-button">
                    취소
                  </button>
                </div>
              ) : (
                <span className="todo-todo">{todo.todo}</span>
              )}
              {editingTodo && editingTodo.id === todo.id ? (
                null
              ) : (
                <div className="edit-del-btns-group">
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="edit-del-btns"
                    data-testid="modify-button"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="edit-del-btns"
                    data-testid="delete-button"
                  >
                    삭제
                  </button>
                </div>
              )}
            </il>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
