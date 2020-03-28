"use strict";

function ScheduleDetails({ details }) {
  return (
    <div className="pl-2 mt-2 d-flex flex-column justify-content-center">
      <h3 className="align-self-center">Schedule Details</h3>
      <div className="d-flex flex-wrap justify-content-center">
        {details.map((rounds, i) => {
          return (
            <div key={i} className="ml-3 mb-3 p-2 bg-light rounded">
              <h4>Round {i + 1}</h4>
              <hr />
              {rounds.map((round, i) => {
                return (
                  <p className="mx-1 p-1 h6" key={i}>
                    Match {i + 1}: <em>{round}</em>
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
