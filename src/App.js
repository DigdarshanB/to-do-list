import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import { db } from './firebase';
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#C9FFBF] to-[#FEB47B]`,
  container: `bg-slate-100 max-w-[700px] w-full m-auto rounded-md shadow-xl p-4 mt-10`,
  heading: `text-3xl text-center text-black-400 p-2 mb-4 `,
  form: `flex justify-between mb-6`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-blue-500 text-slate-100`,
  count: `text-center p-2`,
  top: `text-4xl font-bold text-center text-red-500 italic mb-6 mt-4`};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState(''); // State for the new text being entered
  const [editingTodo, setEditingTodo] = useState(null); // State to track which todo is being edited

  //create todo
  const createActivity = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please add an activity!');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

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

  // Toggle completion status of todo
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    });
  };

  // Start editing a todo
  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setEditInput(todo.text);
  };

  // Update todo in firebase
  const updateTodo = async (id) => {
    await updateDoc(doc(db, 'todos', id), {
      text: editInput,
    });
    setEditingTodo(null);
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <>
      <h1 className={style.top}>r e m i n d e r</h1>
      <div className={style.bg}>
        <div className={style.container}>
          <h3 className={style.heading}>Things to do : </h3>
          <form onSubmit={createActivity} className={style.form}>
            <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type='text' placeholder='Add activity' />
            <button className={style.button}><AiOutlinePlus size={30} /> </button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <Todo key={index}
                todo={todo} toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                startEditing={startEditing} // Pass startEditing function
                updateTodo={updateTodo} // Pass updateTodo function
                editInput={editInput}
                setEditInput={setEditInput}
                editingTodo={editingTodo}
              />
            ))}
          </ul>
          <p className={style.count}>You have {todos.length} tasks.</p>
        </div>
      </div>
    </>
  );
}

export default App;
