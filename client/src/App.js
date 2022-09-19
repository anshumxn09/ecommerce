import { BrowserRouter as Router} from "react-router-dom";
import Header from "./components/headers/Header";
import Pages from "./components/mainpages/Pages";
import { DataProvider } from "./GlobalState";
import Footer from "./components/mainpages/utils/Footer/Footer";
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
// import { ToastContainer} from 'react-toastify';

function App() {
  return (
    <DataProvider>
    <PayPalScriptProvider options={"client-id:Ad5LETLHa-jhVKsUYl45TE9_lOHBlegnQBR5LaldZ3doeDiucLvlhWLzuxeDQNc7SfxLQ_vltZbUS47Q"}>
      <Router>
        <div className="App">
          <Header/>
          <Pages/>
          <Footer/>
        </div>
      </Router>
      </PayPalScriptProvider>
    </DataProvider>
  );
}

export default App;
