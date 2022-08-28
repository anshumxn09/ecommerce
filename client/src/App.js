import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/headers/Header";
import Pages from "./components/mainpages/Pages";
import { DataProvider } from "./GlobalState";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <Pages/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
