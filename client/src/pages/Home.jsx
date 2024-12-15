import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);  // New loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!authState.isLoggedIn) return;

      setLoading(true); // Start loading
      try {
        const response = await axios.get('/api/subject/subjects', {
          headers: { Authorization: authState.token },
        });
        setSubjects(response.data.subjects || []);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchSubjects();
  }, [authState.isLoggedIn, authState.token]);

  const calculateCompletion = (assignments) => {
    const completedAssignments = assignments.filter((a) =>  authState.user.completedAssignments.includes(a._id));
    return Math.round((completedAssignments.length / assignments.length) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Subjects</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <div
              key={subject._id}
              className="border rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition hover:-translate-y-1"
            >
              <h2 className="text-lg font-semibold mb-4 text-center">{subject.name}</h2>
              <p className="text-gray-600">
                <strong>Total Assignments:</strong> {subject.assignments.length}
              </p>
              <p className="text-gray-600">
                <strong>Completed:</strong> {calculateCompletion(subject.assignments)}%
              </p>
              <button
                className="mt-4 bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() => {
                  // Navigate to subject-specific assignments
                  navigate(`/subjects/${subject._id}/assignments`)
                }}
              >
                View Assignments
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
