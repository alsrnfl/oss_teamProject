import React, { useState, useEffect } from "react"; // useState 추가
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import RoutinePage from "./Pages/RoutinePage";
import SearchPage from "./Pages/SearchPage";
import StatusPage from "./Pages/StatusPage";
import { syncDataToMockAPI } from "./utils/api";

const App = () => {
  // Open API 데이터를 MockAPI로 동기화
  useEffect(() => {
    syncDataToMockAPI(); // 동기화 함수 실행
  }, []);

  // 초기 루틴 상태 정의
  const initialRoutine = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
    tempExercises: [], // 임시 운동 목록
  };

  const [routine, setRoutine] = useState(initialRoutine); // useState 사용

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/routine"
          element={<RoutinePage routine={routine} setRoutine={setRoutine} />}
        />
        <Route
          path="/search"
          element={<SearchPage routine={routine} setRoutine={setRoutine} />}
        />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
    </Router>
  );
};

export default App;
