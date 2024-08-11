import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import { db } from './firebase/firebase'; // Ensure this is correctly pointing to your Firebase config
import { query, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const styles = {
  bg: `min-h-[80vh] flex flex-col justify-between w-full bg-gradient-to-b from-[#FAF0E6] to-[#343434]`,
  container: `bg-[#DCDCDC] max-w-[700px] w-full m-auto rounded-md shadow-xl p-4 flex flex-col sm:p-6 md:p-8 lg:p-10`,
  heading: `text-2xl text-center text-black p-2 mb-4 sm:text-3xl md:text-4xl`,
  form: `flex flex-col sm:flex-row justify-between mb-6`,
  input: `bg-[#F0EAD6] border p-2 w-full text-lg sm:text-xl sm:mb-0 sm:mr-2 mb-4`,
  button: `border p-4 bg-blue-500 text-slate-100 sm:w-auto w-full`,
  count: `text-center p-2 text-base sm:text-lg`,
  list: `flex-grow`
}

function List() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (!userEmail) {
      navigate('/'); // Redirect to login if not logged in
    }
  }, [navigate, userEmail]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const createActivity = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please add an activity!');
      return;
    }
    const user = localStorage.getItem('userEmail');
    await addDoc(collection(db, 'userActivities', user, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  useEffect(() => {
    const q = query(collection(db, 'userActivities', userEmail, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, [userEmail]);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'userActivities', userEmail, 'todos', todo.id), {
      completed: !todo.completed
    });
  };

  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setEditInput(todo.text);
  };

  const updateTodo = async (id) => {
    await updateDoc(doc(db, 'userActivities', userEmail, 'todos', id), {
      text: editInput,
    });
    setEditingTodo(null);
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'userActivities', userEmail, 'todos', id));
  };

  const handleUserIconClick = () => {
    setShowUserDetails(!showUserDetails);
  };

  return (
    <>
      <Navbar user={{ email: userEmail }} onUserIconClick={handleUserIconClick} showUserDetails={showUserDetails} handleLogout={handleLogout} />
      <div className={styles.bg}>
        <div className={styles.container}>
          <h3 className={styles.heading}>Things to do :</h3>
          <form onSubmit={createActivity} className={styles.form}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.input}
              type='text'
              placeholder='Add activity'
            />
            <button type="submit" className={styles.button}>
              <AiOutlinePlus size={30} />
            </button>
          </form>
          <ul className={styles.list}>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                startEditing={startEditing}
                updateTodo={updateTodo}
                editInput={editInput}
                setEditInput={setEditInput}
                editingTodo={editingTodo}
              />
            ))}
          </ul>
          <p className={styles.count}>You have {todos.length} tasks.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default List;
