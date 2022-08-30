import { BrowserRouter as Router} from "react-router-dom";
import Header from "./components/headers/Header";
import Pages from "./components/mainpages/Pages";
import { DataProvider } from "./GlobalState";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <div className="mainBox">
          <Pages/>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
