let display = document.getElementById('display-equation');
let displayEq = document.getElementById('display-equals');
let enterDecimal = true;

// Calls a specific function if key pressed is same as mathematical symbol in calculator
window.onkeydown = function(e){
    switch(e['key']){
        case '+':
            updateDisplay('add');
            break;
        case '-':
            updateDisplay('subtract');
            break;
        case 'x':
        case '*':
            updateDisplay('multiply');
            break;
        case '/':
            updateDisplay('divide');
            break;
        case '1':
            updateDisplay(1);
            break;
        case '2':
            updateDisplay(2);
            break;
        case '3':
            updateDisplay(3);
            break;
        case '4':
            updateDisplay(4);
            break;
        case '5':
            updateDisplay(5);
            break;
        case '6':
            updateDisplay(6);
            break;
        case '7':
            updateDisplay(7);
            break;
        case '8':
            updateDisplay(8);
            break;
        case '9':
            updateDisplay(9);
            break;
        case '0':
            updateDisplay(0);
            break;
        case '+':
            updateDisplay('add');
            break;
        case '.':
            updateDisplay('decimal');
            break;
        case '=':
        case 'Enter':
            updateDisplay('equals');
            break;
        case 'c':
            clearDisplay();
            break;
        // 'Backspace' removes the last symbol of equation
        case 'Backspace':
            if(display.innerText != 0){
                let displayText = display.innerText;
                let arr = displayText.split("");
                arr.pop();
                displayText = arr.join('');
                display.innerText = displayText;
                if(display.innerText == false){
                    display.innerText = 0;
                }
            displayEq.innerText = '';
            }
            break;
    }
}




function updateDisplay(param){
    // If sum of equation is displayed and any button is triggered, sum disappears
    // If sum of equation is displayed and number button is triggered, latest equation also disappears and new equation will start with the number, that's button is pressed
    // If sum of equation is displayed and arithmetic operator is triggered, latest sum moves into equation place, and the operator is added to it
    if(displayEq.innerText != '' && param != 'equals'){
        display.innerText = displayEq.innerText;
        displayEq.innerText = '';
        if(param >= 0){
            display.innerText = '';
        }
    }
    if(typeof param == 'number'){
        if(display.innerText == '0'){
        display.innerText = '';
    }
    display.innerText += param;
    }
    ///////
    ///////
    ///////
    // If "add" operator is triggered and last symbol of equation isn't operator, "+" symbol will be added to equation
    if(param == 'add' && !isNaN(parseFloat(display.innerText[display.innerText.length - 1]))){
        display.innerText += '+';
        enterDecimal = true;
    }
    // If "subtract" operator is triggered and last 2 symbols of equation aren't operators, "-" symbol will be added to equation
    if(param == 'subtract'){
            if(display.innerText == 0){
            display.innerText = '-';
            }else{
            display.innerText += '-';
            }
            if(isNaN(parseFloat(display.innerText[display.innerText.length - 1])) && isNaN(parseFloat(display.innerText[display.innerText.length - 2])) && isNaN(parseFloat(display.innerText[display.innerText.length - 3]))){
                let arr = display.innerText.split('');
                arr.pop();
                display.innerText = arr.join('');
                if(display.innerText == ''){
                    display.innerText = '-';
                }
            }
            enterDecimal = true;
    }
    // If "multiply" operator is triggered and last symbol of equation isn't operator, "x" symbol will be added to equation
    if(param == 'multiply'  && !isNaN(parseFloat(display.innerText[display.innerText.length - 1]))){
        display.innerText += 'x';
        enterDecimal = true;
    }
    // If "divide" operator is triggered and last symbol of equation isn't operator, "/" symbol will be added to equation
    if(param == 'divide'  && !isNaN(parseFloat(display.innerText[display.innerText.length - 1]))){
        display.innerText += '/';
        enterDecimal = true;
    }
    if(param == 'decimal' && !isNaN(parseFloat(display.innerText[display.innerText.length - 1]))){
        if(enterDecimal){
           display.innerText += '.';
        }
        enterDecimal = false;
    }
    if(param == 'equals' && !isNaN(parseFloat(display.innerText[display.innerText.length - 1]))){
        let string = display.innerText;
        let numArray = string.split(/[\+\-\x\/]/).filter (item => item != '');
        let eqArray = string.split(/[\d.]/).filter(item => item != '');
        eqArray.forEach((item, index) => {
            if(item[0] == '-' && item[1] == '-'){
                eqArray[index] = '+';
            }
            if(item[0] == 'x' && item[1] == '-'){
                eqArray[index] = 'x';
                numArray[index + 1] = '-' + numArray[index + 1];
            }
            if(item[0] == '/' && item[1] == '-'){
                eqArray[index] = '/';
                numArray[index + 1] = '-' + numArray[index + 1];
            }
            if(item[0] == '+' && item[1] == '-'){
                eqArray[index] = '+';
                numArray[index + 1] = '-' + numArray[index + 1];
            }
        });
        if(display.innerText[0] == '-'){
            eqArray.shift();
            numArray[0] = '-' + numArray[0];
        }
//         console.log(eqArray);
//         console.log(numArray);
        let result = parseFloat(numArray[0]);
        for(let i = 0; i < eqArray.length; i++){
            if(eqArray[i] == "+"){
                result += parseFloat(numArray[i+1]);
            }else if(eqArray[i] == "-"){
                result -= parseFloat(numArray[i+1]);
            }else if(eqArray[i] == "x"){
                result *= parseFloat(numArray[i+1]);
            }else if(eqArray[i] == "/"){
                result /= parseFloat(numArray[i+1]);
            }
        }
        if(eqArray.indexOf('/') == -1){
            let highest = 0;
            numArray.filter(num => num % 2 != 0 && num % 2 != 1).forEach(num => {
                if(num.slice(num.indexOf('.') + 1).length > highest){
                    highest = num.slice(num.indexOf('.') + 1).length
                };
            })
            displayEq.innerText = result.toFixed(highest);
        }else{
            displayEq.innerText = result;
        }
        enterDecimal = true;
    }
}

// Removes output numbers from both display elements.
function clearDisplay(){
    display.innerText = 0;
    displayEq.innerText = '';
    enterDecimal = true;
}

