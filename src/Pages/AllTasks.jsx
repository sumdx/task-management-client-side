import { closestCenter, DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { FaPlay } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineDoneOutline } from "react-icons/md";
import AddTasks from "../Components/AddTasks";
import useAllTasks from "../Hooks/useAllTasks";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Task from "../Components/Task";
import TaskColumn from "../Components/TaskColumn";
// const initialData = {
//   toDo: [
//     {
//       _id: "65d501a1b9f3a12d34e89a70",
//       title: "Complete React Project 1",
//       description: "Finish the frontend UI with drag-and-drop.",
//       category: "toDo",
//       order: 1,
//     },
//     {
//       _id: "65d501a1b9f3a12d34e89a71",
//       title: "Complete React Project 2",
//       description: "Finish the frontend UI with drag-and-drop.",
//       category: "toDo",
//       order: 2,
//     },
//     {
//       _id: "65d501a1b9f3a12d34e89a72",
//       title: "Complete React Project 3",
//       description: "Finish the frontend UI with drag-and-drop.",
//       category: "toDo",
//       order: 3,
//     },
//     {
//       _id: "65d501a1b9f3a12d34e89a73",
//       title: "Complete React Project 4",
//       description: "Finish the frontend UI with drag-and-drop.",
//       category: "toDo",
//       order: 4,
//     },
//   ],
//   inProgress: [
//     {
//       _id: "65d501a1b9f3a12d34e89a74",
//       title: "Setup Express Backend",
//       description: "Create API endpoints for task management.",
//       category: "inProgress",
//       order: 1,
//     },
//     {
//       _id: "65d501a1b9f3a12d34e88a75",
//       title: "Setup Express Backend 2",
//       description: "Create API endpoints for task management.",
//       category: "inProgress",
//       order: 2,
//     },
//   ],
//   done: [
//     {
//       _id: "65d501a1b9f3a12d34e89a76",
//       title: "Deploy MongoDB Database",
//       description: "Setup MongoDB Atlas and connect with backend.",
//       category: "done",
//       order: 1,
//     },
//   ],
// };
const AllTasks = () => {
  
  const [allTasks, allTaskRefetch,isTaskFetching, isTaskLoading] = useAllTasks();
  const [hoverId, setHoverId] = useState("");
  const axiosPublic = useAxiosPublic();
  
  const [tasks, setTasks] = useState([]);
  useEffect(() =>{
    if(allTasks){
      setTasks(allTasks)
    }
  },[allTasks])

  // if (isTaskLoading || isTaskFetching) {
  //   return <div className="text-center p-4">Loading tasks...</div>;
  // }


  // Handle drag end event
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setHoverId("");
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


    if (destinationColumn === "delete") {
      console.log(`Deleting task: ${sourceId}`);


      setTasks((prev) => {
          const updatedTasks = { ...prev };
          updatedTasks[sourceColumn] = updatedTasks[sourceColumn].filter(
              (task) => task._id !== sourceId
          );
          return updatedTasks;
      });

      try {
          await axiosPublic.delete(`/tasks/${sourceId}`);
          allTaskRefetch(); 
      } catch (error) {
          console.error("Failed to delete task:", error);
      }
      return; 
  }

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(
        (task) => task._id !== sourceId
      ),
      [destinationColumn]: [...prev[destinationColumn], {...taskToMove, category : destinationColumn}],
    }));

    try {
      await axiosPublic.patch(`/tasks`, {sourceId, category: destinationColumn });
      allTaskRefetch();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };
//   Handle while draging event
  const handleDragOver = (e) => {
   const {over} = e;
    setHoverId(over.id);
   console.log(over)
  };

  return (
    
    <div>
      <div>
        <AddTasks  tasks={tasks} allTaskRefetch = {allTaskRefetch} ></AddTasks>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        <div className="text-center bg-red-200 p-6 mb-4">
          
          <TaskColumn hoverId={hoverId} id="delete"></TaskColumn>
        </div>
      <div className="md:flex gap-6">
        <TaskColumn hoverId={hoverId} id="toDo" title="To-Do" tasks={tasks.toDo} />
        <TaskColumn
          hoverId={hoverId}
          id="inProgress"
          title="In Progress"
          tasks={tasks.inProgress}
        />
        <TaskColumn hoverId={hoverId} id="done" title="Done" tasks={tasks.done} />
  
      </div>
    </DndContext>
    </div>

  );
};



export default AllTasks;
