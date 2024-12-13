import React, { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./RoutinePage.css";

const RoutinePage = ({ routine, setRoutine }) => {
  const [editingExercise, setEditingExercise] = useState(null); // 수정 중인 운동
  const [updatedName, setUpdatedName] = useState(""); // 수정된 운동 이름

  const handleRemoveExercise = (day, id) => {
    setRoutine((prevRoutine) => ({
      ...prevRoutine,
      [day]: prevRoutine[day].filter((exercise) => exercise.id !== id),
    }));
  };

  const handleEditExercise = (day, id, newName) => {
    setRoutine((prevRoutine) => ({
      ...prevRoutine,
      [day]: prevRoutine[day].map((exercise) =>
        exercise.id === id ? { ...exercise, name: newName } : exercise
      ),
    }));
    setEditingExercise(null); // 수정 완료 후 초기화
  };

  return (
    <div className="routine-page">
      <Header />
      <main className="routine-container">
        <h1 className="routine-title">나의 주간 운동 계획</h1>
        <div className="routine-days-row">
          {Object.keys(routine)
            .filter((day) => day !== "tempExercises")
            .map((day) => (
              <div key={day} className="routine-day">
                <h2>{day}</h2>
                <ul>
                  {routine[day].map((exercise) => (
                    <li key={exercise.id} className="exercise-item">
                      <span>{exercise.name}</span>
                      <button
                        className="edit-button"
                        onClick={() => {
                          setEditingExercise({ day, id: exercise.id });
                          setUpdatedName(exercise.name); // 기존 이름을 기본값으로 설정
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleRemoveExercise(day, exercise.id)}
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        {editingExercise && (
          <div className="edit-modal">
            <h2>운동 수정</h2>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <button
              onClick={() =>
                handleEditExercise(
                  editingExercise.day,
                  editingExercise.id,
                  updatedName
                )
              }
            >
              저장
            </button>
            <button onClick={() => setEditingExercise(null)}>취소</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RoutinePage; 
