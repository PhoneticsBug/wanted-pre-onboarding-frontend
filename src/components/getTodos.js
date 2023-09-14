import React, { useState, useEffect } from "react";
import axios from "axios";

import TodoEdit from "./updateTodo"
import TodoDelete from "./deleteTodo";

const TodoList = ({ onDeleteTodo, onEditTodo }) => {
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null); // 수정 중인 todo의 ID를 관리하는 상태
  const [editingTodoText, setEditingTodoText] = useState(""); // 수정 중인 todo의 내용을 관리하는 상태

  const fetchData = async () => {
    const apiUrl = "https://www.pre-onboarding-selection-task.shop/todos";
    const access_token = localStorage.getItem("access_token");

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("할 일 목록을 불러오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleTodo = (todo) => {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    const apiUrl = `https://www.pre-onboarding-selection-task.shop/todos/${todo.id}`;
    const access_token = localStorage.getItem("access_token");

    axios
      .put(
        apiUrl,
        updatedTodo,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          fetchData(); // 수정 후 데이터 다시 가져오기
        } else {
          console.error("할 일을 수정하는 데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("할 일을 수정하는 데 실패했습니다.", error);
      });
  };

  const handleEditClick = (todo) => {
    // 수정 모드를 활성화하고 해당 Todo의 ID와 내용을 상태에 저장
    setEditingTodoId(todo.id);
    setEditingTodoText(todo.todo);
    onEditTodo(todo.todo);
  };

  const handleDeleteClick = (todoId) => {
    const apiUrl = `https://www.pre-onboarding-selection-task.shop/todos/${todoId}`;
    const access_token = localStorage.getItem("access_token");

    axios
      .delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        if (response.status !== 204) {
          console.error("할 일을 삭제하는 데 실패했습니다.");
        } else {
          // 삭제 후 해당 todo를 상태에서 제거
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
        }
      })
      .catch((error) => {
        console.error("할 일을 삭제하는 데 실패했습니다.", error);
      });
  };

  const handleSaveClick = (todoId) => {
    // 수정 모드에서 저장 버튼 클릭 시 수정 모드 비활성화
    setEditingTodoId(null);
  
    // 수정된 내용과 isCompleted 상태를 가져와서 updatedTodo 객체 구성
    const updatedTodo = {
      todo: editingTodoText,
      isCompleted: todos.find((todo) => todo.id === todoId).isCompleted, // 현재 상태 유지
    };
  
    // 서버에 수정된 내용 전송
    const apiUrl = `https://www.pre-onboarding-selection-task.shop/todos/${todoId}`;
    const access_token = localStorage.getItem("access_token");
  
    axios
      .put(
        apiUrl,
        updatedTodo,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          fetchData(); // 수정 후 데이터 다시 가져오기
        } else {
          console.error("할 일을 수정하는 데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("할 일을 수정하는 데 실패했습니다.", error);
      });
  };

  return (
    <ul>
    {todos.map((todo) => (
      <div >
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => handleToggleTodo(todo)}
        />
        <span>
          {editingTodoId === todo.id ? (
            <TodoEdit
              todo={todo}
              onSaveEdit={(editedTodo) => {
                setTodos((prevTodos) =>
                  prevTodos.map((prevTodo) =>
                    prevTodo.id === editedTodo.id ? editedTodo : prevTodo
                  )
                );
                setEditingTodoId(null);
              }}
            />
          ) : (
            todo.todo
          )}
        </span>
        {editingTodoId === todo.id ? (
          null
        ) : (
          <>
            <button onClick={() => handleEditClick(todo)}>수정</button>
            <TodoDelete // 삭제 컴포넌트 렌더링
              todoId={todo.id}
              onDeleteTodo={(deletedTodoId) => {
                // 삭제 컴포넌트에서 삭제되면 상태 업데이트
                setTodos((prevTodos) =>
                  prevTodos.filter((prevTodo) => prevTodo.id !== deletedTodoId)
                );
              }}
            />
          </>
        )}
      </div>
    ))}
  </ul>
  );
};

export default TodoList;
