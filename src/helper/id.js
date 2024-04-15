
const findId = (id) => {
    const lastIndex = id.lastIndexOf('-');
    const lastValue = id.substring(lastIndex + 1);
    return lastValue;

} 

export {
    findId
}