import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContainer from "./components/MainContainer";
import { ROUTES } from "./constants/routes";
function App() {
  return (
    <>
      <MainContainer>
        <Navbar />
        <Sidebar />
        <div className="wrapper">
          <Routes>
            {ROUTES.map(({ element: Element, ...rest }, index) => (
              <Route key={index} {...rest} element={<Element />} />
            ))}
          </Routes>
        </div>
      </MainContainer>
    </>
  );
}

export default App;
