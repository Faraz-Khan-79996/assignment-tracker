import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/utils/Loader"; 

function Leaderboard() {
//   const authState = useSelector((state) => state.authReducer);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (!authState.isLoggedIn) return;

    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/user/", {
        });
        // Calculate total score for each user
        const usersWithScores = response.data.users.map((user) => ({
          ...user,
          totalScore: user.completedAssignments.length * 10, // 10 points per completed assignment
        }));

        // Sort users by total score in descending order
        const sortedUsers = usersWithScores.sort((a, b) => b.totalScore - a.totalScore);
        
        setLeaderboardData(sortedUsers);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  console.log(leaderboardData);
  

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Leaderboard</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Rank</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Completed Assignments</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 border-b cursor-pointer"
              >
                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {user.completedAssignments.length}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {user.completedAssignments.length * 10} {/* 10 points per assignment */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
