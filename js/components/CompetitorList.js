"use strict";

function CompetitorList({ competitors }) {
  let i = 1;
  const listItems = competitors.map(competitor => {
    return (
      <div key={competitor} className="badge badge-light m-1 p-2">
        <span style={{ fontSize: "medium" }}>{competitor}</span>
      </div>
    );
  });

  return (
    <div className="flex-fill flex-wrap">
      <h3 className="d-flex justify-content-center">Competitors</h3>
      <div className="mb-4 d-flex flex-wrap align-items-center justify-content-center">
        {listItems}
      </div>
    </div>
  );
}
