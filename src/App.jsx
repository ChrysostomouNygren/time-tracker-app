import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Routing:
import { Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import History from "./pages/History";
import Timer from "./pages/CreateTimer";

function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<Overview/>}/>
      <Route path="/history" element={<History/>}/>
      <Route path="/timer" element={<Timer/>}/>
    </Routes>
  </div>;
}

export default App;
