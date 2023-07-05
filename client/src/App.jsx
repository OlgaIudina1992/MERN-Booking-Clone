import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ListingPage from "./pages/ListingPage.jsx";
import HotelPage from "./pages/HotelPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<ListingPage />} />
        <Route path="/hotels/:id" element={<HotelPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>     
  )
}

export default App
