import { useState } from "react";
import { MdRequestPage } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineDone } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import CreateTask from "./CreateTask";
import Tasks from "./Tasks";

const Columns = ({ setShowTask }) => {

    const column = [
        {status: "requested",  style: "bg-navyBlue", icon: <MdRequestPage size={28} />,  name: 'Requested Tasks', addicon: <FiPlusCircle size={28} />, button: "Add task"},
        {status: "todo",  style: "bg-steelGray", icon: <FaList size={20} />,  name: 'To-Dos'},
        {status: "inProgress",  style: "bg-burgundy", icon: <GrInProgress size={20} />, name: 'In Progress'},
        {status: "done",  style: "bg-forestGreen", icon: <MdOutlineDone className="text-forestGreen" size={28} />, name: 'Done'},
    ]

  return (
    <div className="p-10">
        <h1 className="text-2xl font-semibold mb-8 text-center font-montserrat">KANBAN TASK BOARD</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-10">
            {column.map(({status, style, icon, name, addicon, button}) => (
                <div className={`min-h-[500px] rounded-xl ${style} px-4`} key={status}>
                    <div className="bg-white rounded-md shadow-xl w-fit mt-6 flex justify-center items-center py-2 px-6 mx-auto">
                        <span className="mr-4">{icon}</span>
                        <p className="text-gray-600 text-center font-medium text-lg">{name}</p>
                    </div>
                    <button className="ms-2 flex text-gray-300 hover:text-gray-500 justify-start relative top-[78%] bottom-0 items-center cursor-pointer" onClick={(e) => setShowTask(true)}>
                        <span className="mr-2">{addicon}</span>
                        <p className="font-medium text-lg">{button}</p>
                    </button>
                    <Tasks status={status}/>    
                </div>
            ))}
        </div>
    </div>
  )
}

export default Columns