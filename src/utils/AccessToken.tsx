import secureLocalStorage from "react-secure-storage";

const TOKEN_KEY = "accessToken";

export const setToken = (value: String) => {
    secureLocalStorage.setItem(TOKEN_KEY, value);
}

export const getToken = () => {
    return secureLocalStorage.getItem(TOKEN_KEY);
}

export const removeToken = () => {
    secureLocalStorage.removeItem(TOKEN_KEY);
}