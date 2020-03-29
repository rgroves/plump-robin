"use strict";

function CompetitorList({ competitors, onRemove }) {
  let i = 1;

  function removeClickHandler(event) {
    const name = event.currentTarget.dataset.key;
    onRemove(name);
  }

  const listItems = competitors.map(competitor => {
    return (
      <div key={competitor} className="badge badge-light m-1 p-2">
        <button
          className="ml-2 badge badge-danger float-right"
          onClick={removeClickHandler}
          data-key={competitor}
        >
          X
        </button>
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
