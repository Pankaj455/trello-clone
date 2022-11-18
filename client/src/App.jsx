import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FormContainer from "./components/FormContainer/FormContainer";
import GlobalStyle from "./GlobalStyle";
import AllBoards from "./components/AllBoards/AllBoards";
import ProtectedRoutes from "./ProtectedRoutes";
import MyProfile from "./components/MyProfile/MyProfile";
import Board from "./components/Board/Board";
import AppProvider from "./context/AppProvider";

function App() {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <GlobalStyle />
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
      </AppProvider>
    </>
  );
}

export default App;
