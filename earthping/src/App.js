// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
// import Header from './component/Header/Header';
// import Body from './component/Body/Body';
// import MapComponent from './component/Map/Map';
import Signup from './component/Signup/Signup';
import Login from './component/Login/Login';
import LandingPage from './component/Landing/Landing';

function App() {
  return (
    // <Login />
    // <Signup />
    <Router>
      {/* <LandingPage /> */}
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
