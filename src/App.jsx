import { useState } from 'react'
import Columns from "./Columns";
import CreateTask from "./Components/CreateTask";
import { Toaster } from 'react-hot-toast'


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showTask, setShowTask] = useState(false)

  return (
    <>
    <Toaster />
    <div className="font-roboto bg-gradient-to-b from-white via-gray-500 to-cyan-900">
      {/* {
        showTask ? 
          <CreateTask task={tasks} setTasks={setTasks} showTask={showTask} setShowTask={setShowTask} />
          : null
      } */}
      <Columns/>
    </div>
    </>
  );
}
 