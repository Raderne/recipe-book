import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchPage from "./Pages/SearchPage/SearchPage";
import { SearchProvider } from "./Context/useSearch";
import { UserProvider } from "./Context/useAuth";

function App() {
  return (
    <>
      <UserProvider>
        <SearchProvider>
          <SearchPage />
          <Navbar />
        </SearchProvider>
        <Outlet />
        <ToastContainer position="bottom-right" />
      </UserProvider>
    </>
  );
}

export default App;
