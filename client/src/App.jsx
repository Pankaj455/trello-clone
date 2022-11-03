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

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<FormContainer />}>
            <Route path="/auth" element={<FormContainer />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/boards" element={<AllBoards />} />
            <Route path="/me" element={<MyProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
