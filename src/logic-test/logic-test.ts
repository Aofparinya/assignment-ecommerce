function validateInputNumber(inputNumber: number): boolean {
    // convert input to string for validation
    const inputNumberStr = inputNumber.toString();
  
    // input จะต้องมีความยาวมากกว่าหรือเท่ากับ 6 ตัวอักษร
    if (inputNumberStr.length < 6) {
      return false;
    }
  
    //  input จะต้องกันไม่ให้มีเลขซ้ำติดกันเกิน 2 ตัว
    if (/(\d)\1{2}/.test(inputNumberStr)) {
      return false;
    }
  
    // input จะต้องกันไม่ให้มีเลขเรียงกันเกิน 2 ตัว
    if (/(012|123|234|345|456|567|678|789)/.test(inputNumberStr)) {
      return false;
    }
  
    // input จะต้องกันไม่ให้มีเลขชุดซ้ำ เกิน 2 ชุด
    const digits = inputNumberStr.split('');
    const uniqueDigits = new Set(digits);
    for (const digit of uniqueDigits) {
      if (digits.filter(d => d === digit).length > 2) {
        return false;
      }
    }
  
    // all checks passed, return true
    return true;
  }
  