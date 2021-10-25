import React from 'react';
import { Typography, Box, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import typeData from '../../utils/types';

function BurgerIngredients({ data, openModalIngredient }) {
    const [current, setCurrent] = React.useState('one');

    return (
        <section className={`${style.section} mr-10 mb-5`}>
            <h1 className={`${style.title} mt-10 text text_type_main-large`}>Соберите бургер</h1>
            <nav className={`${style.nav} mb-10`}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </nav>
            <div className={style.scroll}>
                <h2 className="mb-6 text text_type_main-medium">Булки</h2>
                <div className={`${style.collection} mb-10 ml-4 mr-4`}>
                    {data.map((item) => (
                        item.type === "bun" ?
                            <Ingredient key={item._id} data={item} openModalIngredient={openModalIngredient} />
                            : ""
                    ))}
                </div>
                <h2 className="mb-6 text text_type_main-medium">Соусы</h2>
                <div className={`${style.collection} mb-10 ml-4 mr-4`}>
                    {data.map((item) => (
                        item.type === "sauce" ?
                            <Ingredient key={item._id} data={item} openModalIngredient={openModalIngredient} />
                            : ""
                    ))}
                </div>
                <h2 className="mb-6 text text_type_main-medium">Начинки</h2>
                <div className={`${style.collection} mb-10 ml-4 mr-4`}>
                    {data.map((item) => (
                        item.type === "main" ?
                            <Ingredient key={item._id} data={item} openModalIngredient={openModalIngredient} />
                            : ""
                    ))}
                </div>
            </div>
        </section>

    )
}
BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape(typeData).isRequired
    ),
    openModalIngredient: PropTypes.func.isRequired
}
export default BurgerIngredients;