import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FormContainer from "./components/FormContainer/FormContainer";
import Header from "./components/Header/Header";
import GlobalStyle from "./GlobalStyle";

function App() {

  return (
    <>
      <GlobalStyle />
      {/* <FormContainer /> */}
      <Header />
    </>
  );
}

export default App;
