import { useDraggable } from "@dnd-kit/core";
import axios from "axios";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FcDeleteColumn } from "react-icons/fc";
import { MdDeleteForever, MdEditAttributes } from "react-icons/md";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Task = ({ task ,allTaskRefetch}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const handleCartEdit = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = (e) =>{
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const dueDate = e.target.dueDate.value;
    const updateDoc = {
      title, description, dueDate
    }

    axiosPublic.patch(`/tasks/${task._id}`,updateDoc)
    .then(res=>{
      setIsModalOpen(false);
      allTaskRefetch();
    })
  }
  

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    activationConstraint,
  } = useDraggable({ id: task._id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${
          isDragging ? 1.05 : 1
        })`
      : undefined,
    transition,
    width: "100%",
  };
  return (
    <div className="flex items-center gap-2">
      {isDragging || (
        <div>
          <FaEdit
            className="hover:text-blue-600 cursor-pointer "
            onClick={handleCartEdit}
            size={25}
          />
          {/*  */}
          {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(255,255,255,0.7)]">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Task
              </h3>
              <button
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                onClick={()=>setIsModalOpen(false)}
              >
                ✖
              </button>
            </div>
            <form action=""
              onSubmit={handleUpdate}
            >
               <div className="mt-4">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={task.title}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 dark:bg-gray-600 dark:text-white"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                 name="description"
                defaultValue={task.description}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 dark:bg-gray-600 dark:text-white"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Due Date
              </label>
              <input
              type="date"
              name="dueDate"
                defaultValue={task.dueDate}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 dark:bg-gray-600 dark:text-white"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
              
                onClick={()=>setIsModalOpen(false)}
                className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button type="submit"  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Save
              </button>
            </div>
            </form>
           

           
          </div>
        </div>
      )}
          {/*  */}
        </div>
      )}
      <div
        activationConstraint={{
          delay: 250,
          tolerance: 5,
        }}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={`flex items-center  justify-between p-2 rounded-lg shadow my-2 cursor-grab 
          ${task.category === "toDo" ? "bg-amber-200" : ""}
        ${task.category === "inProgress" ? "bg-blue-200" : ""}
        ${task.category === "done" ? "bg-emerald-200" : ""}
        `}
      >
        <div>
          <h2 className="text-lg font-bold">{task.title}</h2>
          <p className="text-sm">{task.description}</p>
        </div>
        
      </div>

     
    </div>
  );
};
export default Task;
