import { DndContext, useDraggable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import React from "react";
import Task from "../Components/Task";
import TaskAlt from "../Components/TaskAlt";
import TaskColumnAlt from "../Components/TaskColumnAlt";

const AllTaskAlt = () => {
  const tasks = {
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
  return (
    <DndContext>

        <TaskColumnAlt tasks={tasks?.toDo}></TaskColumnAlt>
 
    </DndContext>
  );
};

export default AllTaskAlt;
