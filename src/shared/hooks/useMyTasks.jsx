import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksByUser } from '../../app/features/tasks/tasksSlice';

export const useMyTasks = (userId) => {
    const dispatch = useDispatch()
    const {tasks, loading} = useSelector(state => state.tasks)

    useEffect(() => {
        dispatch(getTasksByUser(userId))
    }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps 
    
    return {tasks, loading};
};
