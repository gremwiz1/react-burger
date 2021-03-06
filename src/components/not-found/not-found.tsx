import React, {FC} from "react";
import { Link, useHistory } from "react-router-dom";
import style from './not-found.module.css';
const NotFound: FC = () => {
    const history = useHistory();
    function handleClickLink() {
        history.goBack();
    }
    return (
        <section className={style.section}>
            <h1 className="text text_type_main-default mb-6">404</h1>
            <p className="text text_type_main-default mb-6">Страница не найдена</p>
            <Link to="" onClick={handleClickLink} className="text text_type_main-default">Назад</Link>
        </section>
    )
};
export default NotFound;