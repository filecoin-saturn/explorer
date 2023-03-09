import "./App.css";

import Globe from "./components/Globe";
import Logo from "./components/Logo";
import Toolbar from "./components/Toolbar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Logo />
      <Navbar />
      <Toolbar />
      <Globe />
    </div>
  );
}

export default App;
