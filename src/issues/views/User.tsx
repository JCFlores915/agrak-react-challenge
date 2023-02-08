import { Link } from 'react-router-dom';
import { Form } from '../components/Form';
import { Title } from '../components/Title';
import { header } from '../../api/api';

export const User = () => {
    return (
        <div className="row mt-5">
            <Title title={header.addUser.title} buttonName={header.addUser.buttonName} linkTo={header.addUser.linkTo} />
            <hr />
            <Form />
        </div>
    )
}
