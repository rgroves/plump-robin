"use strict";

function App() {
  let [competitors, setCompetitors] = React.useState(new Set());
  let [scheduleDetails, setScheduleDetails] = React.useState([]);

  function refreshCompetitors(newCompetitors) {
    setCompetitors(newCompetitors);
    generateSchedule(newCompetitors);
  }

  function removeCompetitor(name) {
    competitors.delete(name);
    refreshCompetitors(new Set(competitors));
  }

  function resetCompetitors() {
    refreshCompetitors(new Set());
  }

  function addCompetitor(name) {
    const names = name
      .split(",")
      .map(curName => curName.trim())
      .filter(curName => curName.length > 0);

    if (names.length === 0) {
      return "Please enter the name of a competitor.";
    }

    const namesToAdd = new Set(names);
    const newNames = new Set([...competitors, ...namesToAdd]);
    const newNamesAdded = newNames.size > competitors.size;
    const hadDuplicates = newNames.size < competitors.size + names.length;

    if (newNamesAdded) {
      refreshCompetitors(newNames);
    }

    if (newNamesAdded && hadDuplicates) {
      return "New names added. Duplicate names were ignored.";
    } else if (hadDuplicates) {
      return "Duplicate names are not allowed.";
    } else {
      return "";
    }
  }

  function generateSchedule(tourneyCompetitors) {
    if (tourneyCompetitors.size >= 3) {
      const scheduler = roundRobinScheduler(tourneyCompetitors);
      const roundData = scheduler.generateRounds();
      setScheduleDetails(roundData);
    } else {
      setScheduleDetails([]);
    }
  }

  return (
    <div className="d-flex flex-wrap flex-column align-items-center">
      <CompetitorCollector onAdd={addCompetitor} onReset={resetCompetitors} />
      <CompetitorList competitors={competitors} onRemove={removeCompetitor} />
      <ScheduleDetails details={scheduleDetails} />
    </div>
  );
}
