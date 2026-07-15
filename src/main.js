import './styles.css';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetInput = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function inputValue(value) {
    if (shouldResetInput) {
        currentInput = '0';
        shouldResetInput = false;
    }
    
    if (currentInput === '0' && value !== '0') {
        currentInput = value;
    } else if (currentInput === '0' && value === '0') {
        return;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetInput = false;
    updateDisplay();
}

function inputPoint() {
    if (shouldResetInput) {
        currentInput = '0';
        shouldResetInput = false;
    }
    
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function handleOperator(op) {
    if (operator !== null && !shouldResetInput) {
        const result = calculate();
        currentInput = String(result);
        updateDisplay();
    }
    
    previousInput = currentInput;
    operator = op;
    shouldResetInput = true;
}

function calculate() {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(curr)) return 0;
    
    switch (operator) {
        case '+': return prev + curr;
        case '−': return prev - curr;
        case '×': return prev * curr;
        case '÷': 
            if (curr === 0) {
                return 'Ошибка';
            }
            return prev / curr;
        default: return curr;
    }
}

function handleEquals() {
    if (operator === null) {
        return;
    }
    
    const result = calculate();
    currentInput = String(result);
    operator = null;
    previousInput = '';
    shouldResetInput = true;
    updateDisplay();
}

function handleBackspace() {
    if (shouldResetInput) {
        return;
    }
    
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function handleNegate() {
    if (currentInput === '0') return;
    
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateDisplay();
}

function handleInput(value) {
    if (value >= '0' && value <= '9') {
        inputValue(value);
    } else if (value === 'C') {
        clearAll();
    } else if (value === '.') {
        inputPoint();
    } else if (value === '+' || value === '−' || value === '×' || value === '÷') {
        handleOperator(value);
    } else if (value === '=') {
        handleEquals();
    } else if (value === '⌫') {
        handleBackspace();
    } else if (value === '±') {
        handleNegate();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.textContent;
        handleInput(value);
    });
});

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    const allowedDigits = '0123456789';
    const allowedOperators = '+-*/';
    const allowedControls = new Set(['Enter', '=', '.', 'Backspace', 'Escape', 'c', 'C']);
    
    if (!allowedDigits.includes(key) && 
        !allowedOperators.includes(key) && 
        !allowedControls.has(key)) {
        return;
    }
    
    let value = key;
    if (key === '*') value = '×';
    if (key === '/') value = '÷';
    if (key === '-') value = '−';
    if (key === 'Enter' || key === '=') value = '=';
    if (key === 'Escape') value = 'C';
    if (key === 'c' || key === 'C') value = 'C';
    if (key === 'Backspace') value = '⌫';
    
    event.preventDefault();
    handleInput(value);
});

updateDisplay();