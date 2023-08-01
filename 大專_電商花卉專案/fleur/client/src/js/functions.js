// export const createArray = length => [...new Array(length).keys()].map(el => el + 1);
export const createArray = length => Array.from({ length }, (_, i) => i + 1);

export const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const shuffle = arr => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        let j = getRandom(0, i);
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    };
    return newArr;
};