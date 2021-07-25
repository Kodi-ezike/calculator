// Add event handlers to handle accordingly the toggle-switch
const range = document.querySelector('#myRange[type="range"]');

function switchTheme(e) {
   
var val = range.value;

if(val <= 0){
    document.documentElement.setAttribute('data-theme', 'root');
}
else if (val <= 1) {
    document.documentElement.setAttribute('data-theme', 'light');
}
else{
    document.documentElement.setAttribute('data-theme', 'dark');
}    

console.log(val);
}

range.addEventListener('change', switchTheme);



// calculator js

let runningTotal = 0;
let buffer = '0';  //waiting for an input
let previousOperator = null; // store previous symbols
let newCalculation = false;
let result;

const screen = document.getElementById('value')

document.querySelector('.keyboard').addEventListener('click', function(event){
    buttonClick(event.target.innerText);
})

function buttonClick(value){
    if (value=='.' ){
        handleNumber(value);
        if(value == '.' && buffer.length ===1){
            buffer ='0' + value;
        }
    }
    else if(isNaN(parseFloat(value))){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value){ 

    if(newCalculation == true){
        buffer = value;
        newCalculation = false;
        console.log('here1');
        return;
    }
    if (value == '.' && buffer.includes('.')){
        console.log('here2');
        return ;
    }
    if(buffer == '0'){
        buffer=value; 
        console.log('here3');
        return;              //buffer = 0 on default
    }
    else{
        buffer += value;            //buffer becomes the value when clicked
        console.log('buffer');
    }
}

function handleSymbol(value){
    switch(value){
        case 'RESET':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if(previousOperator === null){
               return;
            }
            else{
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = '' + result;
            newCalculation = true;
            runningTotal = 0;
            }
            break;
        case 'DEL':
            if (buffer.length === 1){
                buffer = '0';
            }
            else{
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
        
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value){
    const intBuffer = parseFloat(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0';
}

function flushOperation(intBuffer){
    
    if(previousOperator === '+'){
      result = runningTotal + intBuffer;
        if(result.toString().length >= 9){
            result = result.toFixed(2);
        }
    }
    else if(previousOperator === '-'){
       result = runningTotal - intBuffer;
        if(result.toString().length >= 9){
            result = result.toFixed(2);
        }
    }
    
    else if(previousOperator === '×'){
       result= runningTotal * intBuffer;
       if(result.toString().length >= 9){
            result = result.toFixed(2);
        }  
    }
    else if(previousOperator === '/'){
        result = runningTotal / intBuffer;
        console.log(result.toString().length);      //to find the length of a number
        //console.log(result.length);               
        if(result.toString().length >= 9){
            result = result.toFixed(9);
        }  
    }
}

function rerender (){
    screen.innerText = buffer;
}
