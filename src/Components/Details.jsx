import { useState, useEffect, useRef } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import classnames from "classnames";

// Details component that displays task details and provides edit/delete functionality
const Details = ({ task, onClose, onEdit, onDelete }) => {
  // State to manage edited task data and edit mode
  const [editedTask, setEditedTask] = useState(task);
  const [editMode, setEditMode] = useState(false);

  // Refs to handle modal and form interactions
  const modalRef = useRef(null);
  const formRef = useRef(null);

  // Function to handle click events and close modal when clicking outside the form
  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }

    if (formRef.current) {
      setEditMode(true);
    }
  };

  // Effect to attach and detach click event listener for modal closing
  useEffect(() => {
    document.addEventListener("click", handleCloseModal);

    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
  }, []);

  // Function to adjust textarea height dynamically based on content
  const autoAdjustTextareaHeight = (element) => {
    if (element) {
      element.style.height = 'auto';
      element.style.height = (element.scrollHeight) + 'px';
    }
  };

  // Function to handle clicks on "Edit" button and trigger edit mode
  const handleEditClick = () => {
    setEditMode(!editMode);
    if (editMode) {
      onEdit(editedTask);
    }
  };

  // Function to handle clicks on "Delete" button and trigger delete operation
  const handleDeleteClick = () => {
    onDelete(task.id);
    onClose();
  };

  // Function to handle input changes in the form fields
  const handleInputChange = (e, field) => {
    setEditedTask({
      ...editedTask,
      [field]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className={classnames(
          "modal-content",
          "lg:w-1/2",
          "sm:w-2/3",
          "w-3/4",
          "h-fit",
          "mx-auto",
          "p-6",
          "rounded-md",
          "text-left",
          "relative",
          "my-8",
          {
            "bg-navyBlue": editedTask.status === "requested",
            "bg-forestGreen": editedTask.status === "done",
            "bg-burgundy": editedTask.status === "inProgress",
            "bg-steelGray": editedTask.status === "todo",
          }
        )}
      >

        <button
          onClick={onClose}
          className="absolute top-0 right-3 m-4 text-white cursor-pointer"
        >
          <GiCancel size={20} />
        </button>

        {/* Display task details or edit form based on editMode */}
        {editedTask && !editMode ? (
          // Displaying task details
          <div className="bg-white rounded-md shadow-xl w-full mt-6 py-3.5 px-6 mx-auto font-montserrat">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
              {editedTask.name}
            </h2>
            <p className="text-black my-7">{editedTask.description}</p>
            <p className="text-black capitalize">
              <span className="font-semibold">Assignee: </span>
              {editedTask.assignee}
            </p>
          </div>
        ) : (
          // Displaying edit form
          <>
            <div className="mb-4 w-full">
              <label className="block text-gray-500 text-sm font-bold mb-2">
                name:
              </label>
              <input
                type="text"
                value={editedTask.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="border-none p-2 rounded w-full outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2">
                Description:
              </label>
              <textarea
                value={editedTask.description}
                onChange={(e) => handleInputChange(e, "description")}
                className="border-none outline-none p-2 w-full resize-none rounded "
                style={{ height: 'auto', minHeight: '80px' }}
                rows={1}
                ref={(textarea) => textarea && autoAdjustTextareaHeight(textarea)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2">
                Assignee:
              </label>
              <input
                type="text"
                value={editedTask.assignee}
                onChange={(e) => handleInputChange(e, "assignee")}
                className="border-none rounded p-2 w-full outline-none"
              />
            </div>
          </>
        )}

        <div className="flex mt-4 justify-end item-center">
          {editedTask.status === "requested" ||
          editedTask.status === "todo" ? (
            // Show "Edit" button for tasks in requested or todo status
            <button
              onClick={handleEditClick}
              className="mr-2 text-white px-4 py-2 rounded-md font-semibold"
            >
              {editMode ? "Save" : "Edit"}
            </button>
          ) : null}

          <button
            onClick={handleDeleteClick}
            className="mr-2 text-white px-0 py-2 rounded-md"
          >
            <IoTrashBinSharp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
