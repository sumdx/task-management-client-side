import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

const AllTasks = () => {
    const [toDoData, setToDoData] = useState([]);
    
    const data =[
        {
          "_id": "65d501a1b9f3a12d34e89a70",
          "userId": "firebase-uid-12345",
          "title": "Complete React Project",
          "description": "Finish the frontend UI with drag-and-drop.",
          "category": "To-Do",
          "createdAt": "2025-02-20T14:30:00Z",
          "updatedAt": "2025-02-20T15:00:00Z",
          "order": 1
        },
        {
          "_id": "65d501a2b9f3a12d34e89a71",
          "userId": "firebase-uid-12345",
          "title": "Setup Express Backend",
          "description": "Create API endpoints for task management.",
          "category": "To-Do",
          "createdAt": "2025-02-19T10:00:00Z",
          "updatedAt": "2025-02-20T16:00:00Z",
          "order": 2
        },
        {
          "_id": "65d501a3b9f3a12d34e89a72",
          "userId": "firebase-uid-12345",
          "title": "Deploy MongoDB Database",
          "description": "Setup MongoDB Atlas and connect with the backend.",
          "category": "In Progress",
          "createdAt": "2025-02-18T09:15:00Z",
          "updatedAt": "2025-02-19T08:45:00Z",
          "order": 1
        },
        {
          "_id": "65d501a4b9f3a12d34e89a73",
          "userId": "firebase-uid-12345",
          "title": "Implement Firebase Authentication",
          "description": "Allow users to log in using Google authentication.",
          "category": "In Progress",
          "createdAt": "2025-02-20T12:00:00Z",
          "updatedAt": "2025-02-20T12:30:00Z",
          "order": 2
        },
        {
          "_id": "65d501a5b9f3a12d34e89a74",
          "userId": "firebase-uid-12345",
          "title": "Design UI Components",
          "description": "Create reusable UI components using Tailwind CSS.",
          "category": "To-Do",
          "createdAt": "2025-02-21T09:45:00Z",
          "updatedAt": "2025-02-21T10:00:00Z",
          "order": 3
        },
        {
          "_id": "65d501a6b9f3a12d34e89a75",
          "userId": "firebase-uid-12345",
          "title": "Test API Endpoints",
          "description": "Use Postman to test all CRUD operations.",
          "category": "Done",
          "createdAt": "2025-02-19T14:20:00Z",
          "updatedAt": "2025-02-19T14:50:00Z",
          "order": 1
        },
        {
          "_id": "65d501a7b9f3a12d34e89a76",
          "userId": "firebase-uid-12345",
          "title": "Deploy Backend on Render",
          "description": "Host Express.js server on Render for production.",
          "category": "Done",
          "createdAt": "2025-02-19T17:10:00Z",
          "updatedAt": "2025-02-19T18:00:00Z",
          "order": 2
        },
        {
          "_id": "65d501a8b9f3a12d34e89a77",
          "userId": "firebase-uid-12345",
          "title": "Integrate Drag and Drop",
          "description": "Use react-beautiful-dnd to implement task reordering.",
          "category": "In Progress",
          "createdAt": "2025-02-22T11:30:00Z",
          "updatedAt": "2025-02-22T12:00:00Z",
          "order": 3
        },
        {
          "_id": "65d501a9b9f3a12d34e89a78",
          "userId": "firebase-uid-12345",
          "title": "Enable Dark Mode",
          "description": "Implement a dark mode toggle for the UI.",
          "category": "To-Do",
          "createdAt": "2025-02-23T08:00:00Z",
          "updatedAt": "2025-02-23T08:20:00Z",
          "order": 4
        },
        {
          "_id": "65d501aab9f3a12d34e89a79",
          "userId": "firebase-uid-12345",
          "title": "Optimize Performance",
          "description": "Improve page load speed and reduce API calls.",
          "category": "To-Do",
          "createdAt": "2025-02-24T09:10:00Z",
          "updatedAt": "2025-02-24T09:30:00Z",
          "order": 5
        }
      ]
    
    return (
        <div className='flex gap-6'>
            {/* TO DO */}
            <div className='bg-amber-200 w-full rounded-lg p-4'>
                <div className='flex'>
                <h1 className='inline-flex items-center gap-4 bg-amber-300 text-amber-900 py-2 px-4 rounded-lg'><FaPlay/> TO - DO</h1>
                <h1 className=' bg-amber-300 text-amber-900 ml-2  rounded-full'>2</h1>
                </div>
                
            </div>
            {/* in Progress */}
            <div className='bg-blue-200 w-full'>
                <h1> Layout 1</h1>
            </div>
            {/* Done */}
            <div className='bg-emerald-200 w-full'>
            <h1> Layout 1</h1>
            </div>
            {/* Delete */}
            <div>

            </div>
        </div>
    );
};

export default AllTasks;