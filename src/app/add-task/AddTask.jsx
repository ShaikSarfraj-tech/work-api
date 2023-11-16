"use client";

import React, { useContext, useState } from 'react';
import loginSvg from '../../assets/logo.svg';
import Image from 'next/image';
import { addTask } from '@/services/taskService';
import { toast } from 'react-toastify';
import UserContext from '@/context/userContext';

const AddTask = () => {
	const context = useContext(UserContext);
	// console.log(context);
	const [task, setTask] = useState({
		title: '',
		content: '',
		status: 'none',
		//temp soln
		// userId: context.user?._id
	});
	const handleAddTask = async (event) => {
		event.preventDefault();
		//validate task data

		try {
			const result = await addTask(task);
			console.log(result);
			toast.success("Your Task is Added", {
				position: 'top-center'
			})
			setTask({
				title: '',
				content: '',
				status: 'none'
			})
		} catch (error) {
			console.log(error);
			toast.error("Task NOT Added!!", {
				position: 'top-center'
			})
		}
	}
	return (
		<div className='grid grid-cols-12 justify-center'>
			<div className='col-span-4 col-start-5 p-5 shadow-sm'>
				<div className='my-8 flex justify-center'>
					<Image src={loginSvg} alt="Login Banner" style={{
						width:"50%",
					}}/>
				</div>
				<h1 className='text-3xl text-center'>Add your task here</h1>

				<form action="#!" onSubmit={handleAddTask}>
					{/* Task Title */}
					<div className='mt-4'>
						<label htmlFor="task_title" className='block text-sm font-medium mb-2'>Title</label>
						<input 
							type="text" 
							className='w-full text-white p-3 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400' 
							id="task_title"
							name='task_title'
							onChange={(event) => {
								setTask({
									...task,
									title: event.target.value
								})
							}}
							value={task.title}
						/>
					</div>
					{/* Task Content */}
					<div>
						<label htmlFor="task_content">Content</label>
						<textarea 
							className='w-full text-white p-3 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400'
							id="task_content" 
							rows={3}
							name='task_content'
							onChange={(event) => {
								setTask({
									...task,
									content: event.target.value
								})
							}}
							value={task.content}
						/>
					</div>
					{/* Task Status */}
					<div className='mt-4'>
						<label htmlFor="task_status" className='block text-sm font-medium mn-2'>Status</label>
						<select 
							id="task_status" 							
							className='w-full text-white p-3 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400'
							name='task_status'
							onChange={(event) => {
								setTask({
									...task,
									status: event.target.value
								})
							}}
							value={task.status}
						>
							<option value="none disabled">
								---Select Status---
							</option>
							<option value="pending">Pending</option>
							<option value="completed">Completed</option>
						</select>
					</div>
					{/* button actions */}
					<div className='mt-4 flex justify-center'>
						<button className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800'>Add Task</button>
						<button className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3'>Clear</button>
					</div>
					{/* {JSON.stringify(task)} */}
				</form>
			</div>
		</div>
	)
}

export default AddTask