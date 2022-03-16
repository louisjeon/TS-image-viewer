import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import ThumbnailCardList from "./components/ThumbnailCardList";
import Specific from "./components/Specific";

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<ThumbnailCardList />} />
            <Route path=":id" element={<Specific />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-color: crimson;
  height: 100vh;
  overflow-x: hidden;
  border-radius: 0;
`;

export default App;
