import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormContainer from "./pages/Auth";
import AllBoards from "./components/AllBoards/AllBoards";
import ProtectedRoutes from "./ProtectedRoutes";
import MyProfile from "./pages/MyProfile";
import Board from "./pages/Board";
import AppProvider from "./context/userContext";
import ListDataProvider from "./context/listContext";
import Forgot from "./components/ForgotPassword/Forgot";
import Reset from "./components/ForgotPassword/Reset";

function App() {
  return (
    <>
      <AppProvider>
        <ListDataProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/boards" element={<AllBoards />} />
                <Route path="/boards/:id" element={<Board />} />
                <Route path="/me" element={<MyProfile />} />
              </Route>
              <Route path="/" element={<FormContainer />} />
              <Route path="/user/forgot-password" element={<Forgot />} />
              <Route path="/user/reset-password/:token" element={<Reset />} />
            </Routes>
          </BrowserRouter>
        </ListDataProvider>
      </AppProvider>
    </>
  );
}

export default App;
