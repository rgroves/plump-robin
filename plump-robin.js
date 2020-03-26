"use strict";

const appContainerId = "#plump-robin";

function Contestant({ name }) {
  return name;
}

function ContestantList({ contestants }) {
  const listItems = contestants.map(contestant => {
    return (
      <li
        key={contestant}
        className="list-group-item disabled ml-4"
        aria-disabled="true"
      >
        <Contestant name={contestant} />
      </li>
    );
  });

  return <ul className="list-group mb-4">{listItems}</ul>;
}

function ContestantCollector({ onAdd }) {
  const [name, setName] = React.useState("");
  const [feedback, setFeedback] = React.useState("");

  function addCompetitor() {
    if (name && name.length > 0) {
      if (onAdd(name)) {
        setName("");
        setFeedback("");
        document.getElementById("add-competitor-input").focus();
      } else {
        setFeedback(`Contestant ${name} already in list.`);
      }
    }
  }

  function clickHandler(event) {
    addCompetitor();
    event.preventDefault();
  }

  function changeHandler(event) {
    setName(event.target.value);
  }

  function submitHandler(event) {
    addCompetitor();
    event.preventDefault();
  }

  return (
    <div className="mb-4">
      <h3>Add a Competitor</h3>
      <form
        onSubmit={submitHandler}
        id="competitor-input-form"
        className="mb-4"
      >
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Competitor's Name"
            aria-describedby="add-competitor-button"
            aria-label="Competitor's Name"
            onChange={changeHandler}
            value={name}
            id="add-competitor-input"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              onClick={clickHandler}
              type="button"
              id="add-competitor-button"
            >
              Add
            </button>
          </div>
        </div>
        <div>{feedback}</div>
      </form>
    </div>
  );
}

function ScheduleDetails({ details }) {
  return (
    <div className="pl-2 mt-2">
      <h3>Schedule Details</h3>
      {details.map((rounds, i) => {
        return (
          <div className="ml-3 mb-3">
            <h4 key={i}>Round {i + 1}</h4>
            {rounds.map((round, i) => {
              return (
                <div className="ml-3" key={i}>
                  {round}
                </div>
              );
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

    const scheduler = roundRobinScheduler(contestants);
    const roundData = scheduler.generateRounds();

    setScheduleDetails(roundData);
  }

  return (
    <div className="mb-2">
      <button
        className="btn btn-primary btn-lg btn-block"
        onClick={clickHandler}
      >
        Generate Schedule
      </button>
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

function roundRobinScheduler(competitorList) {
  const competitors = [...competitorList];
  if (competitors.length % 2 != 0) {
    competitors.push("BYE");
  }

  const firstRotationIdx = 1;
  const lastRotationIdx = competitors.length - 1;
  const rounds = competitors.length - 1;

  // Create helper function to loop through the competitor indicies.
  const rotatingIndex = ((first, last) => {
    let i = first - 1;

    // The skipBack option will back the index up by 1.
    return (skipBack = false) => {
      skipBack ? i-- : i++;

      if (i > last) {
        i = first;
      }

      return i;
    };
  })(firstRotationIdx, lastRotationIdx);

  function generateRounds() {
    const schedule = [];

    for (let curRound = 0; curRound < rounds; curRound++) {
      const round = [];
      const home = [];
      const away = [];

      // Keep the 1st contestant in a fixed position.
      home.push(0);

      // Fill in the home competitor indicies using a rotating index.
      for (let i = 0; i < competitors.length / 2; i++) {
        if (i > 0) {
          home[i] = rotatingIndex();
        }
      }

      // Fill in the away competitor indicies using a rotating index.
      for (let i = competitors.length / 2 - 1; i > -1; i--) {
        away[i] = rotatingIndex();
      }

      // Skip the index back one.
      rotatingIndex(true);

      // Generate the matches for the current round.
      for (let i = 0; i < home.length; i++) {
        const homeIdx = home[i];
        const awayIdx = away[i];
        const homeCompetitor = competitors[homeIdx];
        const awayCompetitor = competitors[awayIdx];
        const match = [`${homeCompetitor} vs ${awayCompetitor}`];

        round.push(match);
      }

      schedule.push(round);
    }

    return schedule;
  }

  return {
    generateRounds
  };
}
