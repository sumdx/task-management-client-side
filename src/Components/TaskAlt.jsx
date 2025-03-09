import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import {CSS} from '@dnd-kit/utilities'

const TaskAlt = ({task , id}) => {
    const {setNodeRef, attributes, listeners, transform, transition} = useSortable({id});
    const style = {
        transition,
        transform : CSS.Transform.toString(transform)
    }
    return (
        <div style={style} ref={setNodeRef} {...attributes} {...listeners} className='p-4 bg-amber-200'>
            <h1>{task.title}</h1>
        </div>
    );
};

export default TaskAlt;