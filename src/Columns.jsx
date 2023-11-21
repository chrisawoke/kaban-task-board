import { MdRequestPage } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineDone } from "react-icons/md";

const Columns = () => {

    const column = [
        {id: 1,  style: "bg-navyBlue", icon: <MdRequestPage size={28} />,  title: 'Requested Tasks'},
        {id: 2,  style: "bg-steelGray", icon: <FaList size={20} />,  title: 'To-Dos'},
        {id: 3,  style: "bg-burgundy", icon: <GrInProgress size={20} />, title: 'In Progress'},
        {id: 4,  style: "bg-forestGreen", icon: <MdOutlineDone className="text-forestGreen" size={28} />, title: 'Done'},
    ]

  return (
    <div className="my-12 mx-10">
        <h1 className="text-2xl font-semibold mb-8 text-center">KANBAN BOARD</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-10">
            {column.map(({id, style, icon, title}) => (
                <div className={`min-h-[200px] ${style} px-2`} key={id}>
                    <div className="bg-white rounded-md shadow-xl w-[240px] mt-4 flex justify-center items-center py-2 px-1 mx-auto">
                        <span className="mr-4">{icon}</span>
                        <p className="text-gray-600 text-center font-medium text-lg">{title}</p>

                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Columns