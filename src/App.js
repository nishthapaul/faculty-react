import "./App.css"
import NavBar from "./components/NavBar"
import AddCourse from "./pages/AddCourse";
import AddFaculty from "./pages/AddFaculty";
import ViewFaculty from "./pages/ViewFaculty";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/add-faculty" element={<AddFaculty />} />
          <Route exact path="/view-faculty/:facultyId" element={<ViewFaculty />} />
          <Route exact path="/add-course/:facultyId" element={<AddCourse />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
