import React from "react";
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`
};

const Todo = ({ todo, toggleComplete, deleteTodo, startEditing, updateTodo, editInput, setEditInput, editingTodo }) => {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
  <div className={style.row}>
    <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''} />
    {editingTodo === todo.id ? (
      <input
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
        className="border p-2 w-full"
        type="text"
      />
    ) : (
      <p onClick={() => toggleComplete(todo)} className={todo.completed ? style.textComplete : style.text}>{todo.text}</p>
    )}
  </div>
  {editingTodo === todo.id ? (
    <button onClick={() => updateTodo(todo.id)}>Save</button>
  ) : (
    <div className="flex items-center space-x-4"> {/* Container to align the icons */}
      <button onClick={() => startEditing(todo)}>{<FaRegEdit />}</button>
      <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
    </div>
  )}
</li>

  );
};

export default Todo;
