import { useState } from 'react'
import Columns from "./Components/Columns";
import CreateTask from "./Components/CreateTask";
import { Toaster } from 'react-hot-toast'

export default function App() {
  const [showTask, setShowTask] = useState(false)

  return (
    <>
    <Toaster />
    <div className="font-roboto bg-gradient-to-b from-white via-gray-500 to-cyan-900">
    {showTask && <CreateTask setShowTask={setShowTask}/>}
      <Columns setShowTask={setShowTask}/>
    </div>
    </>
  );
}
 