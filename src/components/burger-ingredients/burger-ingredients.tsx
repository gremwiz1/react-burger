import React, {FC} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { ITypeData } from '../../utils/types';
import { useSelector } from '../../services/hooks/redux-hooks';

const BurgerIngredients: FC = () => {
    const [current, setCurrent] = React.useState('one');
    const burgerIngredients: ITypeData[] = useSelector((store) => store.items.items);
    React.useEffect(() => {
        const box = document.getElementById('box') as HTMLElement;
        const one = document.getElementById('one') as HTMLElement;
        const two = document.getElementById('two') as HTMLElement;
        const three = document.getElementById('three') as HTMLElement;
        let boxRect = box.getBoundingClientRect();
        function MathCoordinates() {
            let itemRect1 = one.getBoundingClientRect();
            let itemRect2 = two.getBoundingClientRect();
            let itemRect3 = three.getBoundingClientRect();
            let heightRect1 = Math.abs(itemRect1.y - boxRect.y);
            let heightRect2 = Math.abs(itemRect2.y - boxRect.y);
            let heightRect3 = Math.abs(itemRect3.y - boxRect.y);
            if (heightRect1 <= heightRect2 && heightRect1 <= heightRect3) {
                setCurrent('one');
            }
            else if (heightRect2 <= heightRect1 && heightRect2 <= heightRect3) {
                setCurrent('two');
            }
            else {
                setCurrent('three');
            }
        }
        box.addEventListener("scroll", MathCoordinates);
        return () => box.removeEventListener('scroll', MathCoordinates);
    }, []);
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
            <div className={style.scroll} id="box">
                <h2 className="mb-6 text text_type_main-medium" id='one'>Булки</h2>
                <div className={`${style.collection} mb-10 ml-4 mr-4`}>
                    {burgerIngredients.map((item: ITypeData) => (
                        item.type === "bun" ?
                            <Ingredient key={item._id} data={item} />
                            : ""
                    ))}
                </div>
                <h2 className="mb-6 text text_type_main-medium" id='two'>Соусы</h2>
                <div className={`${style.collection} mb-10 ml-4 mr-4`}>
                    {burgerIngredients.map((item: ITypeData) => (
                        item.type === "sauce" ?
                            <Ingredient key={item._id} data={item} />
                            : ""
                    ))}
                </div>
                <h2 className="mb-6 text text_type_main-medium" id='three'>Начинки</h2>
                <div className={`${style.collection} mb-10 ml-4 mr-4`}>
                    {burgerIngredients.map((item: ITypeData) => (
                        item.type === "main" ?
                            <Ingredient key={item._id} data={item} />
                            : ""
                    ))}
                </div>
            </div>
        </section>

    )
}
export default BurgerIngredients;