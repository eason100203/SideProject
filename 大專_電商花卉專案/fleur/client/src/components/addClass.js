export const addClass = (originClass, newClasses) => {
    const temp = [originClass];
    if (newClasses !== undefined) {
        Array.isArray(newClasses)
            ? temp.push(...newClasses)
            : temp.push(newClasses);
    };
    return temp.join(' ');
}