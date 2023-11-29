import { useRef, useState } from "react";
import {
  editTask,
  deleteTask,
  moveTaskInColumn,
} from "../utils/tasks.localStorage";
import Details from "./Details";
import { useDrag, useDrop } from "react-dnd";

//This component takes a task object, the index of that task in the current column, and the function to change the ui
//in the Column component
export const Task = ({ task, index, changeTasksUI }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Ref for the element to be dragged
  const dragRef = useRef(null);

  const [, drop] = useDrop({
    accept: "task",
    hover(item) {
      if (!dragRef.current) {
        return;
      }

      //Checks where the task element is in the column
      const dragIndex = item.index;
      const hoverIndex = index;

      //If you didn't drag the element it means that both indexes are the same, so it doesn't execute anything
      if (dragIndex === hoverIndex) {
        return;
      }

      //If the indexes are different then it moves the task to the expected index
      moveTaskInColumn(task, dragIndex, hoverIndex, changeTasksUI);
      item.index = hoverIndex;
    },
  });

  //Monitors if the element is being dragged
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { taskID: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(dragRef));

  return (
    <>
      {isModalOpen && (
        <Details
          task={task}
          onClose={() => {
            setIsModalOpen(false);
          }}
          onEdit={editTask}
          onDelete={deleteTask}
        />
      )}

      <div
        ref={dragRef}
        className={`z-20 px-2 py-1 rounded-lg hover:cursor-pointer  ${
          isDragging
            ? "bg-gray-100 border-2 border-gray-400 border-dashed"
            : "bg-white border-2 border-white"
        }`}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <h2 className="text-lg font-semibold">{task.name}</h2>
        <p className="">{task.description}</p>
      </div>
    </>
  );
};
