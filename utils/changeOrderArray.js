export function changePosition(arr, to) {
    let from = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].nomeToken.includes('Coin Livre')) {
        from = i
        }
      }
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
};