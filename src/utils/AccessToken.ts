import secureLocalStorage from "react-secure-storage";

const TOKEN_KEY = "accessToken";

export const setToken = (value: String) => {
    secureLocalStorage.setItem(TOKEN_KEY, value);
}

export const getToken = () => {
    const token = secureLocalStorage.getItem(TOKEN_KEY);
    if (token !== null) {
        return token.toString();
    }
    return "";
}

export const removeToken = () => {
    secureLocalStorage.removeItem(TOKEN_KEY);
}