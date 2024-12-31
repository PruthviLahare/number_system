const SPACE = ' ';

const zeroToninety = ['zero', 'one', 'two', 'three',
  'four', 'five', 'six',
  'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen',
  'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen'
];

const tensMultiples = ['twenty', 'thirty', 'forty',
  'fifty', 'sixty', 'seventy',
  'eighty', 'ninety'
];

const suffix = ['thousand', 'million', 'billion'];

function getMatchedWord(array, value) {
  return array[value];
}

function modulus(dividend, divisor) {
  return dividend % divisor;
}

function exponent(power) {
  return 10 ** power;
}

function getFirstDigit(number, divisor) {
  return Math.floor(number / divisor);
}

function getWordForLessThan20(number) {
  return getMatchedWord(zeroToninety, number);
}

function getMultipleOfTen(number) {
  const tensDigit = getFirstDigit(number, 10);

  return getMatchedWord(tensMultiples, tensDigit - 2);
}

function tensDigit(number) {
  if (number <= 19) {
    return getWordForLessThan20(number);
  }

  if (modulus(number, 10) === 0) {
    return getMultipleOfTen(number);
  }

  const firstDigit = getFirstDigit(number, 10);
  const lastDigit = modulus(number, 10);
  let wordString = getMatchedWord(tensMultiples, firstDigit - 2) + SPACE;

  wordString += getMatchedWord(zeroToninety, lastDigit);

  return wordString;
}

function hundredsDigit(number) {
  const firstPlace = getFirstDigit(number, 100);         // 3 lines are same in tensDigit and hundredsDigit
  const remainingDigits = modulus(number, 100);

  let wordString = convertToWords(firstPlace) + SPACE + 'hundred';

  if (remainingDigits !== 0) {
    wordString += SPACE + convertToWords(remainingDigits);
  }

  return wordString;
}

function split(number) {          // write this function using recursion
  const array = [];
  let updatedNumber = number;

  while (updatedNumber > 0) {
    array.unshift(updatedNumber % 1000);
    updatedNumber = Math.floor(updatedNumber / 1000);
  }

  return array;
}

function getPlaceValue(length, position) {
  if (position === ((aplength / 2) - 1)) {
    return '';
  }
  const placeValue = (length / 2) - position - 2;

  return suffix[placeValue];
}

function convertToWords(number) {
  if (number === 0) {
    return '';
  }

  return number < 100 ? tensDigit(number) : hundredsDigit(number);
}

function concat(str1, str2, tailValue) {
  return str1 + str2 + SPACE + tailValue + SPACE;
}

function numberToWords(number) {
  if (number === 0) {
    return 'zero';
  }

  // const numInGroupOf3 = split(number);
  // const length = numInGroupOf3.length;
  // let wordString = '';

  // for (let index = 0; index < length; index++) {
  //   const tailValue = getPlaceValue(length, index);
  //   const wordFormat = convertToWords(numInGroupOf3[index]);

  //   wordString = concat(wordString, wordFormat, tailValue);
  // }
  let updatedNumber = number;
  let index = 0;
  let wordString = '';
  let len = (number + '').length;

  while (updatedNumber > 0) {
    const tailValue = getPlaceValue(len, index);
    wordString += convertToWords(updatedNumber % 1000) + SPACE + tailValue + SPACE;
    updatedNumber = Math.floor(updatedNumber / 1000);
    index += 1;
  }

  return wordString.trim();
}

//  ----------** Testting Framework **----------

function expectationSegment(actual, expected) {
  const actualSegment = "Actual:   " + actual;
  const expectedSegment = "Expected: " + expected;

  return expectedSegment + "\n" + actualSegment;
}

function displayResult(mark, number, expected, actual) {
  console.log(mark + "Number 👉 ", number);
  console.log('\nExpected 👉 "', expected, '"| Actual👉', actual);
  console.log('\n**--------------------------------------------------------**');
}

function getMark(actual, expected) {
  return actual === expected ? '✅' : '❌';
}

function testNumberToWords(number, expected) {
  const actual = numberToWords(number);
  const mark = getMark(actual, expected);

  displayResult(mark, number, expected, actual);
}

function testTwelveDigits() {
  testNumberToWords(111111111111, 'one hundred eleven billion one hundred' + ' eleven million one hundred eleven thousand one hundred eleven');
}

function testElevenDigits() {
  testNumberToWords(11111111111, 'eleven billion one hundred eleven million' + ' one hundred eleven thousand one hundred eleven');
}

function testTenDigits() {
  testNumberToWords(1111111111, 'one billion one hundred eleven million one' + ' hundred eleven thousand one hundred eleven');
}

function testNineDigits() {
  testNumberToWords(111111111, 'one hundred eleven million one hundred eleven'
    + ' thousand one hundred eleven');
}

function testEightDigits() {
  testNumberToWords(99999999, 'ninety nine million nine hundred ninety nine' + ' thousand nine hundred ninety nine');
}

function testSevenDigits() {
  testNumberToWords(1233467, 'one million two hundred thirty three thousand' + ' four hundred sixty seven');
}

function testSixDigits() {
  testNumberToWords(100010, 'one hundred thousand ten');
}

function testFiveDigit() {
  testNumberToWords(10000, 'ten thousand');
  testNumberToWords(10001, 'ten thousand one');
}

function testFourDigit() {
  testNumberToWords(1000, 'one thousand');
  testNumberToWords(1111, 'one thousand one hundred eleven');
  testNumberToWords(1001, 'one thousand one');
}

function testThreeDigit() {
  testNumberToWords(100, 'one hundred');
  testNumberToWords(111, 'one hundred eleven');
  testNumberToWords(112, 'one hundred twelve');
  testNumberToWords(239, 'two hundred thirty nine');
  testNumberToWords(999, 'nine hundred ninety nine');
}

function testTwoDigit() {
  testNumberToWords(11, 'eleven');
  testNumberToWords(20, 'twenty');
  testNumberToWords(10, 'ten');
  testNumberToWords(15, 'fifteen');
  testNumberToWords(30, 'thirty');
  testNumberToWords(40, 'forty');
  testNumberToWords(50, 'fifty');
  testNumberToWords(21, 'twenty one');
  testNumberToWords(66, 'sixty six');
  testNumberToWords(29, 'twenty nine');
}

function testOneDigit() {
  testNumberToWords(0, 'zero');
  testNumberToWords(1, 'one');
  testNumberToWords(6, 'six');
}

function testAll() {
  testOneDigit();
  testTwoDigit();
  testThreeDigit();
  testFourDigit();
  testFiveDigit();
  testSixDigits();
  testSevenDigits();
  testEightDigits();
  testNineDigits();
  testTenDigits();
  testElevenDigits();
  testTwelveDigits();
}

testAll();