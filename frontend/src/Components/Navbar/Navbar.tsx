import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="relative container mx-auto py-6">
      <div className="flex items-center justify-between text-primary">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img
              src="../../../public/assets/logo.png"
              alt="logo"
              className="w-10 h-10"
            />
            <h1 className="">Recipes</h1>
          </div>
        </Link>

        <div className="flex items-center space-x-4 border-b-2 border-primary cursor-pointer">
          <h1 className="px-4 py-1">Search</h1>
          <FaSearch className="text-sm" />
        </div>

        <div className="">
          <button className="px-4 py-1 bg-primary text-white rounded-md border border-transparent hover:bg-offwhite hover:text-primary hover:border-primary transition-all duration-300 ease-in-out">
            Account
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
