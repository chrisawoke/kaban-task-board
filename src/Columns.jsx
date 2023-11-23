import { useState } from "react";
import { MdRequestPage } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineDone } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import CreateTask from "./Components/CreateTask";

const Columns = () => {
    const [showTask, setShowTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    const column = [
        {id: 1,  style: "bg-navyBlue", icon: <MdRequestPage size={28} />,  title: 'Requested Tasks', addicon: <FiPlusCircle size={28} />, button: "Add task"},
        {id: 2,  style: "bg-steelGray", icon: <FaList size={20} />,  title: 'To-Dos'},
        {id: 3,  style: "bg-burgundy", icon: <GrInProgress size={20} />, title: 'In Progress'},
        {id: 4,  style: "bg-forestGreen", icon: <MdOutlineDone className="text-forestGreen" size={28} />, title: 'Done'},
    ]

  return (
    <div className="p-10">
        <h1 className="text-2xl font-semibold mb-8 text-center font-montserrat">KANBAN TASK BOARD</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-10">
            {column.map(({id, style, icon, title, addicon, button}) => (
                <div className={`min-h-[500px] rounded-xl ${style} px-2`} key={id}>
                    <div className="bg-white rounded-md shadow-xl w-fit mt-6 flex justify-center items-center py-2 px-6 mx-auto">
                        <span className="mr-4">{icon}</span>
                        <p className="text-gray-600 text-center font-medium text-lg">{title}</p>
                    </div>
                    <div className="ms-2 flex justify-start relative top-[78%] bottom-0 items-center cursor-pointer" onClick={(e) => setShowTask(true)}>
                        <span className="mr-2 text-gray-300">{addicon}</span>
                        <p className="text-gray-300 font-medium text-lg">{button}</p>
                    </div>
                </div>
            ))}
        </div>
        {
        showTask ? 
          <CreateTask task={tasks} setTasks={setTasks} setShowTask={setShowTask} />
          : null
      }
    </div>
  )
}

export default Columns