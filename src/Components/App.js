import "../style/App.css";
import "../style/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "./Container";
import ScrollToTop from "./ScrolltoTop";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Container />
      </Router>
    </div>
  );
}

export default App;
