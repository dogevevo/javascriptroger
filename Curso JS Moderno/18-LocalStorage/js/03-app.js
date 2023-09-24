

const mesesArray = JSON.parse( localStorage.getItem('meses'));
console.log(mesesArray);

mesesArray.push('nuevo Mes');
localStorage.setItem('meses', JSON.stringify(mesesArray)); 

