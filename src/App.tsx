import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:id" element={<UserProfile/>} />
      </Routes>
    </>
  );
}

export default App;
