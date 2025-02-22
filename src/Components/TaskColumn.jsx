import { FaPlay } from "react-icons/fa";
import Task from "./Task";
import { GrInProgress } from "react-icons/gr";
import { MdDeleteForever, MdOutlineDoneOutline } from "react-icons/md";
import { useDroppable } from "@dnd-kit/core";

const TaskColumn = ({ id, title, tasks, hoverId }) => {
    const { setNodeRef } = useDroppable({ id });
  
    return (
      <div
        ref={setNodeRef}
        className={`h-fit w-full rounded-lg p-4 ${
          id === "toDo" ? "bg-amber-100" : ""
        } ${id === "inProgress" ? "bg-blue-100" : ""} ${
          id === "done" ? "bg-emerald-100" : ""
        }
        ${hoverId === "delete" && id === "delete" ? "bg-red-400" :""}
        ${hoverId === "toDo"  && id === "toDo" ? "bg-amber-400" :""}
        ${hoverId === "inProgress"  && id === "inProgress" ? "bg-blue-400" :""}
        ${hoverId === "done"  && id === "done" ? "bg-emerald-400" :""}
        `}
      >
        {
            id === "delete"
            ?
            <div className=" flex gap-2 justify-center items-center border-2 border-dashed p-5">
                <h1>Drag task here to Delete</h1>
                <MdDeleteForever size={25}></MdDeleteForever>
            </div>
            :
            <div>
                <div className="flex items-center gap-6 border-b pb-4 mb-4 border-dotted ">
          <h1
            className={`inline-flex items-center gap-4  text-gray-900 py-2 px-4 rounded-lg ${
              id === "toDo" ? "bg-amber-300" : ""
            } ${id === "inProgress" ? "bg-blue-300" : ""} ${
              id === "done" ? "bg-emerald-300" : ""
            }`}
          >
            {id === "toDo" && <FaPlay />} 
            {id === "inProgress" && <GrInProgress />} 
            {id === "done" && <MdOutlineDoneOutline/>} 
            {title}
          </h1>
          
        </div>
  
        {tasks?.map((task) => {
  
          return(
     
           <Task key={task._id} task={task} />
  
          )
          })}
            </div>

        }
        
      </div>
    );
  };
export default TaskColumn;