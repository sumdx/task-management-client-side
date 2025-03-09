import React from 'react';
import TaskAlt from './TaskAlt';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const TaskColumnAlt = ({tasks}) => {

    return (
        <div>
            <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
            >
            {
                tasks.map(task => {
                    return <TaskAlt key={task.id} task={task} id={task.id}></TaskAlt>
                })
            }
            </SortableContext>
        </div>
    );
};

export default TaskColumnAlt;