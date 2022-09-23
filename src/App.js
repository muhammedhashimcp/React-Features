import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, onSnapshot, query, QuerySnapshot, addDoc,doc,updateDoc } from 'firebase/firestore';
import { AiOutlinePlus } from 'react-icons/ai';
import { db } from './firebase/firebase';
import Todo from './firebase/Todo';

const style = {
	bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
	container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
	heading: `text-3xl font-bold text-center text-gray-800 p-2`,
	form: `flex justify-between`,
	input: `border p-2 w-full text-xl`,
	button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
	count: `text-center p-2`,
};

const App = () => {
	const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  console.log("🚀 ~ file: App.js ~ line 20 ~ App ~ input", input)

	// create todo
	const createTodo = async (e) => {
		e.preventDefault(e);
		if (input === '') {
			alert('Please enter a valid todo');
			return;
		}
		await addDoc(collection(db, 'todos'), {
			text: input,
			completed: false,
		});
		setInput('');
	};

	// read todo
	useEffect(() => {
		const q = query(collection(db, 'todos'));
		const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
			let todosArr = [];
			QuerySnapshot.forEach((doc) => {
				todosArr.push({ ...doc.data(), id: doc.id });
			});
			setTodos(todosArr);
		});
		return () => unsubscribe();
	}, []);
	// Update todo in firebase
	const toggleComplete = async (todo) => {
		await updateDoc(doc(db, 'todos', todo.id), {
			completed: !todo.completed,
		});
	};

	// Delete todo
	const deleteTodo = async (id) => {
		await deleteDoc(doc(db, 'todos', id));
	};

	return (
		<div className={style.bg}>
			<div className={style.container}>
				<h3 className={style.heading}>Todo App</h3>
				<form onSubmit={createTodo} className={style.form}>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className={style.input}
						type="text"
						placeholder="Add todo"
					/>
					<button className={style.button}>
						{' '}
						<AiOutlinePlus size={30} />{' '}
					</button>
				</form>
				<ul>
					{todos.map((todo, index) => {
						return (
							<>
								<Todo
									key={index}
									todo={todo}
									deleteTodo={deleteTodo}
									toggleComplete={toggleComplete}
								/>
							</>
						);
					})}
				</ul>
				{todos.length < 1 ? null : (
					<p
						className={style.count}
					>{`You have ${todos.length} todos`}</p>
				)}
			</div>
		</div>
	);
};

export default App;
