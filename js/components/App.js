"use strict";

function App() {
  let [competitors, setCompetitors] = React.useState([]);

  function addCompetitor(name) {
    if (!competitors.includes(name)) {
      setCompetitors([...competitors, name]);
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <CompetitorCollector onAdd={addCompetitor} />
      <CompetitorList competitors={competitors} />
      <ScheduleGenerator competitors={competitors} />
    </div>
  );
}
