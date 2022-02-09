import React, {FC} from 'react';
import { Route, Switch, NavLink, useLocation, useHistory } from 'react-router-dom';
import style from './profile.module.css';
import UserProfile from '../../components/user-profile/user-profile';
import { logout } from '../../services/actions';
import OrderInProfile from '../../components/order-in-profile/order-in-profile';
import { useDispatch } from '../../services/hooks/redux-hooks';

const Profile: FC = () => {
    const { pathname } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(logout(() => {
            history.push('/login');
        }))
    }
    const mockData = {
        "success": true,
        "orders": [
            {
                "_id": "61fe56c06d7cd8001b2d4103",
                "ingredients": [
                    "60d3b41abdacab0026a733c6",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733cb",
                    "60d3b41abdacab0026a733ca",
                    "60d3b41abdacab0026a733cf",
                    "60d3b41abdacab0026a733c7"
                ],
                "status": "done",
                "name": "Био-марсианский краторный люминесцентный метеоритный бургер",
                "createdAt": "2022-02-05T10:51:44.191Z",
                "updatedAt": "2022-02-05T10:51:44.451Z",
                "number": 9476
            },
            {
                "_id": "61fe56a76d7cd8001b2d4102",
                "ingredients": [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cf"
                ],
                "status": "done",
                "name": "Space флюоресцентный антарианский бургер",
                "createdAt": "2022-02-05T10:51:19.965Z",
                "updatedAt": "2022-02-05T10:51:20.206Z",
                "number": 9475
            },
            {
                "_id": "61fe51f56d7cd8001b2d40f7",
                "ingredients": [
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733c7"
                ],
                "status": "done",
                "name": "Space флюоресцентный бургер",
                "createdAt": "2022-02-05T10:31:17.765Z",
                "updatedAt": "2022-02-05T10:31:18.047Z",
                "number": 9474
            },
            {
                "_id": "61fe48e86d7cd8001b2d40c8",
                "ingredients": [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c9",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cf"
                ],
                "status": "done",
                "name": "Space бессмертный флюоресцентный антарианский бургер",
                "createdAt": "2022-02-05T09:52:40.373Z",
                "updatedAt": "2022-02-05T09:52:40.651Z",
                "number": 9473
            },
            {
                "_id": "61fe24b76d7cd8001b2d40a6",
                "ingredients": [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733cd"
                ],
                "status": "done",
                "name": "Space флюоресцентный бургер",
                "createdAt": "2022-02-05T07:18:15.105Z",
                "updatedAt": "2022-02-05T07:18:15.399Z",
                "number": 9472
            },
            {
                "_id": "61fda4556d7cd8001b2d4084",
                "ingredients": [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733cd"
                ],
                "status": "done",
                "name": "Space флюоресцентный бургер",
                "createdAt": "2022-02-04T22:10:29.490Z",
                "updatedAt": "2022-02-04T22:10:29.795Z",
                "number": 9471
            },
            {
                "_id": "61fda2786d7cd8001b2d4080",
                "ingredients": [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733c7"
                ],
                "status": "done",
                "name": "Space флюоресцентный бургер",
                "createdAt": "2022-02-04T22:02:32.082Z",
                "updatedAt": "2022-02-04T22:02:32.330Z",
                "number": 9470
            },],
            "total": 28752,
            "totalToday": 138}
    return (
        <section className={style.section}>
            <div className={style.flex}>
                <nav className={`${style.nav} mr-15 mb-20`}>
                    <NavLink exact to='/profile'
                        className={pathname === '/profile'
                            ?
                            `${style.link} text text_type_main-medium ${style.active}`
                            :
                            `${style.link} text text_type_main-medium ${style.color}`}>
                        Профиль
                    </NavLink>
                    <NavLink exact to='profile/orders'
                        className={pathname === '/profile/orders'
                            ?
                            `${style.link} text text_type_main-medium ${style.active}`
                            :
                            `${style.link} text text_type_main-medium ${style.color}`} >
                        История заказов
                    </NavLink>
                    <nav onClick={handleClick} className={`${style.link} text text_type_main-medium ${style.color}`}>
                        Выход
                    </nav>
                </nav>
                <Switch>
                    <Route path='/profile' exact={true}>
                        <UserProfile />
                    </Route>
                    <Route path='/profile/orders' exact={true}>
                    <div className={style.scroll}>
                {
                    mockData.orders.map((order, index) => (
                        <OrderInProfile order={order} key={order._id}/>
                    ))
                }
            </div> 
                    </Route>
                    <Route path='/pofile/orders/:id' exact={true}></Route>
                </Switch>
            </div>
        </section>
    )
}
export default Profile;