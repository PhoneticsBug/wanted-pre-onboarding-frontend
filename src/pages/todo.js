import React, { useState } from "react";

import "../styles/todo.css"

const TodoPage = () => {
  const [todos, setTodos] = useState([]);

  const [newTodoText, setNewTodoText] = useState("");
  const [showNewTodoInput, setShowNewTodoInput] = useState(false);
  
  // edit mode 관련 state
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const handleAddTodo = () => {
    if (newTodoText.trim() === "") {
        return;
    }
    const newTodo = {
        id: todos.length + 1,
        text: newTodoText,
        isCompleted: false
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setNewTodoText("");
    setShowNewTodoInput(false);
  };

  const handleInputChange = (e) => {
    setNewTodoText(e.target.value);
  };

  // 삭제 함수
  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // 수정 함수
  const handleEditClick = (id) => {
    setIsEditing(true);
    setCurrentEditId(id);
    let todoToEdit = todos.find(todo=>todo.id===id)
    if(todoToEdit){
        setNewTodoText(todoToEdit.text)
    }
  };

  // 수정 적용 함수
  const handleApplyEdits=()=>{
    let updatedTods=todos.map((todo)=>{
       if(todo.id===currentEditId){
         return {...todo,text:newTodoText}
       }else{
         return todo;
       }
    });
    
    setTodos(updatedTods)
    setIsEditing(false)
    setCurrentEditId(null)
    setNewTodoText("")
}

  return (
    <div className="wrapper">
    <h1 className="todo-title">This is the Todo page</h1>

    {!showNewTodoInput && !isEditing && (
    <button 
      onClick={() => setShowNewTodoInput(true)}
      className="todo-maker">
        새로운 todo 만들기
    </button>
    )}

    {(showNewTodoInput || isEditing )&& (
    <>
    {/* 새로운 할 일 입력창 */}
    <input
    type="text"
    value={newTodoText}
    onChange={handleInputChange}
    placeholder="할 일을 입력하세요"
    className="todo-input"
    />
    <button 
      onClick={isEditing ? handleApplyEdits : handleAddTodo}
      className="add-btn">
        {isEditing ? "수정하기" : "추가"}
    </button>
    </>
    )}

    <ul>
    {todos.map(td=>(
    <li key={td.id}>
    <label>
    <input type="checkbox" checked={td.isCompleted} />
    <span>{td.text}</span>
    <button onClick={() => handleEditClick(td.id)}> 수정 </button> {/* 수정 버튼 클릭 시 해당 todo 수정 */}
    <button onClick={() => handleDeleteTodo(td.id)}> 삭제 </button> {/* 삭제 버튼 클릭 시 해당 todo 삭제 */}
    </label>
    </li>
    ))}
    </ul>
    </div>
  )
};

export default TodoPage;
