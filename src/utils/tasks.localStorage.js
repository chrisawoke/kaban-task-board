import toast from "react-hot-toast";

//A simple function to get all tasks from localStorage
export const getTasks = () => {
  const storedTasks = localStorage.getItem("tasks");
  return JSON.parse(storedTasks);
};

//Given a task this function creates a task on localStorage but first checks if the task already exists on that column
export const createTask = (task) => {
  const tasks = getTasks();

  //Check if a task with the same name already exists in that column, returns a boolean
  const taskFound = tasks[task.status].find((t) => {
    t.name === task.name;
  });

  //If taskFound is True then the task is not created and an error is shown to the user
  if (taskFound) {
    toast.error("This task name already exists");
    return;
  } else {
    //Else, the task is added at the end of the column
    tasks[task.status].push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

//Given a taskID and the status of the task this function deletes the task with the specified information
export const deleteTask = (taskID, taskStatus) => {
  const tasks = getTasks();
  const updatedColumn = tasks[taskStatus].filter((task) => task.id !== taskID);
  const updatedTasks = { ...tasks, [taskStatus]: updatedColumn };

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  window.location.reload();
};

//Given a taskToEdit and and updatedTask this function changes
export const editTask = (taskToEdit, updatedTask) => {
  const tasks = getTasks();

  const updatedColumn = tasks[taskToEdit.status].map((task) =>
    task.id === taskToEdit.id ? updatedTask : task
  );

  const updatedTasks = { ...tasks, [taskToEdit.status]: updatedColumn };
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  window.location.reload();
};

//Given a task and a column to move that task to this function will do just that
export const moveTaskToColumn = (taskToMove, toColumn) => {
  // Delete the task from the current column
  deleteTask(taskToMove.id, taskToMove.status);

  // Change the status of the task before moving it to the new column
  const updatedTask = { ...taskToMove, status: toColumn };
  editTask(taskToMove, updatedTask);
  const tasks = getTasks();

  // Update the tasks object by adding the task to the new column
  tasks[toColumn].unshift(updatedTask);

  // Update localStorage with the modified tasks object
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

//Given a task this function returns the index of said task inside it's column
export const getTaskIndex = (task) => {
  const tasks = getTasks();
  const taskIndex = tasks[task.status].findIndex((t) => t.id === task.id);
  return taskIndex;
};

export const moveTaskInColumn = (
  task,
  dragIndex,
  hoverIndex,
  changeTasksUI
) => {
  const tasks = getTasks();
  const column = tasks[task.status];
  const removedTask = column.splice(dragIndex, 1)[0];
  column.splice(hoverIndex, 0, removedTask);

  const updatedTasks = { ...tasks, [task.status]: column };
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  changeTasksUI(updatedTasks);
};
