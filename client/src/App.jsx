import {
  BrowserRouter,
  Routes,
  Route,
  useRoutes
} from "react-router-dom";
import FormContainer from "./components/FormContainer/FormContainer";
import Header from "./components/Header/Header";
import GlobalStyle from "./GlobalStyle";
import AllBoards from "./components/AllBoards/AllBoards";
import ProtectedRoutes from "./ProtectedRoutes";

const AuthRoutes = () => useRoutes([
  {path: "/", element: <FormContainer /> },
  {path: "/auth", element: <FormContainer /> }
])

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        {/* <Header /> */}
        {/* <AuthRoutes /> */}
        <Routes>
          <Route path="/" element={<FormContainer />}>
            <Route path="/auth" element={<FormContainer />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/boards" element={<AllBoards />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
