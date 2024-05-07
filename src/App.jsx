import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DetailPage from './pages/DetailPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetUser } from './states/authUser/action';
import Loading from './components/Loading';

export default function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const manageSignOut = () => {
    dispatch(asyncUnsetUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route
              path="/*"
              element={<LoginPage />}
            />
            <Route
              path="/register"
              element={<RegisterPage />}
            />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <header style={{ maxWidth: '1200px', margin: 'auto' }}>
        <Navbar
          authUser={authUser}
          logOut={manageSignOut}
        />
      </header>
      <main style={{ maxWidth: '1200px', margin: 'auto' }}>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/leaderboard"
            element={<LeaderboardPage />}
          />
          <Route
            path="/threads/:id"
            element={<DetailPage />}
          />
        </Routes>
      </main>
    </>
  );
}
