"use strict";

const appContainerId = "#plump-robin";

function Contestant({ name }) {
  return <input type="text" readOnly value={name} />;
}

function ContestantList({ contestants }) {
  const listItems = contestants.map(contestant => {
    return (
      <li key={contestant}>
        <Contestant name={contestant} />
      </li>
    );
  });

  return <ul>{listItems}</ul>;
}

function ContestantCollector({ onAdd }) {
  const [name, setName] = React.useState("");
  const [feedback, setFeedback] = React.useState("");

  function clickHandler() {
    if (name && name.length > 0) {
      if (onAdd(name)) {
        setFeedback("");
      } else {
        setFeedback(`Contestant ${name} already in list.`);
      }
    }
  }

  function changeHandler(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <input type="text" onChange={changeHandler} value={name} />
      <button onClick={clickHandler}>Add</button>
      <div>{feedback}</div>
    </div>
  );
}

function ScheduleDetails({ details }) {
  return (
    <div>
      <h3>Schedule Details</h3>
      {details.map((rounds, i) => {
        return (
          <div>
            <h4 key={i}>Round {i + 1}</h4>
            {rounds.map((round, i) => {
              return <div key={i}>{round}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}

function ScheduleGenerator({ contestants }) {
  let [scheduleDetails, setScheduleDetails] = React.useState([]);

  function clickHandler() {
    if (contestants.length === 0) {
      return;
    }

    setScheduleDetails([
      [["C1 vs C14"], ["C2 vs C13"]],
      [["C1 vs C13"], ["C14 vs C12"]]
    ]);
  }

  return (
    <div>
      <button onClick={clickHandler}>Generate Schedule</button>
      <ScheduleDetails contestants={contestants} details={scheduleDetails} />
    </div>
  );
}

function App() {
  let [contestants, setContestants] = React.useState([]);

  function addContestant(name) {
    if (!contestants.includes(name)) {
      setContestants([...contestants, name]);
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <ContestantCollector onAdd={addContestant} />
      <ContestantList contestants={contestants} />
      <ScheduleGenerator contestants={contestants} />
    </div>
  );
}

const domContainer = document.querySelector(appContainerId);
const app = React.createElement(App);
ReactDOM.render(app, domContainer);
