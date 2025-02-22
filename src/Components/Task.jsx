import { useDraggable } from "@dnd-kit/core";
import { FcDeleteColumn } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";

const Task = ({ task }) => {

    const handleCardDelete = (_id)=>{
        console.log(_id)
    }
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
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
    <div
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

      <div>
        < MdDeleteForever onClick={()=>{handleCardDelete(task?._id)}} size={25}/>
      </div>
    </div>
  );
};
export default Task;
