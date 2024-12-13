import axios from "axios";
import React, { useState, useEffect } from "react";
import "./ExerciseList.css"; 

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]); // 운동 데이터
  const [filter, setFilter] = useState(""); // 난이도 필터 상태
  const mockApiBaseUrl = "https://674d40e954e1fca9290eda6e.mockapi.io/exercise"; // MockAPI 엔드포인트
  const openApiUrl = "https://api.api-ninjas.com/v1/exercises"; // Open API 엔드포인트
  const openApiKey = "SEXFn1kM8DMXcVswBv6sGg==WsUEwDYmiNjY3Nne"; // Open API 키

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // MockAPI 데이터 가져오기
        const mockAPIResponse = await axios.get(mockApiBaseUrl);

        // Open API 데이터 가져오기
        const openAPIResponse = await axios.get(openApiUrl, {
          headers: { "X-Api-Key": openApiKey },
          params: { muscle: "biceps" }, // 특정 근육 필터링
        });

        // MockAPI 데이터와 Open API 데이터를 병합
        const combinedData = openAPIResponse.data.map((exercise) => {
          const mockData = mockAPIResponse.data.find(
            (mock) => mock.name === exercise.name
          );
          return {
            ...exercise,
            calories: mockData ? mockData.calories : "N/A", // MockAPI의 칼로리 사용
          };
        });

        setExercises(combinedData); // 상태 업데이트
      } catch (error) {
        console.error("데이터 가져오기 에러:", error);
      }
    };

    fetchAllData();
  }, []);

  // 필터링된 데이터 계산
  const filteredExercises = exercises.filter((exercise) =>
    filter ? exercise.difficulty === filter : true
  );

  return (
    <div className="exercise-list-container">
      <h1>운동 리스트</h1>
      <div className="filter-container">
        <label htmlFor="filter">난이도별 필터:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">전체</option>
          <option value="beginner">초급</option>
          <option value="intermediate">중급</option>
          <option value="advanced">고급</option>
        </select>
      </div>
      <div className="exercise-list">
        {filteredExercises.map((exercise, index) => (
          <div key={index} className="exercise-card">
            <h3>{exercise.name}</h3>
            <p><strong>운동 유형:</strong> {exercise.type || "N/A"}</p>
            <p><strong>운동 근육:</strong> {exercise.muscle || "N/A"}</p>
            <p><strong>운동 난이도:</strong> {exercise.difficulty || "N/A"}</p>
            <p><strong>소모 칼로리:</strong> {exercise.calories || "N/A"} kcal</p>
            <p><strong>장비:</strong> {exercise.equipment || "N/A"}</p>
            <p><strong>운동 설명:</strong> {exercise.instructions || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>

  );
};

export default ExerciseList;
