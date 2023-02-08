import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    title: string;
    buttonName: string;
    linkTo: string;
}

export const Title: FC<Props> = ({title, buttonName, linkTo}) => {
    return (
        <div className="row">
                <div className="col-lg-10 col-md-10 col-sm-8">
                    <h1>{title}</h1>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-4">
                    <div className="d-grid gap-2">
                        <Link to={linkTo} className="btn btn-primary" role={"button"}>
                            {buttonName}
                        </Link>
                    </div>
                </div>
            </div>
    )
}

