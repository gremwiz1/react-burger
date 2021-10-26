import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import style from './app.module.css';
import * as IngredientApi from '../../utils/IngredientApi';
import Modal from '../modal/modal';
import { BurgerContext } from '../../contexts/burgerContext';

function App() {
    const [burgerStructure, setBurgerStructure] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpenModalOrder, setIsOpenModalOrder] = React.useState(false);
    const [isOpenModalIngredient, setIsOpenModalIngredient] = React.useState(false);
    const [ingredientModal, setIngredientModal] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [dataOrder, setDataOrder] = React.useState(null);
    function closeModal() {
        setIsOpenModalOrder(false);
        setIsOpenModalIngredient(false);
    }
    function openModalIngredient(ingredient) {
        setIngredientModal(ingredient);
        setTitle("Детали ингредиента");
        setIsOpenModalIngredient(true);
    }
    function openModalOrder() {
        setTitle("");
        const idIngredients = [];
        burgerStructure.forEach((item) => {
            if (item.type !== 'bun') {
                idIngredients.push(item._id);
            }
        });
        IngredientApi.createOrder(idIngredients)
            .then((result) => {
                setDataOrder({
                    number: result.order.number,
                    description: "идентификатор заказа",
                    status: "Ваш заказ начали готовить",
                    wait: "Дождитесь готовности на орбитальной станции"
                });
                setIsOpenModalOrder(true);
            }).catch((err) => console.log(err));
    }
    React.useEffect(() => {
        IngredientApi.getIngredients()
            .then((ingredients) => {
                setBurgerStructure(ingredients.data);
                setIsLoading(true);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className={style.app}>
            <AppHeader />
            {isLoading ?
                <main className={style.content}>
                    <BurgerContext.Provider value={{ burgerStructure, setBurgerStructure }}>
                        <BurgerIngredients openModalIngredient={openModalIngredient} />
                        <BurgerConstructor openModalIngredient={openModalIngredient} openModalOrder={openModalOrder} />
                    </BurgerContext.Provider>

                </main>
                : ""}
            {isOpenModalOrder ? <Modal closeModal={closeModal} title={title} >
                <OrderDetails order={dataOrder} />
            </Modal> : ""}
            {isOpenModalIngredient ? <Modal closeModal={closeModal} title={title} >
                <IngredientDetails data={ingredientModal} />
            </Modal> : ""}

        </div>
    )
}

export default App;