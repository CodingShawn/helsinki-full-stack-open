import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  function generateRandomQuote() {
    let randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum);
  }

  function voteAnecdote() {
    let copy = [...points];
    copy[selected]++;
    setPoints(copy);
  }

  function findIndexWithMostVotes() {
    let maxIndex = points.reduce((acc, point, index) => {
      return points[acc] > points[index] ? acc : index;
    }, 0)
    return maxIndex;
  }

  return (
    <>
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <div>
        <button onClick={voteAnecdote}>vote</button>
        <button onClick={generateRandomQuote}>next anecdote</button>
      </div>
      <div>Anecdote with most votes</div>
      <div>{anecdotes[findIndexWithMostVotes()]}</div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
