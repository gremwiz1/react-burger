import React from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import style from './ingredient.module.css';

function Ingredient() {
    return (
        <section className={style.section}>
            <h1 className={`${style.text_title} text text_type_main-large`}>Детали ингредиента</h1>
            <IngredientDetails />
        </section>
    )
}
export default Ingredient;