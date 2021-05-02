import "./style/App.css";
import "./style/index.css";
import Navigation from "./Components/Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import Content from "./Components/Content";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Content />
      </Router>
    </div>
  );
}

export default App;
