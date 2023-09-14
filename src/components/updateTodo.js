import React, { useState } from "react";
import axios from "axios";

const TodoEdit = ({ todo, onSaveEdit }) => {
  const [editedText, setEditedText] = useState(todo.todo); // todo 내용을 변경하므로 todo.todo를 사용

  const handleSaveEdit = () => {
    // 수정된 내용을 서버에 업데이트
    const apiUrl = `https://www.pre-onboarding-selection-task.shop/todos/${todo.id}`;
    const access_token = localStorage.getItem("access_token");

    axios
      .put(
        apiUrl,
        { todo: editedText, isCompleted: todo.isCompleted },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // 수정된 todo를 상위 컴포넌트로 전달하여 업데이트
          onSaveEdit(response.data);
        } else {
          console.error("할 일을 수정하는 데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("할 일을 수정하는 데 실패했습니다.", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
      />
      <button onClick={handleSaveEdit}>저장</button>
    </div>
  );
};

export default TodoEdit;
