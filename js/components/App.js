"use strict";

function App() {
  let [competitors, setCompetitors] = React.useState([]);

  function addCompetitor(name) {
    const names = name
      .split(",")
      .map(curName => curName.trim())
      .filter(curName => curName.length > 0);

    if (names.length === 0) {
      return "Please enter the name of a competitor.";
    }

    const newNames = [];
    const duplicateNames = [];

    function nameInArray(arr, name) {
      return arr.some(value => value.toLowerCase() === name.toLowerCase());
    }

    names.forEach(curName => {
      if (curName.trim().length > 0) {
        if (!nameInArray(competitors, curName)) {
          if (!nameInArray(newNames, curName)) {
            newNames.push(curName);
          } else {
            if (!nameInArray(duplicateNames, curName)) {
              duplicateNames.push(curName);
            }
          }
        } else {
          if (!nameInArray(duplicateNames, curName)) {
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
