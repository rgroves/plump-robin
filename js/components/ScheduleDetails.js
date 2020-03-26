"use strict";

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
