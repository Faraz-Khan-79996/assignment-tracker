import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Task from "./pages/Task";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { saveProfile } from "./redux/actions/authActions";
import NotFound from "./pages/NotFound";
import LeaderBoard from "./pages/LeaderBoard";
import MainLayout from "./layouts/MainLayout";
import TaskPage from "./pages/TaskPage";
import AssignmentPage from "./pages/AssignmentPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(saveProfile(token));
  }, [authState.isLoggedIn, dispatch]);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <MainLayout><PrivateRoute> <Home /></PrivateRoute> </MainLayout>} />
          <Route path="/subjects/:subjectId/assignments" element={<MainLayout><AssignmentPage /></MainLayout>} />
          <Route path="/leaderboard" element={<MainLayout> <LeaderBoard /></MainLayout>} />
          <Route path="/tasks" element={<MainLayout> <TaskPage /></MainLayout>} />          
          <Route path="/signup" element={authState.isLoggedIn ? <Navigate to="/" /> : <Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks/add" element={authState.isLoggedIn ? <Task /> : <Navigate to="/login" state={{ redirectUrl: "/tasks/add" }} />} />
          <Route path="/tasks/:taskId" element={authState.isLoggedIn ? <Task /> : <Navigate to="/login" state={{ redirectUrl: window.location.pathname }} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
