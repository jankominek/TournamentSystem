import { AppWrapper } from "./App.styled";
import { SigningForm } from "./view/SigningForm/SigningForm";
import { Routes, Route, Link } from "react-router-dom";
import { TournamentPage } from "./view/TournamentPage/TournamentPage";


function App() {
  return (
    <AppWrapper>
        {/* <SigningForm isLoginPage={false}/> */}
      <Routes>
        <Route path="/" element={<TournamentPage />} exact/>
        <Route path="/login" element={<SigningForm isLoginPage={true}/>} exact/>
        <Route path="/register" element={<SigningForm isLoginPage={false}/>} exact/>
        {/* <Route path="/tournament/:id" element={< />} /> */}
      </Routes>
    </AppWrapper>
  );
}

export default App;
