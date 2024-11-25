import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserNavbar = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <nav className="bg-[#05A8AA] text-white p-4 fixed top-0 w-full shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/user" className="text-xl font-bold">
          {user?.username}'s Dashboard
        </Link>
        <div className="flex space-x-4">
          {/* <Link to="/user/posts" className="hover:underline">
            My Trips
          </Link> */}
          <Link to="/user/profile" className="hover:underline">
            My fsadfsdhgdghnd
          </Link>
          <Link to="/signin" className="hover:underline">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
