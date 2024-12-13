import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">MyFit Planner</h1>
      <nav className="header-nav">
        <Link to="/">홈</Link>
        <Link to="/search">운동 검색</Link>
        <Link to="/routine">운동 루틴</Link>
        <Link to="/stats">운동 통계</Link>
        <Link to="/profile">프로필</Link>
      </nav>
    </header>
  );
};

export default Header;