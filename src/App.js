import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Phonebook from "./components/Phonebook";
import Navigation from "./components/Navigation";
import NewContact from "./components/NewContact";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Phonebook />} />
        <Route path="/newContact" element={<NewContact />} />
      </Routes>
    </div>
  );
}

export default App;
