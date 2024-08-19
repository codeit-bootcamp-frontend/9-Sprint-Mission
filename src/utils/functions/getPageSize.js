export const getPageSize = () => {
    const width = window.innerWidth;

    if (width < 767) {
        return 1;
    } else if (width < 1200) {
        return 2;
    } else {
        return 4;
    }
};
