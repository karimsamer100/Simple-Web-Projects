// Get the display element
const display = document.getElementById('display');

// Store calculator's current state
const calculator = {
    firstNumber: '',
    secondNumber: '',
    operator: '',
    resetDisplay: false,
    maxDigits: 9
};

// Format numbers for display (adds commas and handles large numbers)
function formatNumber(number) {
    const numStr = number.toString();
    if (numStr === 'Error') return numStr;
    
    if (Math.abs(number) > 1e9) {
        return number.toExponential(4);
    }
    
    const parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return parts.join('.');
}

// Update the display with formatted number
function updateDisplay(value) {
    display.textContent = formatNumber(value);
}

// Handle number button press
function pressNumber(num) {
    const currentDisplay = display.textContent;
    
    if (currentDisplay === '0' || calculator.resetDisplay) {
        display.textContent = num;
        calculator.resetDisplay = false;
    } else if (currentDisplay.replace(/[,]/g, '').length < calculator.maxDigits) {
        display.textContent += num;
    }

    if (!calculator.operator) {
        calculator.firstNumber = display.textContent.replace(/[,]/g, '');
    } else {
        calculator.secondNumber = display.textContent.replace(/[,]/g, '');
    }
}

// Handle operator button press
function pressOperator(op) {
    if (calculator.firstNumber && calculator.secondNumber) {
        calculate();
    }
    calculator.operator = op;
    calculator.resetDisplay = true;
}
function calculate() {
    if (!calculator.operator || !calculator.secondNumber) return;

    const num1 = parseFloat(calculator.firstNumber);
    const num2 = parseFloat(calculator.secondNumber);
    let result;

    switch (calculator.operator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '×': result = num1 * num2; break;
        case '÷':
            if (num2 === 0) {
                result = 'Error';
                break;
            }
            result = num1 / num2;
            break;
        default: return;
    }

    updateDisplay(result);
    calculator.firstNumber = result === 'Error' ? '' : result.toString();
    calculator.secondNumber = '';
    calculator.operator = '';
    calculator.resetDisplay = true;
}

function clearAll() {
    calculator.firstNumber = '';
    calculator.secondNumber = '';
    calculator.operator = '';
    updateDisplay('0');
}

function handlePlusMinus() {
    const currentDisplay = display.textContent.replace(/[,]/g, '');
    const newValue = currentDisplay.startsWith('-') ? 
        currentDisplay.slice(1) : 
        '-' + currentDisplay;
    
    updateDisplay(newValue);
    if (!calculator.operator) {
        calculator.firstNumber = newValue;
    } else {
        calculator.secondNumber = newValue;
    }
}

function handlePercent() {
    const currentDisplay = display.textContent.replace(/[,]/g, '');
    const newValue = (parseFloat(currentDisplay) / 100).toString();
    
    updateDisplay(newValue);
    if (!calculator.operator) {
        calculator.firstNumber = newValue;
    } else {
        calculator.secondNumber = newValue;
    }
}

// Handle keyboard input
function handleKeyboardInput(e) {
    if (e.key >= '0' && e.key <= '9') {
        pressNumber(e.key);
    } else {
        switch (e.key) {
            case '.': pressNumber('.'); break;
            case '+': pressOperator('+'); break;
            case '-': pressOperator('-'); break;
            case '*': pressOperator('×'); break;
            case '/': 
                e.preventDefault();
                pressOperator('÷');
                break;
            case 'Enter':
            case '=':
                calculate();
                break;
            case 'Escape':
                clearAll();
                break;
            case 'Backspace':
                if (!calculator.resetDisplay) {
                    const current = display.textContent.replace(/[,]/g, '').slice(0, -1) || '0';
                    updateDisplay(current);
                    if (!calculator.operator) {
                        calculator.firstNumber = current;
                    } else {
                        calculator.secondNumber = current;
                    }
                }
                break;
        }
    }
}

// Set up button click handlers
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.textContent;

        if (!isNaN(value) || value === '.') {
            pressNumber(value);
        } else if (['+', '-', '×', '÷'].includes(value)) {
            pressOperator(value);
        } else if (value === '=') {
            calculate();
        } else if (value === 'AC') {
            clearAll();
        } else if (value === '±') {
            handlePlusMinus();
        } else if (value === '%') {
            handlePercent();
        }
    });
});

// Enable keyboard support
document.addEventListener('keydown', handleKeyboardInput);

// Set initial display
updateDisplay('0');