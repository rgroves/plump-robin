"use strict";

function App() {
  let [competitors, setCompetitors] = React.useState([]);

  function addCompetitor(name) {
    const names = name.split(",").filter(curName => curName.length > 0);
    const newNames = [];
    const duplicateNames = [];

    names.forEach(curName => {
      if (curName.trim().length > 0) {
        if (!competitors.includes(curName)) {
          if (!newNames.includes(curName)) {
            newNames.push(curName);
          } else {
            if (!duplicateNames.includes(curName)) {
              duplicateNames.push(curName);
            }
          }
        } else {
          if (!duplicateNames.includes(curName)) {
            duplicateNames.push(curName);
          }
        }
      }
    });

    let feedback = "";

    if (duplicateNames.length > 0) {
      if (newNames.length > 0) {
        feedback = "New names added. ";
      }

      feedback +=
        duplicateNames.length === 1 && names.length === 1
          ? "Duplicate names are not allowed."
          : "Duplicate names are not allowed: " + duplicateNames.join(", ");
    }

    if (newNames.length > 0) {
      setCompetitors([...competitors, ...newNames]);
    }

    return feedback;
  }

  return (
    <div>
      <CompetitorCollector onAdd={addCompetitor} />
      <CompetitorList competitors={competitors} />
      <ScheduleGenerator competitors={competitors} />
    </div>
  );
}
