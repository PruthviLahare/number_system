const below20 = ["zero", "one", "two", "three", "four", "five", "six",
  "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen",
  "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];

const below100 = ["", "", "twenty", "thirty", "forty", "fifty", "sixty",
  "seventy", "eighty", "ninety"];

const higherUnits = [
  [1000000000, "billion", null],
  [1000000, "million", null],
  [1000, "thousand", null],
  [100, "hundred", null],
  [10, "", below100] // Special case for numbers below 100
];

function findHighestUnitBelow(num) {
  for (const [unit, unitName, lookupTable] of higherUnits) {
    if (num >= unit) {
      return [unit, unitName, lookupTable];
    }
  }
  return [1, "", null];
}

function splitAndConvert(num, threshold, unitName, lookupTable) {
  const majorComponent = Math.floor(num / threshold);
  const remainder = num % threshold;
  console.log(lookupTable);


  const leftWords = lookupTable ? lookupTable[majorComponent] : numberToWords(majorComponent);

  if (remainder === 0) {
    return unitName === '' ? leftWords : [leftWords, unitName].join(' ');
  }

  const rightWords = numberToWords(remainder);

  return [leftWords, unitName, rightWords].join(" ");
}

function numberToWords(num) {
  if (num < 20) {
    return below20[num];
  }

  const [threshold, unitName, lookupTable] = findHighestUnitBelow(num);
  return splitAndConvert(num, threshold, unitName, lookupTable);
}

console.log(numberToWords(2));
console.log(numberToWords(20));
// console.log(numberToWords(200));
// console.log(numberToWords(2000));
// console.log(numberToWords(111));
// console.log(numberToWords(110));
// console.log(numberToWords(1100));
// console.log(numberToWords(110000));
// console.log(numberToWords(19900));
// console.log(numberToWords(1009900));
// console.log(numberToWords(29978));