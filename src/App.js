import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const routesArray = [
    {
      path: "/", rComponent: <p>Accueil</p>
    },
    {
      path: "/about", rComponent: <p>A propos</p>
    },
    {
      path: "/jobs", rComponent: <p>Jobs</p>
    },
    {
      path: "/contact", rComponent: <p>Contact</p>
    },
    {
      path: "/legales", rComponent: <p>Mentions legales</p>
    },

  ]
  return (
    <BrowserRouter>
      <Routes>
        {
          routesArray.map((route, index) => <Route key={"route number" + index}
            path={route.path}
            element={route.rComponent} />)
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
