import React from "react";
import axios from "axios";

const TodoDelete = ({ todoId, onDeleteTodo }) => {
  const handleDelete = () => {
    // 삭제 요청을 서버에 보냅니다.
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
          onDeleteTodo(todoId); // 삭제 성공 시 상위 컴포넌트로 알립니다.
        }
      })
      .catch((error) => {
        console.error("할 일을 삭제하는 데 실패했습니다.", error);
      });
  };

  return (
    <button onClick={handleDelete}>삭제</button>
  );
};

export default TodoDelete;
