"use strict";

function ScheduleGenerator({ competitors, scheduleDetails, onGenerate }) {
  const [feedback, setFeedback] = React.useState("");
  const [feedbackDisplay, setFeedbackDisplay] = React.useState("d-none");

  function clickHandler() {
    if (competitors.size === 0) {
      setFeedback(
        "Please add a few competitors so a schedule can be generated."
      );

      setFeedbackDisplay("d-block");
      return;
    } else if (competitors.size < 3) {
      setFeedback(
        "Please add at least three competitors so a schedule can be generated."
      );

      setFeedbackDisplay("d-block");
      return;
    }

    setFeedbackDisplay("d-none");

    onGenerate(competitors);
  }

  return (
    <div className="mb-2">
      <button
        className="mb-4 btn btn-primary btn-lg btn-block"
        onClick={clickHandler}
      >
        Generate Schedule
      </button>
      <div className={feedbackDisplay}>
        <div className="pl-2 mb-2 alert alert-danger" role="alert">
          {feedback}
        </div>
      </div>
      <ScheduleDetails details={scheduleDetails} />
    </div>
  );
}
