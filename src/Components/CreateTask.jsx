import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'


const CreateTask = ({ tasks, setTasks }) => {

    const [task, setTask] = useState({
        id: "",
        name: "",
        description: "",
        assignee: "",
        status: "requested task",
    })

    console.log(task);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task.name.length < 3) return toast.error("A task must have more than 3 characters")

        if (task.name.length > 100) return toast.error("A task must not be more than 100 characters")

        setTasks((prev) => {
            const list = [...prev, task]

            console.log(list)

            return list;
        });

        toast.success("Task Created")

        setTask({
            id: "",
            name: "",
            description: "",
            assignee: "",
            status: "requested task",
        })
    }

    return (
        <form onSubmit={handleSubmit} className='flex items-center justify-center mt-5'>
            <input
                type='text'
                className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1 outline-none'
                placeholder='Task Name'
                value={task.name}
                onChange={(e) =>
                    setTask({ ...task, id: uuidv4(), name: e.target.value })}
            />
            <textarea
                className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1 py-[10px] outline-none'
                placeholder='Description'
                value={task.description}
                onChange={(e) =>
                    setTask({ ...task, id: uuidv4(), description: e.target.value })}
            ></textarea>
            <input
                type='text'
                className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1 outline-none'
                placeholder='Assignees Name'
                value={task.assignee}
                onChange={(e) =>
                    setTask({ ...task, id: uuidv4(), assignee: e.target.value })}
            />
            <button className='bg-cyan-500 rounded-md px-4 h-12 text-white'>
                Create
            </button>
        </form>
    );
}

export default CreateTask
