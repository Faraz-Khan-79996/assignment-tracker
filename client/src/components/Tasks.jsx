import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: '/tasks', method: 'get', headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then((data) => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: 'delete', headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <div className="my-6 mx-auto max-w-6xl px-4">
      {tasks.length !== 0 && (
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">Your Tasks ({tasks.length})</h2>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-6 h-80">
              <p className="text-gray-600 text-lg">No tasks found</p>
              <Link
                to="/tasks/add"
                className="bg-blue-600 text-white hover:bg-blue-700 font-medium px-6 py-3 shadow-md"
              >
                + Add New Task
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tasks.map((task, index) => (
                <div
                  key={task._id}
                  className="bg-gray-50 p-6 shadow-lg border hover:shadow-xl transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-4 border-b pb-2">
                      Task #{index + 1}
                    </h3>
                    <p className="text-gray-700 text-base mb-6 whitespace-pre-line">
                      {task.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Link
                      to={`/tasks/${task._id}`}
                      className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 shadow-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-600 text-white px-4 py-2 hover:bg-red-500 shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
