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
    </div>
  );
}

const domContainer = document.querySelector(appContainerId);
const app = React.createElement(App);
ReactDOM.render(app, domContainer);
