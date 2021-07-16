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

// // Store the user preference for future visits
// function switchTheme(e) {
//     if (val <= 0) {
//         document.documentElement.setAttribute('data-theme', 'root');
//         localStorage.setItem('theme', 'root'); 
//     }
//     else if (val <= 1) {
//         document.documentElement.setAttribute('data-theme', 'light');
//         localStorage.setItem('theme', 'light'); 
//     }
//     else {
//         document.documentElement.setAttribute('data-theme', 'dark');
//         localStorage.setItem('theme', 'dark'); 
//     }
// }


//for the calculator

// const keys = document.querySelector('.keyboard');
// function show(){
//     const keys = document.getElementById('keyboard').innerText;
//       document.getElementById("value").innerHTML = keys; 
// }
// keys.addEventListener('click', show)

let runningTotal = 0;
let buffer = 0;  //waiting for an input
let previousOperator = null; // store previous symbols
const screen = document.getElementById('value')

document.querySelector('.keyboard').addEventListener('click', function(event){
    buttonClick(event.target.innerText);
    console.log(value);
})

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value){
    if(buffer === 0){
        buffer=value;               //buffer = 0 on default
    }
    else{
        buffer += value;            //buffer becomes the value when clicked
    }
   
}

function handleSymbol(value){
    switch(value){
        case 'RESET':
            buffer = 0;
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = '' + runningTotal;
            runningTotal = 0;
            break;
        case 'DEL':
            if (buffer.length === 1){
                buffer = 0;
            }
            else{
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
    rerender();
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = 0;
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }
    else if(previousOperator === '-'){
        runningTotal -= intBuffer;
    }
    else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }
    else if(previousOperator === '/'){
        runningTotal /= intBuffer;
    }
    
}

function rerender (){
    screen.innerText = buffer;
}


//refresh after a calculation
//get decimal to work
//put 3 decimal place of answer



