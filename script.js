class Calculator {
    constructor() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.resetInput = false;
        this.calculationDisplay = document.querySelector('.calculation');
        this.resultDisplay = document.querySelector('.result');
        this.initialize();
    }

    initialize() {
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button.textContent));
        });
    }

    handleButtonClick(value) {
        if (value >= '0' && value <= '9') {
            this.handleNumberInput(value);
        } else if (value === '.') {
            this.handleDecimalInput();
        } else if (value === 'C') {
            this.clearAll();
        } else if (value === '+/-') {
            this.toggleSign();
        } else if (value === '%') {
            this.calculatePercentage();
        } else if (['+', '-', '×', '÷'].includes(value)) {
            this.handleOperation(value);
        } else if (value === '=') {
            this.calculateResult();
        }
        this.updateDisplay();
    }

    handleNumberInput(number) {
        if (this.currentInput === '0' || this.resetInput) {
            this.currentInput = number;
            this.resetInput = false;
        } else {
            this.currentInput += number;
        }
    }

    handleDecimalInput() {
        if (this.resetInput) {
            this.currentInput = '0.';
            this.resetInput = false;
            return;
        }
        if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
    }

    clearAll() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.calculationDisplay.textContent = '';
    }

    toggleSign() {
        this.currentInput = (parseFloat(this.currentInput) * -1).toString();
    }

    calculatePercentage() {
        this.currentInput = (parseFloat(this.currentInput) / 100).toString();
    }

    handleOperation(op) {
        if (this.operation !== null) this.calculateResult();
        this.previousInput = this.currentInput;
        this.operation = op;
        this.resetInput = true;
    }

    calculateResult() {
        if (this.operation === null) return;

        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);

        if (isNaN(prev) return;

        let computation;
        switch (this.operation) {
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case '×': computation = prev * current; break;
            case '÷': computation = prev / current; break;
            default: return;
        }

        this.currentInput = computation.toString();
        this.calculationDisplay.textContent = `${this.formatNumber(this.previousInput)} ${this.operation} ${this.formatNumber(this.currentInput)}`;
        this.operation = null;
        this.resetInput = true;
    }

    updateDisplay() {
        this.resultDisplay.textContent = this.formatNumber(this.currentInput);
        if (this.operation !== null && !this.resetInput) {
            this.calculationDisplay.textContent = `${this.formatNumber(this.previousInput)} ${this.operation}`;
        }
    }

    formatNumber(num) {
        const number = parseFloat(num);
        if (isNaN(number)) return '0';
        return number.toLocaleString(undefined, {
            maximumFractionDigits: 8
        });
    }
}

// Initialize the calculator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
