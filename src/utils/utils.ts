import { ITypeData } from "./types";

export function setCookie(name: string, value: string | null, props: { [x: string]: any; expires?: any; } | undefined) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    if(value) {
        value = encodeURIComponent(value);
    }
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}
export function getCookie(name: string) {
    const matches = document.cookie.match(
        // eslint-disable-next-line no-useless-escape
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function deleteCookie(name: string) {
    setCookie(name, null, { expires: -1 });
}
export function setTokens(res: any) {
    const accessToken = res.accessToken.split('Bearer ')[1];
    const refreshToken = res.refreshToken;
    setCookie('token', accessToken, {});
    localStorage.setItem('refreshToken', refreshToken);
};

export function signOut() {
    localStorage.removeItem('refreshToken');
    deleteCookie('token');
};
export function setTimeLocalRu(date: string) {
    const createOrderDate = new Date(date);
    const timeZone = `i-GMT${(createOrderDate.getTimezoneOffset() / 60) < 0 ? '+' : '-'}${Math.abs((createOrderDate.getTimezoneOffset() / 60))}`;
    const time = `${createOrderDate.getHours()}:${createOrderDate.getMinutes()}`;
    let timeDay = "";
    const oneDay = 1000 * 60 * 60 * 24;
        const dateNow = new Date();
        const diffInTime = dateNow.getTime() - createOrderDate.getTime();
        const diffInDays = Math.round(diffInTime / oneDay);
        switch (diffInDays) {
            case 1: timeDay='Вчера';
                break;
            case 2: timeDay='Позавчера';
                break;
            case 0: timeDay='Сегодня';
                break;
            case 3: timeDay='Позапозавчера';
                break;
            case 4: timeDay='Четыре дня назад';
                break;
            case 5: timeDay='Пять дней назад';
                break;
            case 6: timeDay='Шесть дней назад';
                break;
            case 7: timeDay='Неделю назад';
                break;
            default: timeDay='Больше недели назад';
                break;
        };
        return ({timeDay: timeDay, time: time, timeZone: timeZone});
}
export function amountOrderAndQuantityIngredients(burgerIngredients: ITypeData[], ingredients: string[]) {
    interface IObjectKeys {
        [key: string]: number;
    }
    const result: IObjectKeys = {}
    ingredients.forEach((ingredient) => {
        if (result[ingredient]) {
            result[ingredient]++;
        }
        else {
            result[ingredient] = 1;
        }
    })
    const resultArray: ITypeData[] = [];
    const keys = Object.keys(result)
    keys.forEach((key) => {
        const ingredient = burgerIngredients.find((item) => item._id === key);
        if (ingredient) {
            ingredient.quantity = result[key];
            resultArray.push(ingredient);
        }
    })
    let amount = 0;
    resultArray.forEach((ingredient) => {
        if (ingredient.quantity) {
            amount += ingredient.quantity * ingredient.price;
        }
    });
    return({amount: amount, resultArray: resultArray});
}