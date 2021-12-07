import React, {FC} from 'react';
import style from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { ITypeData } from '../../utils/types';

const IngredientDetails: FC = () => {
    const { id } = useParams<{id: string}>();
    const dataStorage = localStorage.getItem('burgerIngredients');
    if(dataStorage) {
        const data = JSON.parse(dataStorage).find((item: ITypeData) => item._id === id)
        return (
            <section className={style.section}>
                <img className={`${style.image} mb-4`} src={data.image} alt={data.name} />
                <h3 className={`${style.title} text text_type_main-medium mb-8`}>{data.name}</h3>
                <ul className={`${style.list} mb-15`}>
                    <li className={`${style.element} mr-5`}>
                        <p className={`${style.content} text text_type_main-default text_color_inactive mb-2`}>Калории,ккал</p>
                        <p className={`${style.content} text text_type_digits-default text_color_inactive`}>{data.calories}</p>
                    </li>
                    <li className={`${style.element} mr-5`}>
                        <p className={`${style.content} text text_type_main-default text_color_inactive mb-2`}>Белки, г</p>
                        <p className={`${style.content} text text_type_digits-default text_color_inactive`}>{data.proteins}</p>
                    </li>
                    <li className={`${style.element} mr-5`}>
                        <p className={`${style.content} text text_type_main-default text_color_inactive mb-2`}>Жиры, г</p>
                        <p className={`${style.content} text text_type_digits-default text_color_inactive`}>{data.fat}</p>
                    </li>
                    <li className={`${style.element} mr-5`}>
                        <p className={`${style.content} text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</p>
                        <p className={`${style.content} text text_type_digits-default text_color_inactive`}>{data.carbohydrates}</p>
                    </li>
                </ul>
            </section>
        )
    }
    else {
        return (<></>)
    }


    
}
export default IngredientDetails;