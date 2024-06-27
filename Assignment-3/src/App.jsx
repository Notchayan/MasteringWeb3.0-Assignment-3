import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
// import WeatherDashboard from './components/Weather/WeatherDashboard';
// import ProtectedRoute from './components/Layout/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/weather" element={<ProtectedRoute path="/weather" element={WeatherDashboard} />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
