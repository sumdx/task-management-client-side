
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAllTasks = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const {data : allTasks, refetch : allTaskRefetch, isFetching : isTaskFetching, isLoading : isTaskLoading} = useQuery({
        queryKey : ["allTasks"],
        queryFn : async() =>{
            const res = await axiosPublic.get(`/tasks/${user?.email}`);
            return res.data;
        }
    })
    return [allTasks, allTaskRefetch,isTaskFetching, isTaskLoading];
};

export default useAllTasks;