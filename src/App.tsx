import React from 'react';
import { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { get } from 'http';


const getRandomColor =() => {
  const digits= ['0', '1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

  const color= new Array(6)
  .fill("")
  .map(() => digits[Math.floor(Math.random() * digits.length)])
  .join("");

  return `#${color}`;

  console.log(color);
  return color;
}

enum Result {
  Correct,
  Wrong,
}

function App() {
  const [color,setColor] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const[result,setResult] = useState< Result | undefined> (undefined);

  const generateColors = () => {
  {/* to generate a random color */}
      const actualColor =getRandomColor();
      setColor(actualColor);
      setAnswers([actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
        )
      );
      };

  useEffect(() => {
    generateColors();
  },[]);




  function handleAnswerClicked(answer: string){
    if (answer === color) {
      setResult(Result.Correct);
      generateColors();
    }else{
      setResult(Result.Wrong);
    }

  }


 return <div className="App">
  <div>
  {/* to create a box */}
  <div className="guess-me" style={{background: color}}></div>

    {answers.map ((answer) => (
      <button onClick={() => handleAnswerClicked(answer)} key={answer}>
        {answer}
      </button>
    ))}
    {result === Result.Correct && <div className="correct">You Got It!</div>}
    {result === Result.Wrong && <div className="wrong">Wrong Answer!</div>}

  </div>
 </div>;
}

export default App;
