import React, { useState, useEffect } from "react";
import axios from "axios";



function Dailytask() {
  const [todaySolved, setTodaySolved] = useState(0);
  const [totalSolved, setTotalSolved] = useState(0);
  const [goal, setGoal] = useState(
    Number(localStorage.getItem("leetcodeGoal_varun_v11")) || 0
  );
  const [goalInput, setGoalInput] = useState("");
  const [error, setError] = useState(null);
  const [showGoalPopup, setShowGoalPopup] = useState(false);

  const LOCAL_STORAGE_KEY = `leetcodeDailyStats_varun_v11`;
  const getTodayString = () => new Date().toISOString().slice(0, 10);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://leetcode-stats.tashif.codes/varun_v11`
        );
        const currentSolvedCount = res.data.totalSolved || 0;
        const todayStr = getTodayString();

        const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        let newTodaySolved = 0;
        let newPrevSolved = currentSolvedCount;

        if (!storedData) {
          newTodaySolved = 0;
          newPrevSolved = currentSolvedCount;
        } else if (storedData.lastUpdatedDate === todayStr) {
          newPrevSolved = storedData.prevSolved;
          newTodaySolved = currentSolvedCount - storedData.prevSolved;
          if (newTodaySolved < 0) newTodaySolved = 0;
        } else {
          newPrevSolved = currentSolvedCount;
          newTodaySolved = 0;
        }

        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({
            prevSolved: newPrevSolved,
            lastUpdatedDate: todayStr,
          })
        );

        setTodaySolved(newTodaySolved);
        setTotalSolved(currentSolvedCount);
        setError(null);
      } catch (err) {
        setError("Failed to fetch LeetCode stats");
      }
    }

    fetchData();
  }, []);

  // Handler for setting the goal
  const handleSetGoal = (e) => {
    e.preventDefault();
    const parsedGoal = Number(goalInput);
    setGoal(parsedGoal);
    localStorage.setItem("leetcodeGoal_varun_v11", parsedGoal);
    setGoalInput("");
  };

  if (error) {
    return <p>{error}</p>;
  }

  const goalAchieved = goal > 0 && totalSolved >= goal;

  return (
    <div style={{ position: "absolute",
                  top: '40%',
                  padding: '8px',
                  backgroundColor: "rgba(86, 81, 81, 0.813)",
     }}>
  <h3 style={{justifyContent: 'center'}}>Daily Tasks</h3>
  <li>Total Solved: {totalSolved}</li>
  <div>
    {
      todaySolved >= goal
        ? <span style={{color: "green"}}>Goal Achieved! ✅</span>
        : <li>Problems Solved Today: {todaySolved} / {goal}</li>
    }
    <button
      onClick={() => setShowGoalPopup(true)}
      style={{
        position: "relative",
        background: "#fff",
        border: "none",
        borderRadius: "50%",
        padding: 8,
        boxShadow: "0px 2px 6px #b794f4",
        cursor: "pointer"
      }}
      aria-label="Edit Goal"
    >
        <i class="fa-solid fa-pencil"></i>
    </button>
  </div>

  {/* Popup for setting goal */}
  {showGoalPopup && (
    <div
      style={{
        position: "absolute",
        top: "120px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.16)",
        zIndex: 1000
      }}
    >
      <form onSubmit={(e) => {
        handleSetGoal(e);
        setShowGoalPopup(false);
      }}>
        <label>
          Set Goal:&nbsp;
          <input
            type="number"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            min="1"
            placeholder="Your goal"
          />
        </label>
        <button type="submit">Set</button>
        <button type="button" onClick={() => setShowGoalPopup(false)} style={{marginLeft:8}}>Cancel</button>
      </form>
    </div>
  )}
</div>
  );
}

export default Dailytask;
