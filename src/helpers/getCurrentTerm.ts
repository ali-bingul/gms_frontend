export const getCurrentTerm = () => {
    const currentMonth: number = new Date().getMonth() + 1;
    if (currentMonth >= 3 && currentMonth <= 6) {
        return "Bahar";
    } else if (currentMonth >= 7 && currentMonth <= 9) {
        return "Yaz";
    } else {
        return "Güz";
    }
}