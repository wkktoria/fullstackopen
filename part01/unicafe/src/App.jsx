import { useState } from "react";

const FeedbackButton = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Stat = ({ text, value }) => {
  return (
    <>
      <span>
        {text} {value}
      </span>
      <br />
    </>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <Stat text="good" value={good} />
      <Stat text="neutral" value={neutral} />
      <Stat text="bad" value={bad} />
      <Stat text="all" value={all} />
      <Stat text="average" value={average} />
      <Stat text="positive" value={`${positive} %`} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good - bad) / all;
  const positive = all === 0 ? 0 : (good / all) * 100;

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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
