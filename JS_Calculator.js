"use strict"; // "use strict"; Defines that JavaScript code should be executed in "strict mode".

var input=document.getElementById('input');   // Input/Output Button
var number=document.querySelectorAll('.numbers div');  // Number Button
var operator=document.querySelectorAll('.operators div'); // Operator Button
var result=document.getElementById('result');  // Equal Button
var backspace_button=document.getElementById('backspace_button');  // Backspace Button
var clear=document.getElementById('clear');  // Clear Button
var resultDisplay=false; // flag to track what output is begin displayed

// Adding click handlers to Number Button
for(var i=0;i<number.length;i++)
{
    number[i].addEventListener("click", function (e){
        // Storing Current input string and its character in varibales used
        var currentString=input.innerHTML;
        var lastChar=currentString[currentString.length-1];

        // If result is not displayed, just keep adding
        if(resultDisplay===false) input.innerHTML+=e.target.innerHTML;
        else if(resultDisplay===true && lastChar==="+" || lastChar==="-" || lastChar==="×" || lastChar==="÷" || lastChar==="%" || lastChar==="²" || lastChar==="√" || lastChar==="!")
        {
            // If result is currently displayed and user pressde an operator
            // We need to keep on adding to the string for next operation
            resultDisplay=false;
            input.innerHTML+=e.target.innerHTML;
        }
        else 
        {
            // If result is currently displayed and user pressed a number
            // We need clear the input string and add thr new input to start the new operation
            resultDisplay=false;
            input.innerHTML="";
            input.innerHTML+=e.target.innerHTML;
        }
    });
}

// Adding click handlers to number buttons
for(var i=0;i<operator.length;i++)
{
    // Storing current input string and its last character in varibales -used later
    operator[i].addEventListener("click", function(e){
        var currentString=input.innerHTML;
        var lastChar=currentString[currentString.length-1];
        // If last character entered is an operator, replace it with the currently pressed
        if(lastChar==="+" || lastChar==="-" || lastChar==="×" || lastChar==="÷" || lastChar==="%" || lastChar==="²" || lastChar==="√" || lastChar==="!")
        {
            var newString=currentString.substring(0, currentString.length-1)+e.target.innerHTML;
            input.innerHTML=newString;
        }
        else if(currentString.length==0) console.log("Enter a numner first: "); // If the first key pressed is an operator, don't do anything
        else input.innerHTML+=e.target.innerHTML // else just add the operator pressed to the input;
    });
}

// On click of "Equal" button
result.addEventListener("click", function(e){
    
    // This is the string that we will be processing eg. -10+60*65/59
    var inputString=input.innerHTML;

    // Forming an array of numbers. eg for above string it will be: numbers=["100", "6", "33", "6", "3", "2"]
    var numbers=inputString.split(/\+|\-|\×|\÷|\%|\²|\√|\!/g);

    // Forming a array of operators. rg for above string it will be: operators=["+", "+", "-", "*", "/" , "%" , "²" , "√" , "bks"]
    // First we replace all the numbers and dot with empty string and then split
    var operators=inputString.replace(/[0-9]|\./g,"").split("");
    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");

    // Now we are looping through the array and doing one operation at a time.
    // First divide, then multiply, then subtraction and then addition
    // As we move, we are altering the original numbers and operators array
    // The final element remaining in the array will be the output

    function factorial_num(num)   // For calculating Factorial 
    {
        let fact=1;
        if(num<0) return "NaN";
        if(num==0 || num==1) return 1;
        while(num)
        {
            fact*=num;
            num--;
        }
        return fact;
    }

    var factorial=operators.indexOf("!");
    while(factorial!=-1)
    {
        numbers.splice(factorial, 1, factorial_num(numbers[factorial]));    // splice() used to add new element to an array 

        /*The first parameter defines the position where new elements should be added (spliced in).
        The second parameter defines how many elements should be removed.
        The rest of the parameters define the new elements to be added.*/
        
        operators.splice(factorial,1);
        factorial=operators.indexOf("!");
    }

    var square=operators.indexOf("²");   // For calculting Square
    while(square!=-1)
    {
        numbers.splice(square, 1, Math.pow(numbers[square],2));
        operators.splice(square,1);
        square=operators.indexOf("²");
    }
    var root=operators.indexOf("√");  // For calculating Sq. root
    while(root!=-1)
    {
        numbers.splice(root, 1, Math.sqrt(numbers[root]));
        operators.splice(root,1);
        root=operators.indexOf("√");
    }
    var percentage=operators.indexOf("%"); // For calculating Percentage
    while(percentage!=-1)
    {
        numbers.splice(percentage, 2, numbers[percentage]*(numbers[percentage+1]/100));
        operators.splice(percentage,1);
        percentage=operators.indexOf("%");
    }            
    var divide=operators.indexOf("÷");  // For calculating Division
    while(divide!=-1)
    {
        numbers.splice(divide, 2, numbers[divide]/numbers[divide+1]);
        operators.splice(divide,1);
        divide=operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");  // For calculating Multiplication
    while (multiply != -1) 
    {
      numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
      operators.splice(multiply, 1);
      multiply = operators.indexOf("×");
    }
  
    var subtract = operators.indexOf("-");   // For calculating subtraction
    while (subtract != -1) 
    {
      numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
      operators.splice(subtract, 1);
      subtract = operators.indexOf("-");
    }

    var add=operators.indexOf("+");  // For calculating addition
    while(add!=-1)
    {
        // Using parseFloat is necessary, otherwise it will resulgt in string concatenation
        numbers.splice(add,2,parseFloat(numbers[add])+parseFloat(numbers[add+1]));
        operators.splice(add,1);
        add=operators.indexOf("+"); 
    }

    input.innerHTML=numbers[0]; // Displaying Output
    resultDisplay=true; // Turning flag if result is displayed
});

// Clearing the input on press of clear
clear.addEventListener("click", function(){
    input.innerHTML="";    
});

// Backspace the input on press of backspace_button
backspace_button.addEventListener("click", function(){
    var input_String=input.innerHTML;
    input.innerHTML=input_String.substring(0,input_String.length -1)
});