import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import style from './app.module.css';
import * as IngredientApi from '../../utils/IngredientApi';
import Modal from '../modal/modal';
import dataOrder from '../../utils/data';

function App() {
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpenModalOrder, setIsOpenModalOrder] = React.useState(false);
    const [isOpenModalIngredient, setIsOpenModalIngredient] = React.useState(false);
    const [ingredientModal, setIngredientModal] = React.useState("");
    const [title, setTitle] = React.useState("");
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
        setIsOpenModalOrder(true);
    }
    React.useEffect(() => {
        IngredientApi.getIngredients()
            .then((ingredients) => {
                setData(ingredients.data);
                setIsLoading(true);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className={style.app}>
            <AppHeader />
            {isLoading ?
                <main className={style.content}>
                    <BurgerIngredients data={data} openModalIngredient={openModalIngredient} />
                    <BurgerConstructor data={data} openModalIngredient={openModalIngredient} openModalOrder={openModalOrder} />
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