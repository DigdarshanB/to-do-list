import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'; // Use solid icons if light is not available

import Todo from './Todo';
import { db } from './firebase';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';


const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2C5364] to-[#6c757d]`,
  container: `bg-slate-100 max-w-[700px] w-full m-auto rounded-md shadow-xl p-4 mt-10`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-blue-500 text-slate-100`,
  count: `text-center p-2`
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //create todo
  const createActivity = async (e) => {
    e.preventDefault(e)
    if(input === ''){
      alert('Please add an activity!')
      return
    }
    await addDoc(collection(db,'todos'),{
      text: input,
      completed: false,

    })
    setInput('');
  }

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  //update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db,'todos',todo.id),{
      completed: !todo.completed
    })
  }

  //delete Todo
const deleteTodo = async (id)=>{
  await deleteDoc(doc(db,'todos',id))
}
return (
  <div className={style.bg}>
    <div className={style.container}>
      <h3 className={style.heading}>Things to do :</h3>
      <form onSubmit={createActivity} className={style.form}>
        <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type='text' placeholder='Add activity' />
        <button className={style.button}><AiOutlinePlus size={30} /></button>
        <button className={style.button1}><i className="fas fa-pen"></i></button> {/* Using CDN */}
      </form>
      <ul>
        {todos.map((todo, index) => (
          <Todo key={index}
            todo={todo} toggleComplete={toggleComplete}
            deleteTodo={deleteTodo} />
        ))}
      </ul>
      <p className={style.count}>You have {todos.length} tasks.</p>
    </div>
  </div>
);
}

export default App;

