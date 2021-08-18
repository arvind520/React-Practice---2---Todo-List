import React from "react";
import "./../styles/App.css";
import {useState} from 'react';

function ListItem(props){
	const {children, onModify, onDelete} = props;
	const [isEditMode, setIsEditMode] = useState(false);
	const [tempTask, setTempTask] = useState(children);
	return isEditMode?(
		<li>
			<textarea
			className="editTask"
			value={tempTask}
			onChange={function(event){
				setTempTask(event.target.value);
			}}
			></textarea>
			<button
			className="saveTask"
			onClick = {function(){
				if(tempTask !== ''){
					onModify(tempTask);
				}
			}}
			>Save</button>
		</li>
	):(
		<>
			<li>{children}</li>
			<button onClick={function(){
				setIsEditMode(true);
			}}>Edit</button>
			<button onClick={onDelete}>Delete</button>
		</>
	);
}

function App() 
{	
	const [task, setTask] = useState('');
	const [todoList, setTodoList] = useState([]);

	function onModify(updatedTask, index){
		// const newList = [];
		// for(let i=0; i<todoList.length; i++){
		// 	if(i==index){
		// 		newList.push(updatedTask);
		// 	}else{
		// 		newList.push(todoList[i]);
		// 	}
		// }
		const newList = todoList.map(function(task, i){
			if(i===index){
				return updatedTask;
			}
			return task;
			
		});
		setTodoList(newList);
	}

	function onDelete(index){
		const newList = todoList.filter(function(task, i){
			return i !== index;
		});
		setTodoList(newList);
	}

	return (
	<div id="main">
		<textarea 
		id="task"
		value={task}
		onChange = {function(event) {
			setTask(event.target.value);
		}}
		></textarea>
		{/* {task} */}
		<button id="btn"
		onClick = {function() {
			if(task !== ''){
				setTodoList([...todoList, task]);
				setTask('');
			}
		}}
		>Add task</button>

		<ul>
			{todoList.map((task, i) =>{
				return <ListItem i={i} 
				onModify={function(updatedTask){
					onModify(updatedTask, i);
				}}
				onDelete={function(){
					onDelete(i);
				}} 
				key={task}>{task}</ListItem>
			})}
		</ul>
	</div>
	);
}


export default App;
