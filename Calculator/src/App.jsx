import { useState } from "react";
import "./index.css";

//Rus
//1 - Создайте состояние input, которое будет отображать результат вычислений в калькуляторе.
//2 - Создайте 2 функции для увеличения или уменьшения значения input на +1 или -1 и назначьте их на кнопки +1 / -1.
//3 - Создайте функцию, которая будет выполнять определенную операцию на калькуляторе в зависимости от нажатой кнопки. В результате работы этой функции должен получиться полностью рабочий калькулятор. Используйте эту функцию в обработчиках событий для всех кнопок.

//P.S. Если сложно продумать одну универсальную функцию, можете создать столько функций, сколько нужно. Не переживайте о чистоте кода.

//P.P.S. В JavaScript есть метод eval(), который преобразует любую строку в JavaScript-выражение.
//Пример: eval("console.log('Hello')") — выполнит этот код.
// Используйте этот метод для всех операций в калькуляторе.

//Eng

//Eng
//1 - Create a state variable input to display the result of calculations in the calculator.
//2 - Create two functions to increase or decrease the value of input by +1 or -1, and assign them to the +1 / -1 buttons.
//3 - Create a function that will perform a specific operation in the calculator based on the button pressed. This function should result in a fully functional calculator. Use this function in the event handlers for all buttons.

//P.S. If it’s difficult to design a universal function, feel free to create as many functions as you need. Don’t worry about code cleanliness.

//P.P.S. JavaScript has a method eval() that transforms any string into a JavaScript expression.
//Example: eval("console.log('Hello')") will execute this code.
// Use this method for all operations in the calculator.

function Calculator() {
  const [input, setInput] = useState(0);
  const [example, setExample] = useState('0');
  const [operator, setOperator] = useState(null)

  function choosingExample(value) {

    if (example === '0') {
      setExample('')
    }
    setExample((prev) => prev + value);
    setOperator(null);
  }

  function choosingOperator(value) {
    console.log(operator);

    if (operator == null) {
      if (example === '0' && value === '-') {
        setExample('')
      }
      choosingExample(value)
    } else {
      if (example === '-' && value != '-') {
        setExample('0')
        setOperator(null);
        return
      }

      setExample((prev) => prev.replace(new RegExp("\\" + operator + "$"), value,))
    }
    setOperator(value);
  }

  function evalResult() {
    try {
      setExample(String(eval(example)))
    } catch {
      setExample('Математическая ошибка');
    }
  }

  return (
    <div className="calculator-container">
      <h1 className="calculator-title">UseState Calculator</h1>
      <div className="calculator">
        <div className="display">{example}</div>
        <div className="increment-buttons">
          <button onClick={() => { choosingExample('+1'); evalResult }} className="increment">+1</button>
          <button onClick={() => (setInput(prev => prev - 1))} className="decrement">-1</button>
        </div>
        <div className="buttons">
          <button onClick={() => choosingExample(1)}>1</button>
          <button onClick={() => choosingExample(2)}>2</button>
          <button onClick={() => choosingExample(3)}>3</button>
          <button onClick={() => choosingOperator('+')} className="operator">+</button>
          <button onClick={() => choosingExample(4)}>4</button>
          <button onClick={() => choosingExample(5)}>5</button>
          <button onClick={() => choosingExample(6)}>6</button>
          <button onClick={() => choosingOperator('-')} className="operator">-</button>
          <button onClick={() => choosingExample(7)}>7</button>
          <button onClick={() => choosingExample(8)}>8</button>
          <button onClick={() => choosingExample(9)}>9</button>
          <button onClick={() => choosingOperator('*')} className="operator">×</button>
          <button onClick={() => choosingExample(0)}>0</button>
          <button>,</button>
          <button onClick={evalResult} className="equals">=</button>
          <button onClick={() => choosingOperator('/')} className="operator">÷</button>
          <button onClick={() => { setExample('0'); setOperator(null) }} className="clear">C</button>
        </div>
      </div>
      <div className="technologies-used">
        <p>
          <strong>Technologies used:</strong> React, JSX, CSS Modules, JavaScript (useState, events
          handling)
        </p>
      </div>
    </div>
  );
}

export default Calculator;
