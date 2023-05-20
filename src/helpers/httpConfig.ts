export const httpConfig = (token: String) => {
    return {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
};