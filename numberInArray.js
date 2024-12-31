function split(number) {
  const array = [];
  let updatedNumber = number;

  while (updatedNumber > 0) {
    array.unshift(updatedNumber % 1000);
    updatedNumber = Math.floor(updatedNumber / 1000);
  }

  return array;
}

console.log(split(100000));  
