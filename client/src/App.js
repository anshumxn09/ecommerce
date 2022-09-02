import { BrowserRouter as Router} from "react-router-dom";
import Header from "./components/headers/Header";
import Pages from "./components/mainpages/Pages";
import { DataProvider } from "./GlobalState";
import Footer from "./components/mainpages/utils/Footer/Footer";
function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <Pages/>
          <Footer/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
