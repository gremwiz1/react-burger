import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import style from './app.module.css';
import * as IngredientApi from '../../utils/IngredientApi';
import ModalOverlay from '../modal-overlay/modal-overlay';

function App() {
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [isIngredient, setIsIngredient] = React.useState(false);
    const [ingredientModal, setIngredientModal] = React.useState("");
    function closeModal() {
        setIsOpenModal(false);
    }
    function openModalIngredient(ingredient) {
        setIsIngredient(true);
        setIngredientModal(ingredient);
        setIsOpenModal(true);
    }
    function openModalOrder() {
        setIsIngredient(false);
        setIsOpenModal(true);
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
                    <BurgerIngredients data={data} />
                    <BurgerConstructor data={data} openModalIngredient={openModalIngredient} openModalOrder={openModalOrder} />
                </main>
                : ""}
            {isOpenModal ? <ModalOverlay closeModal={closeModal} isIngredient={isIngredient} ingredientModal={ingredientModal} /> : ""}


        </div>
    )
}

export default App;