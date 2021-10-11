import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import data from '../../utils/data';
import style from './app.module.css';

function App() {
    return (
        <div className={style.app}>
            <AppHeader />
            <main className={style.content}>
                <BurgerIngredients data={data} />
                <BurgerConstructor data={data} />
            </main>
        </div>
    )
}

export default App;