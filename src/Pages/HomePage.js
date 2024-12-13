import React from "react";
import { useNavigate  } from "react-router-dom";
import ExerciseList from "../components/ExerciseList";
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate ();
  const handleStartSearch = () => {
    navigate('/search');
  };
  return (
    <div>
      <Header />
      <nav>
        <ExerciseList /> {/* 운동 목록 컴포넌트 추가 */}
      </nav>
      <Footer />
    </div>
  );
};

export default HomePage;

