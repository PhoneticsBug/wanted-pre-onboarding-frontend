import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ onAddTodo }) => {
  const [newTodoText, setNewTodoText] = useState("");

  const apiUrl = "https://www.pre-onboarding-selection-task.shop/todos";
  const access_token = localStorage.getItem("access_token");

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
          // 새로운 todo를 추가하는 대신, 상위 컴포넌트에서 상태를 업데이트합니다.
          onAddTodo(response.data); // 새로운 todo를 상위 컴포넌트로 전달
          setNewTodoText(""); // 입력 필드 초기화
        } else {
          console.error("할 일을 추가하는 데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("할 일을 추가하는 데 실패했습니다.", error);
      });
  };

  const handleInputChange = (e) => {
    setNewTodoText(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={newTodoText}
        onChange={handleInputChange}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={handleAddTodo}>추가</button>
    </div>
  );
};

export default TodoForm;