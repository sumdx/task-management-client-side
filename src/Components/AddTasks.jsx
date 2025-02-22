import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { IoIosAddCircle } from "react-icons/io";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddTasks = ({ tasks = {} ,allTaskRefetch}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const handleAddTask = (e) => {
    e.preventDefault();
    console.log(tasks);
    const ownerEmail = user.email;
    const title = e.target.title.value;
    const description = e.target.description.value;
    const dueDate = e.target.dueDate.value;
    const category = e.target.category.value;

    const categoryTasks = tasks[category] || [];
    const maxOrder = categoryTasks.reduce(
      (max, task) => Math.max(max, task.order || 0),
      0
    );
    const order = maxOrder + 1;
    const task = {
      ownerEmail,
      title,
      description,
      dueDate,
      category,
      order,
    };

    axiosPublic
      .post("/tasks", task)
      .then((res) => {
        console.log(res)
        Swal.fire({
          title: "Success!",
          text: "Sign Up Successfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
        allTaskRefetch();
        e.target.reset();
        setIsAddOpen(false);
      })
      .catch((e) => {

      });
  };
  return (
    <div className="bg-gray-100 p-6 mb-6 rounded-lg dark:bg-gray-800">
      {isAddOpen || (
        <div
          onClick={() => {
            setIsAddOpen(true);
          }}
        >
          <h1 className="text-white inline-flex items-center p-2 gap-3 rounded-lg text-2xl font-bold bg-blue-700 dark:text-white ">
            Add Task <IoIosAddCircle />
          </h1>
        </div>
      )}

      {isAddOpen && (
        <div>
          <div>
            <h1 className="text-2xl py-2 mb-2 font-bold dark:text-white inline-flex">
              Add Task{" "}
            </h1>
          </div>
          <form className="space-y-4 mb-4 " onSubmit={handleAddTask} action="">
            {/* 1 */}
            <div className="md:flex justify-between gap-4">
              <div className="md:min-w-1/2">
                <label
                  for="helper-text"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="helper-text"
                  aria-describedby="helper-text-explanation"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your task title"
                />
              </div>
              <div className="md:min-w-1/2">
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an Category
                </label>
                <select
                  required
                  id="category"
                  name="category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a Category</option>
                  <option value="toDo">To-Do</option>
                  <option value="inProgress">In-Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
            {/* 2 */}
            <div className="md:flex gap-4">
              <div className="md:min-w-1/2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="1"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>
              <div className="md:min-w-1/2">
                <label
                  for="duedate"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  Due Date :{" "}
                </label>
                <input
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="date"
                  name="dueDate"
                  id="dueDate"
                />
              </div>
            </div>

            <div className=" flex gap-4">
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add
              </button>

              <button
                onClick={() => {
                  setIsAddOpen(false);
                }}
                type="button"
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTasks;
