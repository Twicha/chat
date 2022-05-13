import { ChatPage, SettingsPage, SigninPage, SignupPage } from "pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { PrivateRoute } from "./providers/private-route";
// import { AppRoutes } from "./providers/routes";
import "./styles/index.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <AppRoutes /> */}
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* <Route path="*" element={<div>404</div>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
