import { FC } from "react";
import { User } from "../../interfaces/user";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteUser } from "../../hooks/useUsers";
import { Link } from "react-router-dom";

interface Props {
    listUser: User[],
}

export const Table: FC<Props> = ({ listUser }) => {

    console.log(listUser);
    const queryClient = useQueryClient();

    const { mutate: deletePost } = useMutation((id: string) => deleteUser(id), {
        onSuccess(data) {
            queryClient.invalidateQueries(['posts']);
            toast.success('User deleted successfully', { position: "bottom-center" });
        },
        onError(error: any) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error((error as any).data.message, {
                    position: 'top-right',
                });
            }
        },
    });

    const onDeleteHandler = (id: string) => {
        if (window.confirm('Are you sure')) {
            deletePost(id);
        }
    };

    return (
        <table className="table table-responsive text-center table-hover">
            <thead className="table-dark">
                <tr>
                    <th scope="col">Avatar</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Second Name</th>
                    <th scope="col">Email</th>
                    <th scope="col" colSpan={2}>Option</th>
                </tr>
            </thead>
            <tbody>
                {
                    listUser?.map(data => (
                        <tr key={data.id}>
                            <th scope="row">
                                <img
                                    src={data.avatar}
                                    alt={data.first_name}
                                    className="rounded-circle avatar"
                                />
                            </th>
                            <td>{data.first_name}</td>
                            <td>{data.second_name}</td>
                            <td>{data.email}</td>
                            <td>
                                <div className="d-grid gap-2">
                                    <Link to="/issues/user" state={{
                                        id:data.id,
                                        first_name:data.first_name,
                                        second_name:data.second_name,
                                        email:data.email,
                                        avatar:data.avatar
                                    }}>
                                        <button type="button" className="btn btn-warning btn-block">Edit</button>
                                    </Link>
                                </div>
                            </td>
                            <td>
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-danger btn-block" onClick={() => onDeleteHandler(data.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
