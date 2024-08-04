import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./Screen/LandingPage/LandingPage";
import MyNotes from "./Screen/MyNotes/MyNotes";
import LoginScreen from './Screen/LoginScreen/LoginScreen'
import RegisterScreen from './Screen/RegisterScreen/RegisterScreen'


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/mynotes" element={<MyNotes />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
