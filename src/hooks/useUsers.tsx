import { useQuery } from "@tanstack/react-query"
import { userApi, header } from '../api/api';
import { User } from "../interfaces/user";


const getListUser = async (): Promise<User[]> => {
    const { data } = await userApi.get<User[]>('/users');

    return data;
}

export const saveUser = async (formData: {}): Promise<User> => {
    const {data} = await userApi.post<User>(
        '/users',
        formData
    );

    return data;
}

const getUser = async (id:string): Promise<User> => {
    const { data } = await userApi.get<User>(`/users/${id}`);

    return data;
}

export const updateUser = async (id:string, formData:{}): Promise<User> => {
    const { data } = await userApi.put<User>(`/users/${id}`, formData);

    return data;
}

export const deleteUser = async (id: string): Promise<User> => {
    const { data } = await userApi.delete<User>(`/users/${id}`);

    return data;
}


export const useListUser = () => {
    const query = useQuery(
        ['listUser'],
        () => getListUser()
    );

    return { query };
}

export const useGetUser = (id:string) => {
    const query = useQuery(
        ['user'],
        () => getUser(id)
    );

    return { query };
}
