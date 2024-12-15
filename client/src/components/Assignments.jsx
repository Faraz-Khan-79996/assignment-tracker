import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import Loader from './utils/Loader';
import { useParams } from 'react-router-dom';

function Assignments() {

    const authState = useSelector(state => state.authReducer);
    const [assignments, setAssignments] = useState([]);
    const [fetchData, { loading }] = useFetch();
    const [statusLoading, setStatusLoading] = useState(null);
    const { subjectId } = useParams();

    const fetchAssignments = useCallback(() => {
        const config = { url: `/subject/subjects/${subjectId}/assignments`, method: "get", headers: { Authorization: authState.token } };
        fetchData(config, { showSuccessToast: false }).then(data => setAssignments(data.assignments));
    }, [authState.token, fetchData]);

    useEffect(() => {
        if (!authState.isLoggedIn) return;
        fetchAssignments();
    }, [authState.isLoggedIn, fetchAssignments]);

    const handleUpdateStatus = async (assignmentId, action) => {
        try {
            setStatusLoading(assignmentId);
            const response = await axios.put(
                `/api/assignment/${assignmentId}?action=${action}`,
                {},
                {
                    headers: {
                        Authorization: `${authState.token}`, // Include the token in the request header
                    },
                }
            );
            if (response.status === 200) {
                setAssignments((prevAssignments) =>
                    prevAssignments.map((assignment) =>
                        assignment._id === assignmentId
                            ? { ...assignment, completedBy: response.data.completedBy }
                            : assignment
                    )
                );
            }
        } catch (error) {
            console.error("Error updating assignment status:", error);
            alert("An error occurred while updating the assignment status.");
        } finally {
            setStatusLoading(null);
        }
    };

    // Function to check if the assignment's deadline has passed
    const isDeadlinePassed = (lastDateOfSubmission) => {
        const currentDate = new Date();
        return new Date(lastDateOfSubmission) < currentDate;
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Assignments</h1>

            <div className="space-y-6">
                {assignments.map((assignment) => (
                    <div key={assignment._id} className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800">{assignment.name}</h2>
                        <p className="text-sm text-gray-500">Subject: {assignment.subject}</p>
                        <p className="mt-2 text-gray-700">{assignment.description}</p>
                        <div className="mt-4">
                            <div
                                className="bg-gray-100 p-4 rounded-lg"
                                dangerouslySetInnerHTML={{ __html: assignment.content }}
                            />
                        </div>
                        <p className="mt-4 text-sm text-gray-400">Last Date of Submission: {assignment.lastDateOfSubmission}</p>

                        {/* Display how many users completed the assignment */}
                        <p className="mt-2 text-sm text-gray-500">
                            Completed by {assignment.completedBy.length} {assignment.completedBy.length === 1 ? 'user' : 'users'}
                        </p>

                        <div className="mt-4">
                            {isDeadlinePassed(assignment.lastDateOfSubmission) ? (
                                // If the deadline has passed and the user has not completed the assignment
                                !assignment.completedBy.includes(authState.user._id) ? (
                                    <button className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed">
                                        No Longer Accepting Responses
                                    </button>
                                ) : (
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                                        onClick={() => handleUpdateStatus(assignment._id, 'pending')}
                                        disabled={statusLoading === assignment._id}
                                    >
                                        {statusLoading === assignment._id ? "Updating..." : "Unmark as Completed"}
                                    </button>
                                )
                            ) : assignment.completedBy.includes(authState.user._id) ? (
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => handleUpdateStatus(assignment._id, 'pending')}
                                    disabled={statusLoading === assignment._id}
                                >
                                    {statusLoading === assignment._id ? "Updating..." : "Unmark as Completed"}
                                </button>
                            ) : (
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => handleUpdateStatus(assignment._id, 'complete')}
                                    disabled={statusLoading === assignment._id}
                                >
                                    {statusLoading === assignment._id ? "Updating..." : "Mark as Done"}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Assignments;
