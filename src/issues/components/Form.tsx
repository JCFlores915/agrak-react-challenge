import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveUser, updateUser } from "../../hooks/useUsers";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import { useGetUser } from "../../hooks/useUsers";
import { useEffect } from "react";

type Inputs = {
    id?: string,
    first_name?: string,
    second_name?: string,
    email?: string,
    avatar?: string
}

export const Form = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const existId = location?.state?.id || false;
    const first_name = location?.state?.first_name || '';
    const second_name = location?.state?.second_name || '';
    const email = location?.state?.email || '';
    const avatar = location?.state?.avatar || ''

    // const { query } = useGetUser(existId);




    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            first_name: first_name,
            second_name: second_name,
            email: email,
            avatar: avatar
        }
    });



    const queryClient = useQueryClient();
    const { mutate: Post } = useMutation(
        (post: {}) => existId ? updateUser(existId, post) : saveUser(post),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts']);
                if (existId) {
                    toast.success('User Update successfully', { position: 'bottom-center' });
                    navigate("/issues/list");
                } else {
                    toast.success('User created successfully', { position: 'bottom-center' });
                    navigate("/issues/list");
                }

            },
            onError: (error: any) => {
                if (Array.isArray(error.response.data.error)) {
                    error.data.error.forEach((el: any) =>
                        toast.error(el.message, {
                            position: 'bottom-center',
                        })
                    );
                } else {
                    toast.error(error.response.data.message, {
                        position: 'bottom-center',
                    });
                }
            },
        }
    );

    const onSubmit: SubmitHandler<Inputs> = data => {

        Post({
            first_name: data.first_name,
            avatar: data.avatar,
            second_name: data.second_name,
            email: data.email
        });
    };

    return (

        <form className="row g-3" onSubmit={handleSubmit(onSubmit)} >
            <div className="col-md-12">
                <label className="form-label"><strong>First name</strong></label>
                <input
                    {...register("first_name", { required: true })}
                    type="text"
                    className={errors.first_name ? "form-control border-danger" : "form-control"}
                    placeholder="First name"
                />
                {errors.first_name && <small className="text-danger">This field is required</small>}
            </div>

            <div className="col-md-12">
                <label className="form-label"><strong>Second name</strong></label>
                <input
                    {...register("second_name", { required: true })}
                    type="text"
                    className={errors.second_name ? "form-control border-danger" : "form-control"}
                    placeholder="Second name"
                />
                {errors.second_name && <small className="text-danger">This field is required</small>}
            </div>

            <div className="col-md-12">
                <label className="form-label"><strong>Email</strong></label>
                <input
                    {...register("email", { required: true })}
                    type="email"
                    className={errors.email ? "form-control border-danger" : "form-control"}
                    placeholder="Email"
                />
                {errors.email && <small className="text-danger">This field is required</small>}
            </div>

            <div className="col-md-12">
                <label className="form-label"><strong>URL Image</strong></label>
                <input
                    {...register("avatar", { required: false })}
                    type="text"
                    className={"form-control"}
                    placeholder="URL Image"
                />
            </div>

            <div className="d-grid gap-2">

                {existId ? (<button className="btn btn-warning" type="submit">Update User</button>
                ) : (<button className="btn btn-success" type="submit">Save User</button>)}
            </div>
        </form>
    );
}