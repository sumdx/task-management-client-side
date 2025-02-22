import { closestCenter, DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { FaPlay } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineDoneOutline } from "react-icons/md";
const initialData = {
  toDo: [
    {
      _id: "65d501a1b9f3a12d34e89a70",
      title: "Complete React Project 1",
      description: "Finish the frontend UI with drag-and-drop.",
      category: "toDo",
      order: 1,
    },
    {
      _id: "65d501a1b9f3a12d34e89a71",
      title: "Complete React Project 2",
      description: "Finish the frontend UI with drag-and-drop.",
      category: "toDo",
      order: 2,
    },
    {
      _id: "65d501a1b9f3a12d34e89a72",
      title: "Complete React Project 3",
      description: "Finish the frontend UI with drag-and-drop.",
      category: "toDo",
      order: 3,
    },
    {
      _id: "65d501a1b9f3a12d34e89a73",
      title: "Complete React Project 4",
      description: "Finish the frontend UI with drag-and-drop.",
      category: "toDo",
      order: 4,
    },
  ],
  inProgress: [
    {
      _id: "65d501a1b9f3a12d34e89a74",
      title: "Setup Express Backend",
      description: "Create API endpoints for task management.",
      category: "inProgress",
      order: 1,
    },
    {
      _id: "65d501a1b9f3a12d34e88a75",
      title: "Setup Express Backend 2",
      description: "Create API endpoints for task management.",
      category: "inProgress",
      order: 2,
    },
  ],
  done: [
    {
      _id: "65d501a1b9f3a12d34e89a76",
      title: "Deploy MongoDB Database",
      description: "Setup MongoDB Atlas and connect with backend.",
      category: "done",
      order: 1,
    },
  ],
};
const AllTasks = () => {
  const [tasks, setTasks] = useState(initialData);


  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceId = active.id; // Task ID
    const destinationColumn = over.id; // Target Column

    let sourceColumn;
    
    for (const key in tasks) {
      if (tasks[key].some((task) => task._id === sourceId)) {
        sourceColumn = key;
        break;
      }
    }

    if (!sourceColumn || sourceColumn === destinationColumn) return;

    const taskToMove = tasks[sourceColumn].find(
      (task) => task._id === sourceId
    );

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(
        (task) => task._id !== sourceId
      ),
      [destinationColumn]: [...prev[destinationColumn], {...taskToMove, category : destinationColumn}],
    }));
  };
//   Handle while draging event
  const handleDragOver = (e) => {
   const {over} = e;

   
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <div className="flex gap-6">
        <TaskColumn id="toDo" title="To-Do" tasks={tasks.toDo} />
        <TaskColumn
  
          id="inProgress"
          title="In Progress"
          tasks={tasks.inProgress}
        />
        <TaskColumn  id="done" title="Done" tasks={tasks.done} />
      </div>
    </DndContext>
  );
};

const TaskColumn = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`h-fit w-full rounded-lg p-4 ${
        id === "toDo" ? "bg-amber-100" : ""
      } ${id === "inProgress" ? "bg-blue-100" : ""} ${
        id === "done" ? "bg-emerald-100" : ""
      }`}
    >
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
          {id === "done" && <MdOutlineDoneOutline />} 
          {title}
        </h1>
        
      </div>

      {tasks.map((task) => {

        return(
   
         <Task key={task._id} task={task} />

        )
        })}
    </div>
  );
};

const Task = ({ task }) => {
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
      className={`p-2 rounded-lg shadow my-2 cursor-grab 
        ${
        task.category === "toDo" ? "bg-amber-200" : ""
      }
      ${
        task.category === "inProgress" ? "bg-blue-200" : ""
      }
      ${
        task.category === "done" ? "bg-emerald-200" : ""
      }
      `}
    >
      <h2 className="text-lg font-bold">{task.title}</h2>
      <p className="text-sm">{task.description}</p>
    </div>
  );
};

export default AllTasks;
