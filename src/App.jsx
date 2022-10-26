import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Routing:
import { Routes, Route } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Overview from "./pages/Overview";
import Timer from "./pages/CreateTimer";

function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<Overview/>}/>
      <Route path="/calendar" element={<Calendar/>}/>
      <Route path="/timer" element={<Timer/>}/>
    </Routes>
  </div>;
}

export default App;
