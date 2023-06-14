// import "./styles.css";
import randomRgba from "random-rgba";
import { randomInt } from "@dmhtoo/random-int";
import { useCallback, useEffect, useState } from "react";

export default function Decider() {


  const team = ["CC", "CR", "DC", "DH", "DK", "SB"]; // TODO: move this hard-codedness to a remote spot...
  const [reviewerIndex, setReviewerIndex] = useState(0);

  const setNewRandomIndex = useCallback(() => {
    setReviewerIndex(randomInt(0, team.length - 1));
  }, [team.length]);

  useEffect(() => {
    setNewRandomIndex();
  }, [setNewRandomIndex]);

  function getRandomReviewer() {
    return team[reviewerIndex];
  }

  const rgba = randomRgba(0.5);

  const reviewer = "DH";

  return (
    <div className="App">
      <h1>Random PR Reviewer:</h1>
      <h2 style={{ backgroundColor: `${rgba}`, padding: "2rem" }}>
        {getRandomReviewer()}
      </h2>
      <button onClick={setNewRandomIndex}>(refresh)</button>
    </div>
  );
}
