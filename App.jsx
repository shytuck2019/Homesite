import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import Detail from './pages/Detail';
import SubmitMealForm from './components/SubmitMealForm';
import MapView from './pages/MapView';
import Collections from './pages/Collections';
import Login from './pages/Login';
import Register from './pages/Register';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function App(){
  const { user, logout } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <header className="topbar">
        <div className="brand">HomeBite</div>
        <nav>
          <Link to="/">Feed</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/map">Map</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/submit">Post</Link>
          {user ? (
            <>
              <span className="user">Hi, {user.name || user.email}</span>
              <button className="btn-ghost" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/submit" element={<SubmitMealForm onDone={()=>window.location='/'}/>} />
          <Route path="/meals/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <footer className="footer">Find home-cooked meals, recipes & local spots</footer>
    </BrowserRouter>
  );
}
