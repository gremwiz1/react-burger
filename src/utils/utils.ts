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