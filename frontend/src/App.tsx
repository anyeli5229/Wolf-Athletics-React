import { useModal } from "./hooks/useModal";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { RutinaPage } from "./pages/RutinaPage";


function App() {
  const modal = useModal();

  return (

    <Routes>
      <Route
        path="/"
        element={
          <Home
            modal={modal}
          />
        }
      />

      <Route
        path="/rutina/:id"
        element={
          <RutinaPage />
        }
      />
    </Routes>
  );
}

export default App;