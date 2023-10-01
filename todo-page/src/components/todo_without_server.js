// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import "../styles/todo.css"

// const TodoPage = () => {
//   const [todos, setTodos] = useState([]);

//   const [newTodoText, setNewTodoText] = useState("");
//   const [showNewTodoInput, setShowNewTodoInput] = useState(false);
  
//   // edit mode 관련 state
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentEditId, setCurrentEditId] = useState(null);

//   // 서버 통신 부분
//   const apiUrl = "https://www.pre-onboarding-selection-task.shop/todos";
//   const access_token = localStorage.getItem("access_token");

//   useEffect(() => {
//     axios.get(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     })
//     .then((response) => {
//       if (response.status === 200) {
//         // 서버로부터 할 일 목록을 가져와 상태에 저장합니다.
//         setTodos(response.data);
//       } else {
//         console.error("할 일 목록을 불러오는 데 실패했습니다.");
//       }
//     })
//     .catch((error) => {
//       console.error("할 일 목록을 불러오는 데 실패했습니다.", error);
//     });
//   }, []); // 빈 배열을 전달하여 컴포넌트가 처음 로드될 때만 이펙트가 실행되도록 합니다.
  

//   const handleAddTodo = () => {
//     if (newTodoText.trim() === "") {
//       return;
//     }
  
//     // 새로운 todo 객체를 생성
//     const newTodo = {
//       todo: newTodoText,
//       isCompleted: false,
//     };
  
//     // 서버에 새로운 todo 요청
//     axios
//       .post(apiUrl, newTodo, {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         if (response.status === 201) {
//           // 서버로부터 반환된 새로운 할 일 데이터를 클라이언트 상태에 추가합니다.
//           setTodos((prevTodos) => [...prevTodos, response.data]);
  
//           // 입력 필드를 초기화합니다.
//           setNewTodoText("");
  
//           // 새로운 할 일 입력 필드를 숨깁니다.
//           setShowNewTodoInput(false);
//         } else {
//           console.error("할 일을 추가하는 데 실패했습니다.");
//         }
//       })
//       .catch((error) => {
//         console.error("할 일을 추가하는 데 실패했습니다.", error);
//       });
//   };
  
  
  

//   const handleInputChange = (e) => {
//     setNewTodoText(e.target.value);
//   };

//   // 삭제 함수
//   const handleDeleteTodo = (id) => {
//     setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
//   };

//   // 수정 함수
//   const handleEditClick = (id) => {
//     setIsEditing(true);
//     setCurrentEditId(id);
//     let todoToEdit = todos.find(todo=>todo.id===id)
//     if(todoToEdit){
//         setNewTodoText(todoToEdit.text)
//     }
//   };

//   // 수정 적용 함수
//   const handleApplyEdits=()=>{
//     let updatedTods=todos.map((todo)=>{
//        if(todo.id===currentEditId){
//          return {...todo,text:newTodoText}
//        }else{
//          return todo;
//        }
//     });
    
//     setTodos(updatedTods)
//     setIsEditing(false)
//     setCurrentEditId(null)
//     setNewTodoText("")
// }

//   return (
//     <div className="wrapper">
//     <h1 className="todo-title">This is the Todo page</h1>

//     {!showNewTodoInput && !isEditing && (
//     <button 
//       onClick={() => setShowNewTodoInput(true)}
//       className="todo-maker">
//         새로운 todo 만들기
//     </button>
//     )}

//     {(showNewTodoInput || isEditing )&& (
//     <>
//     {/* 새로운 할 일 입력창 */}
//     <input
//     type="text"
//     value={newTodoText}
//     onChange={handleInputChange}
//     placeholder="할 일을 입력하세요"
//     className="todo-input"
//     />
//     <button 
//       onClick={isEditing ? handleApplyEdits : handleAddTodo}
//       className="add-btn">
//         {isEditing ? "수정하기" : "추가"}
//     </button>
//     </>
//     )}

//     <ul>
//     {todos.map(td=>(
//     <li key={td.id}>
//     <label className="todo-box">
//     <input type="checkbox" checked={td.isCompleted} />
//     <span>{td.text}</span>
//     <div className="ed-btn-group">
//     <button 
//       className="edit-delete-btn"
//       onClick={() => handleEditClick(td.id)}> 수정 </button> {/* 수정 버튼 클릭 시 해당 todo 수정 */}
//     <button 
//       className="edit-delete-btn"
//       onClick={() => handleDeleteTodo(td.id)}> 삭제 </button> {/* 삭제 버튼 클릭 시 해당 todo 삭제 */}
//     </div>
//     </label>
//     </li>
//     ))}
//     </ul>
//     </div>
//   )
// };

// export default TodoPage;
