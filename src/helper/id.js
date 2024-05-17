
const findId = (id) => {
    const lastIndex = id.lastIndexOf('-');
    const lastValue = id.substring(lastIndex + 1).trim();
    return lastValue;

} 

export {
    findId
}