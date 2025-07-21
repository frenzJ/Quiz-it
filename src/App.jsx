import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEditCards from "./pages/AddEditCards";
import Card from "./pages/Card";
import CreateSet from "./pages/CreateSet";
import FlashCard from "./pages/FlashCard";
import HomePage from "./pages/HomePage";
import MatchList from "./pages/MatchList";
import MultipleChoice from "./pages/MultipleChoice";
import Writing from "./pages/Writing";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AddEditCards" element={<AddEditCards />} />
          <Route path="/Card" element={<Card />} />
          <Route path="/CreateSet" element={<CreateSet />} />
          <Route path="/FlashCard" element={<FlashCard />} />
          <Route path="/MatchList" element={<MatchList />} />
          <Route path="/MultipleChoice" element={<MultipleChoice />} />
          <Route path="/Writing" element={<Writing />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
