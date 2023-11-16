"use client";

import UserContext from '@/context/userContext';
import { deleteTask, getCompletedTasks, getPendingTasks, getTask, getTasksOfUser, updateTask, updatedTask } from '@/services/taskService';
import React, { useContext, useEffect, useRef, useState } from 'react'
import TaskPage from './Task';
import { toast } from 'react-toastify';

const ShowTasks = () => {
    const [tasks, setTasks] = useState([]);
    const context = useContext(UserContext);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [checkList, setCheckList] = useState([]);

    useEffect(() => {
        if(context.user) {
            fetchPendingTasks(context.user._id, 'pending');
            fetchCompletedTasks(context.user._id, 'completed');
        }
    }, [tasks])


    
    async function loadTasks(userId) {
        try {
            const tasks = await getTasksOfUser(userId);
            setTasks([...tasks].reverse());
        } catch (error) {
            console.log(error);
        }
    }
    async function fetchPendingTasks(userId, status) {
        try {
            const tasks = await getPendingTasks(userId, status);
            setPendingTasks(tasks);
        } catch (error) {
            console.log(error)
        }
    }
    async function fetchCompletedTasks(userId, status) {
        try {
            const tasks = await getCompletedTasks(userId, status);
            setCompletedTasks(tasks)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if (context.user) {
            loadTasks(context.user._id);
        }
    }, [context.user])

    const deleteTaskParent = async (taskId) => {
        try {
            const result = await deleteTask(taskId);
            console.log(result);
            const newTasks = tasks.filter((task) => (task._id != taskId));
            setTasks(newTasks);
            toast.success("Your Task is deleted");
        } catch (error) {
            console.log(error);
            toast.error("Error in deleting task!!");
        }
    }

    function handleChange(event) {
        const {value, checked} = event.target;

        if(checked) {
            setCheckList(pre => [...pre, value])
        } else {
            setCheckList(pre => {
                return [...pre.filter(taskId => taskId !== value)]
            })
        }
    }

    console.log(checkList)


    const handleMove = () => {
        console.log(checkList)

        checkList.map(async(taskId) => {
            const task = await getTask(taskId);
            const updatedTask = {
                ...task,
                status: 'completed'
            };
            console.log(updatedTask)
            const result = await updateTask(taskId, updatedTask);
            return result;
        })
        setCompletedTasks(prev => [...prev, checkList]);
        fetchPendingTasks(context.user?._id)
        fetchCompletedTasks(context.user?._id)
    }


    return (
        <div className='grid grid-cols-12 m-3'>
            <div className='col-span-5 col-start-1'>
                <h1 className='text-3xl text-center mb-3'>Pending Tasks ({pendingTasks.length})</h1>

                {
                    pendingTasks.map((task) => (
                        <div key={task._id} className='flex'>
                            <input type="checkbox" value={task._id} onChange={handleChange} />
                            <TaskPage task={task} key={task._id} deleteTaskParent={deleteTaskParent} />
                        </div>
                    ))
                }
                {pendingTasks.length != 0 && 
                    <button className='bg-blue-800 rounded-md p-2' onClick={handleMove} >Move To Completed</button>}
            </div>
            <div className='col-span-5 col-start-7'>
                <h1 className='text-3xl text-center mb-3'>Completed Tasks ({completedTasks.length})</h1>

                {
                    completedTasks.map((task) => (
                        <div key={task._id} className='flex'>
                            <TaskPage task={task} key={task._id} deleteTaskParent={deleteTaskParent} />
                        </div>
                    ))
                }
                {/* <button className='bg-red-600 rounded-md p-2'>Move to Pending</button> */}
            </div>
        </div>
    )
}

export default ShowTasks