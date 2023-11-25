import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { GiCancel } from 'react-icons/gi';

const CreateTask = ({ tasks, setTasks, setShowTask }) => {
	const [task, setTask] = useState({
		id: '',
		name: '',
		description: '',
		assignee: '',
		status: 'requested task',
	});

	console.log(task);

	useEffect(() => {
		const storedTasks = localStorage.getItem('tasks');
		if (storedTasks) {
			setTasks(JSON.parse(storedTasks));
		}
	}, [setTasks]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (task.name.length < 3)
			return toast.error('A task must have more than 3 characters');

		if (task.name.length > 100)
			return toast.error('A task must not be more than 100 characters');

		setTasks((prev) => {
			const list = [...prev, task];

			localStorage.setItem('tasks', JSON.stringify(list));
			console.log(list);

			return list;
		});

		toast.success('Task Created');

		setTask({
			id: '',
			name: '',
			description: '',
			assignee: '',
			status: 'requested task',
		});
	};

	return (
		<div className='flex justify-start lg:ms-[3rem] xs:ms-[2rem]'>
			<form
				onSubmit={handleSubmit}
				className='bg-navyBlue absolute lg:top-[24%] xs:top-[24%] xml:top-[17%] md:top-[15%] min-h-[400px] border-[1px] border-[#0c0c27] rounded-[12px] lg:w-[20%] xs:w-[75%] md:w-[40%] px-5'
			>
				<span
					className='mt-3 flex justify-end text-[#fff] cursor-pointer mr-[-0.5rem]'
					onClick={(e) => setShowTask(false)}
				>
					<GiCancel size={20} />
				</span>
				<h1 className='text-center text-[20px] text-white'>
					Create A New Task
				</h1>
				<div className='mt-[1rem]'>
					<input
						type='text'
						className='border-2 bg-[#EAEAEA] rounded-md h-12 w-[100%] px-1 outline-none'
						placeholder='Task Name'
						value={task.name}
						onChange={(e) =>
							setTask({ ...task, id: uuidv4(), name: e.target.value })
						}
					/>
					<br />
					<input
						type='text'
						className='border-2 bg-[#EAEAEA] rounded-md h-12 w-[100%] px-1 outline-none mt-5'
						placeholder='Assignees Name'
						value={task.assignee}
						onChange={(e) =>
							setTask({ ...task, id: uuidv4(), assignee: e.target.value })
						}
					/>
					<br />
					<textarea
						cols='22'
						rows='4'
						className='border-2 bg-[#EAEAEA] rounded-md w-[100%] px-1 outline-none mt-5'
						placeholder='Description'
						value={task.description}
						onChange={(e) =>
							setTask({ ...task, id: uuidv4(), description: e.target.value })
						}
					></textarea>
					<br />
					<button className='bg-[#CCCCCC] hover:bg-[#929292] hover:text-[#fff] rounded-md px-[30px] w-[100%] font-semibold text-center h-12 text-GREY-600 mt-[1rem]'>
						Create Task
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateTask;
