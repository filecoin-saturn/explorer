import "./App.css";

import Globe from "./components/Globe";
import Logo from "./components/Logo";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <div className="App">
      <Logo />
      <Toolbar />
      <Globe />
    </div>
  );
}

export default App;
