import "../style/App.css";
import "../style/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "./Container";
import ScrollToTop from "./ScrolltoTop";
import { useHistory } from "react-router-dom";
import NavigationBar from "./NavigationBar";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <Router history={history}>
        <ScrollToTop />
        <div className="view-container">
          <NavigationBar />
          <Container />
        </div>
      </Router>
    </div>
  );
}

export default App;
