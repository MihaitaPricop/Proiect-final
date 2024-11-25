import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HeroSection from "./components/HeroSection";

function App() {
  return (
    <>
      <HeroSection />
      <ToastContainer />
    </>
  );
}

export default App;
