import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Stats = ({ text, count, isPercentage = false }) => (
  <div>
    {text} {count} {isPercentage ? "%" : ""}
  </div>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    const updatedAll = all + 1;

    setGood(updatedGood);
    setAll(updatedAll);
    setAverage((updatedGood - bad) / updatedAll);
    setPositive((updatedGood / updatedAll) * 100);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    const updatedAll = all + 1;

    setNeutral(neutral + 1);
    setAll(updatedAll);
    setAverage((good - bad) / updatedAll);
    setPositive((good / updatedAll) * 100);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    const updatedAll = all + 1;

    setBad(updatedBad);
    setAll(updatedAll);
    setAverage((good - updatedBad) / updatedAll);
    setPositive((good / updatedAll) * 100);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h2>statistics</h2>
      <Stats text="good" count={good} />
      <Stats text="neutral" count={neutral} />
      <Stats text="bad" count={bad} />
      <Stats text="all" count={all} />
      <Stats text="average" count={average} />
      <Stats text="positive" count={positive} isPercentage={true} />
    </div>
  );
};

export default App;
