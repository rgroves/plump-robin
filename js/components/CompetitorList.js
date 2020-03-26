"use strict";

function CompetitorList({ competitors }) {
  const listItems = competitors.map(competitor => {
    return (
      <li
        key={competitor}
        className="list-group-item disabled ml-4"
        aria-disabled="true"
      >
        {competitor}
      </li>
    );
  });

  return <ul className="list-group mb-4">{listItems}</ul>;
}
