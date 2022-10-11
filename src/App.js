import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonDetails from './pages/PokemonDetails';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
}

export default App;
