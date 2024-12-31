function countNumberOfDigit(number) {
    let power = 0;
    let newValue = 0;
  
    while (number >= newValue) {
      newValue = 1 * exponent(power);
      power += 1;
    }
  
    return power - 1;                       // is it necessary to do - 1 here ? 
  }