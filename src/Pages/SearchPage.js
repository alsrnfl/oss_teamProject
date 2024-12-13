import React, { useState } from "react";
import axios from "axios";
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import "../Pages/SearchPage.css";

const SearchPage = ({ routine, setRoutine }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Monday");

  const handleSearch = async () => {
    try {
      const response = await axios.get("https://api.api-ninjas.com/v1/exercises", {
        headers: { "X-Api-Key": "SEXFn1kM8DMXcVswBv6sGg==WsUEwDYmiNjY3Nne" },
        params: { name: searchTerm },
      });
      setResults(response.data);
    } catch (error) {
      console.error("검색 에러:", error);
    }
  };

  const addToRoutineList = (exercise) => {
    setRoutine((prevRoutine) => ({
      ...prevRoutine,
      tempExercises: [...(prevRoutine.tempExercises || []), { id: Date.now(), ...exercise }],
    }));
  };

  const addExerciseToDay = (exercise, day) => {
    setRoutine((prevRoutine) => ({
      ...prevRoutine,
      [day]: [...prevRoutine[day], exercise],
      tempExercises: prevRoutine.tempExercises.filter((item) => item.id !== exercise.id),
    }));
  };

  return (
    <div className="search-container">
      <Header />
      <div className="content-container">
        {/* 왼쪽: 운동 검색 */}
        <section className="search-section">
          <h1>운동 검색</h1>
          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="운동 이름 검색 ex: press"
            />
            <button onClick={handleSearch}>검색</button>
          </div>
          <div className="search-results">
            {results.map((exercise, index) => (
              <div key={index} className="search-card">
                <h3>{exercise.name}</h3>
                <p>대상 근육: {exercise.muscle}</p>
                <button onClick={() => addToRoutineList(exercise)}>루틴에 추가</button>
              </div>
            ))}
          </div>
        </section>

        {/* 오른쪽: 운동 루틴 */}
        <section className="routine-section">
          <h2>운동 루틴</h2>
          <div className="routine-list">
            {routine.tempExercises?.map((exercise) => (
              <div key={exercise.id} className="routine-card">
                <h3>{exercise.name}</h3>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                    (day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    )
                  )}
                </select>
                <button onClick={() => addExerciseToDay(exercise, selectedDay)}>추가</button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
