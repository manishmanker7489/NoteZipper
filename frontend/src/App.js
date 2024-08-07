import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./Screen/LandingPage/LandingPage";
import MyNotes from "./Screen/MyNotes/MyNotes";
import LoginScreen from './Screen/LoginScreen/LoginScreen'
import RegisterScreen from './Screen/RegisterScreen/RegisterScreen'
import CreateNote from "./Screen/CreateNote/CreateNote";
import Profile from "./Screen/Profile/Profile";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/mynotes" element={<MyNotes />} />
            <Route path="/createnote" element={<CreateNote />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
