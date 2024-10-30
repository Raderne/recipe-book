import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSearch } from "../../Context/useSearch";
import { useAuth } from "../../Context/useAuth";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
  const { setIsModelOpen, IsModelOpen } = useSearch();
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="relative container mx-auto py-6 max-sm:px-4">
      <div className="flex items-center justify-between text-primary">
        <Link to="/">
          <div className="flex items-center space-x-2 max-sm:space-x-0">
            <img src="/assets/logo.png" alt="logo" className="w-10 h-10" />
            <h1 className="max-sm:hidden">Recipes</h1>
          </div>
        </Link>

        <button
          onClick={() => setIsModelOpen(!IsModelOpen)}
          className="flex items-center space-x-4 max-sm:space-x-0 border-b-2 max-sm:border-0 border-primary cursor-pointer"
        >
          <h1 className="px-4 py-1 max-sm:hidden">Search</h1>
          <FaSearch className="text-sm max-sm:text-xl" />
        </button>

        {isLoggedIn() ? (
          <div className="flex items-center space-x-4 max-sm:space-x-2">
            <h1 className="max-sm:hidden">
              Welcome,{" "}
              <span className="font-bold underline">
                {user?.userName || "reda"}
              </span>
            </h1>
            <Link
              to="/profile"
              className="px-4 py-1 bg-offwhite text-base text-primary rounded-md border border-primary hover:bg-primary hover:text-offwhite hover:border-primary transition-all duration-300 ease-in-out"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="px-4 py-1 bg-primary text-white rounded-md border border-transparent hover:bg-offwhite hover:text-primary hover:border-primary transition-all duration-300 ease-in-out"
            >
              <span className="max-sm:hidden">Logout</span>
              <MdOutlineLogout className="md:hidden text-2xl" />
            </button>
          </div>
        ) : (
          <div className="">
            <Link
              to="/login"
              className="px-4 py-1 bg-primary text-white rounded-md border border-transparent hover:bg-offwhite hover:text-primary hover:border-primary transition-all duration-300 ease-in-out"
            >
              Account
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
