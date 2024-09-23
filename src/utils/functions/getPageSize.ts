type pageSize = "mobile" | "tablet" | "pc";

export const getPageSize = (): pageSize => {
    const width: number = window.innerWidth;

    if (width < 767) {
        return "mobile";
    } else if (width < 1200) {
        return "tablet";
    } else {
        return "pc";
    }
};
