import { Table } from '../components/Table';
import { Title } from '../components/Title';
import { header } from '../../api/api';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { useListUser } from '../../hooks/useUsers';

export const ListUsers = () => {

    const { query } = useListUser();

    return (
        <div className="mt-5">
            <Title title={header.listUser.title} buttonName={header.listUser.buttonName} linkTo={header.listUser.linkTo} />
            <hr />
            {
                query.isLoading
                    ? (<div className="text-center mt-5">
                        <LoadingIcon />
                    </div>
                    )
                    : (<Table listUser={query.data || []} />)
            }

        </div>
    )
}
