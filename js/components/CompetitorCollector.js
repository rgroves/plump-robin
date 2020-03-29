"use strict";

function CompetitorCollector({ onAdd, onReset }) {
  const [name, setName] = React.useState("");
  const [feedback, setFeedback] = React.useState("");
  const [feedbackDisplay, setFeedbackDisplay] = React.useState("d-none");

  function addCompetitor() {
    if (name && name.length > 0) {
      const feedback = onAdd(name);

      if (feedback.length == 0) {
        setName("");
        setFeedback("");
        setFeedbackDisplay("d-none");
      } else {
        setFeedbackDisplay("d-block");
        setFeedback(feedback);
      }
    } else {
      setFeedbackDisplay("d-block");
      setFeedback(`Please enter the name of a competitor.`);
    }

    document.getElementById("add-competitor-input").focus();
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

  function clickResetHandler(event) {
    onReset();
    setName("");
    setFeedback("");
    setFeedbackDisplay("d-none");
    document.getElementById("add-competitor-input").focus();
    event.preventDefault();
  }

  return (
    <div className="mb-4 d-flex flex-column justify-content-center">
      <h3 className="align-self-center">Add Competitors</h3>
      <div className="d-flex">
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
            <div className="pl-1 input-group-append">
              <button
                className="btn btn-danger"
                onClick={clickResetHandler}
                type="button"
                id="reset-button"
              >
                Reset
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
    </div>
  );
}
