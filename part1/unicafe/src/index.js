import React, { useState } from "react";
import ReactDOM from "react-dom";

function Header() {
  return <h1>give feedback</h1>;
}

function Button({ handleClick, feedbackDescription }) {
  return <button onClick={handleClick}>{feedbackDescription}</button>;
}

function Statistics({ good, neutral, bad }) {
  let numFeedback = good + neutral + bad;

  if (numFeedback === 0) return <h3>No feedback given</h3>;

  let totalScore = good - bad;
  let average = totalScore / numFeedback;
  let positive = (good / numFeedback) * 100;

  return (
    <>
      <table>
        <tbody>
          <Statistic value={good} text="good" />
          <Statistic value={neutral} text="neutral" />
          <Statistic value={bad} text="bad" />
          <Statistic value={numFeedback} text="all" />
          <Statistic value={average} text="average" />
          <Statistic value={positive} text="positive" />
        </tbody>
      </table>
    </>
  );
}

function Statistic({ value, text }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header />
      <div>
        <Button
          handleClick={() => setGood(good + 1)}
          feedbackDescription="good"
        />
        <Button
          handleClick={() => setNeutral(neutral + 1)}
          feedbackDescription="neutral"
        />
        <Button handleClick={() => setBad(bad + 1)} feedbackDescription="bad" />
      </div>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
