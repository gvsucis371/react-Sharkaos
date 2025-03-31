import { useState } from "react";

// TodoForm component handles adding new todos
function TodoForm({ todos, setTodos }) {
	const [todo, setThis] = useState({
		id: Date.now(),
		message: "",
	});

	// Updates the message property while preserving id
	const handleChange = (e) => {
		setThis({
			...todo, // Keep other properties intact
			message: e.target.value,
		});
	};

	// Adds the todo to the list and resets the input
	const handleSubmit = (e) => {
		e.preventDefault();
		if (todo.message.trim() === "") return; // Prevent empty entries
		setTodos([todo, ...todos]); // Add the new todo to the top
		setThis({
			id: Date.now(), // Reset with new id
			message: "",
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="todo"
					value={todo.message}
					placeholder="Add a task..."
					onChange={handleChange}
				/>
				<button className="square" type="submit">
					Confirm
				</button>
			</form>
		</div>
	);
}
//onClick = { deleteHandler }
// Todo component displays a single todo item
function Todo({ todo, deleteHandler }) {
	return (
		<div>
			<button onClick={()=>deleteHandler(todo.id)}>DEL</button>
		<div>{todo.message}</div>

		</div>
		)
}

// TodoList component displays a list of todos
function TodoList({ todos, deleteHandler }) {
	return (
		<div>
			{todos.map((todo) => (
				<Todo key={todo.id} todo={todo} deleteHandler={deleteHandler}/>
			))}
		</div>
	);
}

// Initial list of todos
const initial = [
	{ id: 1, message: "enehehy" },
	{ id: 2, message: "enewwhehy" },
	{ id: 3, message: "enehweeeehy" },
];

// Main Todos component manages state and renders the app
export default function Todos() {
	const [todoList, setTodoList] = useState(initial);
	const deleteHandler = id => {//perform callback function on each item
		const newList = todoList.filter(item => {//filter method
			return item.id !== id
		})

		setTodoList(newList)
	}
	return (
		<div>
			<TodoForm todos={todoList} setTodos={setTodoList} />
			<TodoList todos={todoList} deleteHandler={deleteHandler} />
			
		</div>
	);
}
//import { useState } from "react";

//// TodoForm component handles adding new todos
//function TodoForm({ todos, setTodos }) {
//	const [todo, setThis] = useState({
//		id: Date.now(),
//		message: "",
//	});

//	// Updates the message property while preserving id
//	const handleChange = (e) => {
//		setThis({
//			...todo, // Keep other properties intact
//			message: e.target.value,
//		});
//	};

//	// Adds the todo to the list and resets the input
//	const handleSubmit = (e) => {
//		e.preventDefault();
//		if (todo.message.trim() === "") return; // Prevent empty entries
//		setTodos([ ...todos, todo]); // Add the new todo to the top
//		setThis({
//			id: Date.now(), // Reset with new id
//			message: "",
//		});
//	};

//	return (
//		<div>
//			<form onSubmit={handleSubmit}>
//				<input
//					type="text"
//					name="todo"
//					value={todo.message}
//					placeholder="Add a task..."
//					onChange={handleChange}
//				/>
//				<button className="square" type="submit">
//					Confirm
//				</button>
//			</form>
//		</div>
//	);
//}

//// Todo component displays a single todo item
//function Todo({ todo, deleteHandler }) {
//	return(
//	<div>{todo.message}
//			<button onClick={deleteHandler(todo.id)}>DEL </button>
			
//	</div>)
//}

//// TodoList component displays a list of todos
//function TodoList({ todos, deleteHandler }) {
//	return (
//		<div>
//			{todos.map((todo) => (
//				<Todo key={todo.id} todo={todo} deleteHandler={deleteHandler} />
//			))}
//		</div>
//	);
//}

//// Initial list of todos
//const initial = [
//	{ id: 1, message: "enehehy" },
//	{ id: 2, message: "enewwhehy" },
//	{ id: 3, message: "enehweeeehy" },
//];

//// Main Todos component manages state and renders the app
//export default function Todos() {
//	const [todoList, setTodoList] = useState(initial);
//	const deleter = (id) => {//perform callback function on each item
//		const newList = todoList.filter(item => {//filter method
//			return item.id!==id
//		})
		
//		setTodoList(newList)

//	}
//	return (
//		<div>
//			<TodoForm todos={todoList} setTodos={setTodoList} />
//			<TodoList todos={todoList} deleteHandler={deleter} />
			
//		</div>
//	);
//}
////<button onClick={deleter} className="square">DEL</button>