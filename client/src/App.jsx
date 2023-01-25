import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormContainer from "./components/Authentication/FormContainer";
import AllBoards from "./components/AllBoards/AllBoards";
import ProtectedRoutes from "./ProtectedRoutes";
import MyProfile from "./components/MyProfile/MyProfile";
import Board from "./components/Board/Board";
import AppProvider from "./context/userContext";
import ListDataProvider from "./context/listContext";

function App() {
  return (
    <>
      <AppProvider>
        <ListDataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<FormContainer />}>
                <Route path="/auth" element={<FormContainer />} />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route path="/boards" element={<AllBoards />} />
                <Route path="/boards/:id" element={<Board />} />
                <Route path="/me" element={<MyProfile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ListDataProvider>
      </AppProvider>
    </>
  );
}

export default App;
