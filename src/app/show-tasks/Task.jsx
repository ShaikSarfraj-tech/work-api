import UserContext from '@/context/userContext'
import React, { useContext, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'

const TaskPage = ({ task, deleteTaskParent }) => {
    const { user } = useContext(UserContext);

    const deleteTask = (taskId) => {
        deleteTaskParent(taskId);
    }

    return (
        <div className={`shadow-lg flex mt-2 rounded-md mb-2 ${task.status == "completed" ? "bg-green-800" : "bg-gray-400"
            }`}>
            
            <div className='p-5'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-semibold'>{task.title}</h1>
                    <span onClick={() => deleteTask(task._id)} className='w-9 h-9 cursor-pointer bg-red-700 rounded-full flex justify-center items-center hover:bg-red-500'>
                        <RxCross1 />
                    </span>
                </div>
                <p className='font-normal'>{task.content}</p>
                <div className='flex justify-between mt-3'>
                    <p className='text-left'>Status: <span className='font-bold'>{task?.status}</span></p>
                    <p className='text-right'>Author: <span className='font-bold'>{user?.name}</span></p>
                </div>
            </div>
        </div>
    )
}

export default TaskPage