import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import { GiCancel } from "react-icons/gi";


const CreateTask = ({ tasks, setTasks, setShowTask }) => {

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
        <div className='flex justify-center'>
            <form onSubmit={handleSubmit} className='bg-navyBlue absolute top-[16%] min-h-[500px] w-[30%] px-10'>
                <span 
                    className='mt-3 flex justify-end text-[#aaaaaa] mr-[-1.5rem] cursor-pointer'
                    onClick={(e) => setShowTask(false)}
                >
                    <GiCancel size={24} />
                </span>
                <h1 className='text-center text-[30px] pt-[0.5rem] text-white'>Create A New Task</h1>
                <div className='mt-[2.5rem]'>
                    <input
                        type='text'
                        className='border-2 bg-[#EAEAEA] rounded-md h-12 w-[100%] px-1 outline-none'
                        placeholder='Task Name'
                        value={task.name}
                        onChange={(e) =>
                            setTask({ ...task, id: uuidv4(), name: e.target.value })}
                    />
                    <br />
                    <input
                        type='text'
                        className='border-2 bg-[#EAEAEA] rounded-md h-12 w-[100%] px-1 outline-none mt-8'
                        placeholder='Assignees Name'
                        value={task.assignee}
                        onChange={(e) =>
                            setTask({ ...task, id: uuidv4(), assignee: e.target.value })}
                    />
                    <br />
                    <textarea
                        cols='50'
                        rows='4'
                        className='border-2 bg-[#EAEAEA] rounded-md w-[100%] px-1 outline-none mt-8'
                        placeholder='Description'
                        value={task.description}
                        onChange={(e) =>
                            setTask({ ...task, id: uuidv4(), description: e.target.value })}
                    >
                    </textarea>
                    <br />
                    <button className='bg-[#CCCCCC] rounded-md px-[50px] w-[100%] font-semibold text-center h-12 text-GREY-600 mt-[1rem]'
                    >
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateTask