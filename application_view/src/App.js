import { AppWrapper } from "./App.styled";
import { SigningForm } from "./view/SigningForm/SigningForm";
import { Routes, Route, Link } from "react-router-dom";
import { TournamentPage } from "./view/TournamentPage/TournamentPage";
import { MyTournamentsPage } from "./view/MyTournamentsPage/MyTournamentsPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ForgotPasswordPage } from "./view/ForgotPasswordPage/ForgotPasswordPage";

function App() {
  return (
    <AppWrapper>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        {/* <SigningForm isLoginPage={false}/> */}
      <Routes>
        <Route path="/" element={<TournamentPage />} exact/>
        <Route path="/login" element={<SigningForm isLoginPage={true}/>} exact/>
        <Route path="/register" element={<SigningForm isLoginPage={false}/>} exact/>
        <Route path="/mytournaments" element={<MyTournamentsPage />} exact/>
        <Route path="/forgot" element={<ForgotPasswordPage />} exact/>
        {/* <Route path="/tournament/:id" element={< />} /> */}
      </Routes>
    </AppWrapper>
  );
}

export default App;
