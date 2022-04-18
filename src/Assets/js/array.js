export const searchOnArray = (array, value, finalArraySetter, searchKey = null) => {
    let filtered = '';
    if (searchKey != null) {
        filtered = array.filter(item => item[searchKey].includes(value))
    } else {
        filtered = array.filter(item => item.includes(value))
        console.log('ok')
    }
    finalArraySetter(filtered);
}