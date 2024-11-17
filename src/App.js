import {BrowserRouter as Router , Route,Routes,Link} from "react-router-dom"

//pages
import Home from './pages/Home';
import Update from "./pages/Update";
import Create from "./pages/Create";



function App() {
  return (
      <Router>
        <nav>
          <h1>SupaBase Crud Operations</h1>
          <Link to="/">Home</Link>
          <Link to="/create">Create new data</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:id" element={<Update />} />
        </Routes>
      </Router>
  );
}

export default App;
