import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';
import { useState } from 'react';

const Navbar = () => {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  }

  const handleLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <>
      <header className='flex justify-between sticky top-0 p-4 bg-white shadow-sm items-center'>
        <div className='flex'>
        <Link to="/">
          <h2 className='cursor-pointer text-2xl font-medium'>
             Assignment Tracker 
          </h2>
          </Link>
            <Link to="/"> 
          <h3 className='ml-6 cursor-pointer text-xl italic hidden md:block font-medium'>
            Subjects
          </h3>
             </Link>
            <Link to="/tasks"> 
          <h3 className='ml-6 cursor-pointer text-xl italic hidden md:block font-medium'>
            Your Todo
          </h3>
             </Link>
             <Link to="/leaderboard"> 
          <h3 className='ml-6 cursor-pointer text-xl hidden md:block italic font-medium'>
            LeaderBoard
          </h3>
             </Link>             
        </div>
        <ul className='hidden md:flex gap-4 uppercase font-medium'>
          {authState.isLoggedIn ? (
            <>
              <li className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md">
                <Link to='/tasks/add' className='block w-full h-full px-4 py-2'> <i className="fa-solid fa-plus"></i> Add task </Link>
              </li>
              <li className='py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-sm' onClick={handleLogoutClick}>Logout</li>
            </>
          ) : (
            <li className='py-2 px-3 cursor-pointer text-primary hover:bg-gray-100 transition rounded-sm'><Link to="/login">Login</Link></li>
          )}
        </ul>
        <span className='md:hidden cursor-pointer' onClick={toggleNavbar}><i className="fa-solid fa-bars text-2xl"></i></span>


        {/* Navbar displayed as sidebar on smaller screens */}
{/* Navbar displayed as a sliding sidebar on smaller screens */}
<div
  className={`fixed inset-y-0 right-0 z-50 transition-transform ${
    isNavbarOpen ? 'translate-x-0' : 'translate-x-full'
  } bg-white shadow-lg w-screen sm:w-3/4 h-screen`}
>
  <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
    <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
    <button
      className="text-gray-600 hover:text-gray-800 focus:outline-none"
      onClick={toggleNavbar}
    >
      <i className="fa-solid fa-xmark text-xl"></i>
    </button>
  </div>

  <ul className="flex flex-col gap-6 p-6 text-lg">
    {/* Navigation Links */}
    <li>
      <Link
        to="/leaderboard"
        className="block w-full text-gray-800 hover:text-blue-500 font-medium"
      >
        <i className="fa-solid fa-trophy mr-2 text-blue-500"></i> Leaderboard
      </Link>
    </li>
    <li>
      <Link
        to="/"
        className="block w-full text-gray-800 hover:text-blue-500 font-medium"
      >
        <i className="fa-solid fa-book mr-2 text-blue-500"></i> Subjects
      </Link>
    </li>
    <li>
      <Link
        to="/tasks"
        className="block w-full text-gray-800 hover:text-blue-500 font-medium"
      >
        <i className="fa-solid fa-list-check mr-2 text-blue-500"></i> Your Todo
      </Link>
    </li>

    {/* Actions (Add Task and Logout/Login) */}
    <li className="mt-6">
      {authState.isLoggedIn ? (
        <>
          <Link
            to="/tasks/add"
            className="block text-center bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add Task
          </Link>
          <button
            className="block w-full mt-4 text-center text-red-600 hover:text-red-800 font-medium transition"
            onClick={handleLogoutClick}
          >
            <i className="fa-solid fa-right-from-bracket mr-2"></i> Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="block text-center bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition"
        >
          <i className="fa-solid fa-right-to-bracket mr-2"></i> Login
        </Link>
      )}
    </li>
  </ul>
</div>

      </header>
    </>
  )
}

export default Navbar