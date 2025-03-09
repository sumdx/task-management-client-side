import {
  closestCenter,
  DndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
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

const AllTasks = () => {
  const [allTasks, allTaskRefetch, isTaskFetching, isTaskLoading] =
    useAllTasks();

  const [hoverId, setHoverId] = useState("");
  const axiosPublic = useAxiosPublic();

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (allTasks) {
      setTasks(allTasks);
    }
  }, [allTasks]);

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
      } catch (error) {}
      return;
    }

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(
        (task) => task._id !== sourceId
      ),
      [destinationColumn]: [
        ...prev[destinationColumn],
        { ...taskToMove, category: destinationColumn },
      ],
    }));

    try {
      await axiosPublic.patch(`/task`, {
        sourceId,
        category: destinationColumn,
      });
      allTaskRefetch();
    } catch (error) {}
  };
  //   Handle while draging event
  const handleDragOver = (e) => {
    const { over } = e;
    setHoverId(over.id);
  };

  return (
    <div>
      <div>
        <AddTasks tasks={tasks} allTaskRefetch={allTaskRefetch}></AddTasks>
      </div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="flex text-center bg-red-200 p-6 mb-4">
          <TaskColumn hoverId={hoverId} id="delete"></TaskColumn>
          {/* <TaskColumn hoverId={hoverId} id="edit"></TaskColumn> */}
        </div>
        <div className="md:flex gap-6">
          <TaskColumn
            allTaskRefetch={allTaskRefetch}
            hoverId={hoverId}
            id="toDo"
            title="To-Do"
            tasks={tasks.toDo}
          />
          <TaskColumn
            hoverId={hoverId}
            id="inProgress"
            title="In Progress"
            tasks={tasks.inProgress}
          />
          <TaskColumn
            hoverId={hoverId}
            id="done"
            title="Done"
            tasks={tasks.done}
          />
        </div>
      </DndContext>
    </div>
  );
};

export default AllTasks;
