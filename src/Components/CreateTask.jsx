import { useState } from "react";

import toast from "react-hot-toast";

import { GiCancel } from "react-icons/gi";

import { v4 as uuidv4 } from "uuid";
import { createTask } from "../utils/tasks.localStorage.js";

const CreateTask = ({ setShowTask }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    description: "",
    assignee: "",
    status: "requested",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3)
      return toast.error("A task must have more than 3 characters");

    if (task.name.length > 100)
      return toast.error("A task must not be more than 100 characters");

    createTask(task);

    toast.success("Task Created");

    setTask({
      id: "",
      name: "",
      description: "",
      assignee: "",
      status: "requested",
    });
  };

  return (
    <div className="fixed z-40 flex h-full w-full items-center justify-center bg-black bg-opacity-40 backdrop-blur-md">
      <form
        onSubmit={handleSubmit}
        className="min-h-[400px] rounded-[12px] border-[1px] border-[#0c0c27] bg-navyBlue px-5 xs:top-[24%] xs:w-[75%] xml:top-[17%] md:top-[15%] md:w-[40%] lg:top-[24%] lg:w-[20%]"
      >
        <span
          className="mr-[-0.5rem] mt-3 flex cursor-pointer justify-end text-[#fff]"
          onClick={(e) => setShowTask(false)}
        >
          <GiCancel size={20} />
        </span>
        <h1 className="text-center text-[20px] text-white">
          Create A New Task
        </h1>
        <div className="mt-[1rem]">
          <input
            type="text"
            className="h-12 w-[100%] rounded-md border-2 bg-[#EAEAEA] px-1 outline-none"
            placeholder="Task Name"
            value={task.name}
            onChange={(e) =>
              setTask({ ...task, id: uuidv4(), name: e.target.value })
            }
          />
          <br />
          <input
            type="text"
            className="mt-5 h-12 w-[100%] rounded-md border-2 bg-[#EAEAEA] px-1 outline-none"
            placeholder="Assignees Name"
            value={task.assignee}
            onChange={(e) =>
              setTask({ ...task, id: uuidv4(), assignee: e.target.value })
            }
          />
          <br />
          <textarea
            cols="22"
            rows="4"
            className="mt-5 w-[100%] rounded-md border-2 bg-[#EAEAEA] px-1 outline-none"
            placeholder="Description"
            value={task.description}
            onChange={(e) =>
              setTask({ ...task, id: uuidv4(), description: e.target.value })
            }
          ></textarea>
          <br />
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="mt-[1rem] h-12 w-[100%] rounded-md bg-[#CCCCCC] px-[30px] text-center font-semibold text-gray-600 hover:bg-[#929292] hover:text-white"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
