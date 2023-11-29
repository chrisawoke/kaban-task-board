import { useEffect, useState } from "react";

import { MdRequestPage } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineDone } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";

import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

import { Task } from "./Task";
import { getTaskIndex, getTasks } from "../utils/tasks.localStorage";

const Columns = ({ setShowTask }) => {
  // const dummyTasks = {
  //   requested: [
  //     {
  //       id: 1,
  //       name: "requested1",
  //       description: "description",
  //       status: "requested",
  //     },
  //     {
  //       id: 2,
  //       name: "requested2",
  //       description: "description",
  //       status: "requested",
  //     },
  //     {
  //       id: 3,
  //       name: "requested3",
  //       description: "description",
  //       status: "requested",
  //     },
  //   ],
  //   todo: [
  //     { id: 4, name: "todo4", description: "description", status: "todo" },
  //     { id: 5, name: "todo5", description: "description", status: "todo" },
  //     { id: 6, name: "todo6", description: "description", status: "todo" },
  //   ],
  //   inProgress: [
  //     {
  //       id: 7,
  //       name: "inProgress7",
  //       description: "description",
  //       status: "inProgress",
  //     },
  //     {
  //       id: 8,
  //       name: "inProgress8",
  //       description: "description",
  //       status: "inProgress",
  //     },
  //     {
  //       id: 9,
  //       name: "inProgress9",
  //       description: "description",
  //       status: "inProgress",
  //     },
  //   ],
  //   done: [
  //     { id: 10, name: "done10", description: "description", status: "done" },
  //     { id: 11, name: "done11", description: "description", status: "done" },
  //     { id: 12, name: "done12", description: "description", status: "done" },
  //   ],
  // };

  const initialTasks = {
    requested: [],
    todo: [],
    inProgress: [],
    done: [],
  };

  const [tasks, setTasks] = useState({
    requested: [],
    todo: [],
    inProgress: [],
    done: [],
  });

  const column = [
    {
      status: "requested",
      style: "bg-navyBlue",
      icon: <MdRequestPage size={28} />,
      name: "Requested Tasks",
      addicon: <FiPlusCircle size={28} />,
      button: "Add task",
    },
    {
      status: "todo",
      style: "bg-steelGray",
      icon: <FaList size={20} />,
      name: "To-Dos",
    },
    {
      status: "inProgress",
      style: "bg-burgundy",
      icon: <GrInProgress size={20} />,
      name: "In Progress",
    },
    {
      status: "done",
      style: "bg-forestGreen",
      icon: <MdOutlineDone className="text-forestGreen" size={28} />,
      name: "Done",
    },
  ];

  useEffect(() => {
    const storedTasks = getTasks();

    if (storedTasks) {
      setTasks(storedTasks);
    } else {
      // If no tasks are found, set the initial tasks and store them in localStorage
      localStorage.setItem("tasks", JSON.stringify(initialTasks));
    }
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-8 text-center font-montserrat">
        KANBAN TASK BOARD
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-10">
        <DndProvider
          backend={TouchBackend}
          options={{ enableMouseEvents: true }}
        >
          {column.map(({ status, style, icon, name, addicon, button }) => (
            <div
              className={`flex flex-col gap-3 min-h-[500px] rounded-xl ${style} px-4`}
              key={status}
            >
              <div className="bg-white rounded-md shadow-xl w-fit mt-6 flex justify-center items-center py-2 px-6 mx-auto">
                <span className="mr-4">{icon}</span>
                <p className="text-gray-600 text-center font-medium text-lg">
                  {name}
                </p>
              </div>

              <button
                className="z-30 ms-2 flex text-gray-300 hover:text-gray-500 justify-start relative top-[78%] bottom-0 items-center cursor-pointer"
                onClick={(e) => setShowTask(true)}
              >
                <span className="mr-2">{addicon}</span>
                <p className=" font-medium text-lg">{button}</p>
              </button>
              
              {/* We map through the tasks to show each one */}
              {tasks[status].map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  index={getTaskIndex(task)}
                  changeTasksUI={(tasks) => {
                    setTasks(tasks);
                  }}
                />
              ))}
            </div>
          ))}
        </DndProvider>
      </div>
    </div>
  );
};

export default Columns;
