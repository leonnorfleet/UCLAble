export function voteSort(objArray) {
    let temp = objArray.slice();
    return [].concat(temp).sort((a, b) => b.votes - a.votes);
}

export function dateSort(objArray, option){
    let temp = objArray.slice();
    switch(option)
    {
        case 'a':
            return [].concat(temp).sort((a, b) => a.date - b.date);

        case 'd':
        default:
            return [].concat(temp).sort((a, b) => b.date - a.date);
    }
}

export function locationSort(objArray, lstr) {
    let temp = objArray.slice();
    if (lstr === '')
        return [].concat(temp);

    return [].concat(temp).filter(obj => obj.location === lstr);
}