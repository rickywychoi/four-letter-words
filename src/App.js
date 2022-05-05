import "./App.css";
import { Button } from "react-bootstrap";
import words from "./words";
import { useCallback, useMemo, useState } from "react";

const spaceBetween = "3rem";

const horizontalMenu = {
  display: "flex",
  justifyContent: "space-around",
};
const scoreHeaderStyle = {
  marginBottom: spaceBetween,
  ...horizontalMenu,
};

const scoreTextStyle = {
  fontSize: "1.5rem",
};

const wordStyle = {
  fontSize: "5rem",
  fontStyle: "bold",
};

const buttonWrapperStyle = {
  marginTop: spaceBetween,
  ...horizontalMenu,
};

function App() {
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(0);
  const [pointer, setPointer] = useState(-1);
  const [team, setTeam] = useState("A");

  const wordsList = useMemo(() => {
    if (team === "A") return words[0];
    else if (team === "B") return words[1];
    else if (team === "C") return words[2];
    else if (team === "D") return words[3];
    else if (team === "E") return words[4];
    else if (team === "F") return words[5];
    else if (team === "G") return words[6];
    else if (team === "H") return words[7];
  }, [team]);

  const isStart = useMemo(() => {
    return pointer === -1;
  }, [pointer]);

  const isEnd = useMemo(() => {
    return pointer === wordsList.length;
  }, [pointer, wordsList]);

  const proceed = (e) => {
    if (isEnd) {
      return;
    }
    if (e.target.innerText === "Success") {
      setScore(score + 1);
    }
    if (e.target.innerText === "Pass") {
      setPassed(passed + 1);
    }
    setPointer(pointer + 1);
  };

  const handlePassOrSuccess = (e) => {
    e.preventDefault();
    proceed(e);
  };

  const handleStart = (e) => {
    e.preventDefault();
    setPointer(pointer + 1);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setScore(0);
    setPassed(0);
    setPointer(-1);
  };

  const handleSwitchTeam = useCallback(
    (e) => {
      e.preventDefault();
      if (team === "A") setTeam("B");
      else if (team === "B") setTeam("C");
      else if (team === "C") setTeam("D");
      else if (team === "D") setTeam("E");
      else if (team === "E") setTeam("F");
      else if (team === "F") setTeam("G");
      else if (team === "G") setTeam("H");
      else if (team === "H") setTeam("A");
      handleReset(e);
    },
    [team]
  );

  return (
    <div className="App" style={{ paddingTop: spaceBetween }}>
      <span style={scoreHeaderStyle}>
        <Button variant="outline-primary" onClick={handleSwitchTeam}>
          Switch Team
        </Button>
        <span style={scoreTextStyle}>Team: {team}</span>
        <span style={scoreTextStyle}>
          <span>
            Score: {score}/{wordsList.length}
          </span>
          <br />
          <span style={{ color: "red" }}>
            Passed: {passed}/{wordsList.length}
          </span>
        </span>
      </span>
      <p style={wordStyle}>
        {isStart
          ? "시작?"
          : isEnd
          ? "끝"
          : wordsList.length > 0 && wordsList[pointer]}
      </p>
      <>
        {isStart ? (
          <span style={buttonWrapperStyle}>
            <Button variant="success" onClick={handleStart}>
              Start
            </Button>
          </span>
        ) : (
          !isEnd && (
            <span style={buttonWrapperStyle}>
              <Button variant="danger" onClick={handlePassOrSuccess}>
                Pass
              </Button>
              <Button variant="warning" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="primary" onClick={handlePassOrSuccess}>
                Success
              </Button>
            </span>
          )
        )}
      </>
    </div>
  );
}

export default App;
