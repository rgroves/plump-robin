"use strict";

function CompetitorList({ competitors }) {
  let i = 1;
  const listItems = competitors.map(competitor => {
    return (
      <div key={competitor} className="badge badge-light" aria-disabled="true">
        <span style={{ fontSize: "medium" }}>{competitor}</span>
      </div>
    );
  });

  return (
    <div className="mb-4 d-flex flex-wrap justify-content-around">
      {listItems}
    </div>
  );
}
