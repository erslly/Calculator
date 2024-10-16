// script.js
const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;

function updateDisplay(value) {
  display.textContent = value;
}

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay('0');
}

function handleNumberClick(number) {
  if (currentInput.length < 15) {
    currentInput += number;
    updateDisplay(currentInput);
  }
}

function handleOperatorClick(op) {
  if (currentInput === '') return;

  if (previousInput !== '') {
    calculate();
  }
  
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  
  if (operator === '+') {
    result = prev + current;
  } else if (operator === '-') {
    result = prev - current;
  } else if (operator === '*') {
    result = prev * current;
  } else if (operator === '/') {
    result = prev / current;
  } else if (operator === '%') {
    result = prev % current;
  }
  
  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateDisplay(currentInput);
}

function handleSpecialFunctions(type) {
  const current = parseFloat(currentInput);

  if (type === '√') {
    currentInput = Math.sqrt(current).toString();
  } else if (type === 'x²') {
    currentInput = Math.pow(current, 2).toString();
  }
  
  updateDisplay(currentInput);
}

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent === 'C') {
      clearDisplay();
    } else if (['+', '-', '*', '/', '%'].includes(button.textContent)) {
      handleOperatorClick(button.textContent);
    } else if (button.textContent === '=') {
      calculate();
    } else if (['√', 'x²'].includes(button.textContent)) {
      handleSpecialFunctions(button.textContent);
    } else {
      handleNumberClick(button.textContent);
    }
  });
});

updateDisplay('0');
