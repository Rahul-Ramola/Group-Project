import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BrainTumor from './pages/BrainTumor'
import SkinCancer from './pages/SkinCancer'
import Pneumonia from './pages/Pneumonia'
import Symptoms from './pages/Symptoms'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brain-tumor" element={<BrainTumor />} />
        <Route path="/skin-cancer" element={<SkinCancer />} />
        <Route path="/pneumonia" element={<Pneumonia />} />
        <Route path="/symptoms" element={<Symptoms />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App