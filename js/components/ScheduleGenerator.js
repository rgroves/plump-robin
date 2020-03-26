"use strict";

function ScheduleGenerator({ competitors }) {
  const [scheduleDetails, setScheduleDetails] = React.useState([]);
  const [feedback, setFeedback] = React.useState("");
  const [feedbackDisplay, setFeedbackDisplay] = React.useState("d-none");

  function clickHandler() {
    if (competitors.length === 0) {
      setFeedback(
        "Please add a few competitors so a schedule can be generated."
      );

      setFeedbackDisplay("d-block");
      return;
    } else if (competitors.length < 3) {
      setFeedback(
        "Please add at least three competitors so a schedule can be generated."
      );

      setFeedbackDisplay("d-block");
      return;
    }

    setFeedbackDisplay("d-none");

    const scheduler = roundRobinScheduler(competitors);
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
      <div className={feedbackDisplay}>
        <div className="pl-2 mb-2 alert alert-danger" role="alert">
          {feedback}
        </div>
      </div>
      <ScheduleDetails competitors={competitors} details={scheduleDetails} />
    </div>
  );
}

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

      // Keep the 1st competitor in a fixed position.
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
