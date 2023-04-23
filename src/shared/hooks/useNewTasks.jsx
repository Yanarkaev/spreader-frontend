import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewTasks } from '../../app/features/tasks/tasksSlice';

export const useNewTasks = () => {
    const dispatch = useDispatch()
    const {tasks, loading} = useSelector(state => state.tasks)

    useEffect(() => {
        dispatch(getNewTasks())
    }, [dispatch])
    
    return {tasks, loading};
};
