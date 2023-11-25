import { useState, useEffect } from "react";
import Details from "./Details";

// Tasks component displays a list of tasks based on their status
const Tasks = ({ status }) => {
  // State to store tasks from localStorage, modal state, and selected task
  const [tasksFromStorage, setTasksFromStorage] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Effect to fetch tasks from localStorage when the component mounts or when tasks change
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasksFromStorage(JSON.parse(storedTasks));
    }
  }, [setTasksFromStorage]);

  // Filter tasks based on their status
  const filteredTasks = tasksFromStorage.filter(
    (task) => task.status === status
  );

  // Function to handle task editing
  const handleEdit = (taskId, updatedTask) => {
    // Update in localStorage
    const updatedTasks = tasksFromStorage.map((task) =>
      task.id === taskId ? updatedTask : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Update on the UI
    setTasksFromStorage(updatedTasks);
    console.log(`Editing task with ID: ${taskId}`);
  };

  // Function to handle task deletion
  const handleDelete = (taskId) => {
    // Delete from localStorage
    const updatedTasks = tasksFromStorage.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // delete from UI
    setTasksFromStorage(updatedTasks);
    console.log(`Deleting task with ID: ${taskId}`);
  };

  // Function to handle task click and open task modal
  const handleTaskClick = (taskId) => {
    const task = tasksFromStorage.find((p) => p.id === taskId);
    setSelectedTask(task);
    setModalOpen(true);
  };

  // Function to close the task modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  // TruncatedText component to display a truncated version of task description
  const TruncatedText = ({ initialText }) => {
    const truncatedText = initialText.length > 80 ? initialText.substring(0, 80) + '...' : initialText;
  
    return (
      <p>
        {truncatedText}
      </p>
    );
  };

  return (
    <>
      {isModalOpen && (
        <Details
          task={selectedTask}
          onClose={closeModal}
          onEdit={(updatedTask) => handleEdit(selectedTask.id, updatedTask)}
          onDelete={() => handleDelete(selectedTask.id)}
        />
      )}

      {/* Mapping through filtered tasks to display each task */}
      {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleTaskClick(task.id)}
            className=" h-[7.2rem] bg-white rounded-md shadow-xl w-full mt-6 flex flex-col justify-start items-start py-2 px-4 mx-auto font-montserrat cursor-pointer">
            <h2 className="font-semibold font-roboto mb-1">{task.name}</h2>
            {/* Using the TruncatedText component to display truncated description */}
            <TruncatedText initialText={task.description}/>
          </div>
      ))}
    </>
  );
};

export default Tasks;