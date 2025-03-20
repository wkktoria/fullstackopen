import { useState } from "react";

const FeedbackButton = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <FeedbackButton text="good" onClick={() => handleGoodClick()} />
      <FeedbackButton text="neutral" onClick={() => handleNeutralClick()} />
      <FeedbackButton text="bad" onClick={() => handleBadClick()} />

      <h2>statistics</h2>
      <span>
        good {good} <br />
        neutral {neutral} <br />
        bad {bad} <br />
      </span>
    </div>
  );
};

export default App;
