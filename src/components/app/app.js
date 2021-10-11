import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import style from './app.module.css';

function App() {
    return (
        <div className={style.app}>
            <AppHeader />
            <main className={style.content}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </div>
    )
}

export default App;