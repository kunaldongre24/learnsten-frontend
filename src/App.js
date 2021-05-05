import "./style/App.css";
import "./style/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "./Components/Container";
function App() {
  return (
    <div className="App">
      <Router>
        <Container />
      </Router>
    </div>
  );
}

export default App;
