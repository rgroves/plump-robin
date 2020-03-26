"use strict";

function CompetitorCollector({ onAdd }) {
  const [name, setName] = React.useState("");
  const [feedback, setFeedback] = React.useState("");
  const [feedbackDisplay, setFeedbackDisplay] = React.useState("d-none");

  function addCompetitor() {
    if (name && name.length > 0) {
      if (onAdd(name)) {
        setName("");
        setFeedback("");
        setFeedbackDisplay("d-none");
        document.getElementById("add-competitor-input").focus();
      } else {
        setFeedbackDisplay("d-block");
        setFeedback(`Competitor ${name} already in list.`);
      }
    } else {
      setFeedbackDisplay("d-block");
      setFeedback(`Please enter the name of a competitor.`);
    }
  }

  function clickHandler(event) {
    addCompetitor();
    event.preventDefault();
  }

  function changeHandler(event) {
    setName(event.target.value);
  }

  function submitHandler(event) {
    addCompetitor();
    event.preventDefault();
  }

  return (
    <div className="mb-4">
      <h3>Add a Competitor</h3>
      <form
        onSubmit={submitHandler}
        id="competitor-input-form"
        className="mb-4"
      >
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Competitor's Name"
            aria-describedby="add-competitor-button"
            aria-label="Competitor's Name"
            onChange={changeHandler}
            value={name}
            id="add-competitor-input"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              onClick={clickHandler}
              type="button"
              id="add-competitor-button"
            >
              Add
            </button>
          </div>
        </div>
        <div className={feedbackDisplay}>
          <div className="pl-2 mb-2 alert alert-danger" role="alert">
            {feedback}
          </div>
        </div>
      </form>
    </div>
  );
}
