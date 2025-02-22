import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserCount } from "../../redux/slices/userSlice";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination"; // Import the Pagination component
import { Loader } from "lucide-react"; // Import the Loader icon from lucide-react

const ViewUserPage = () => {
  const dispatch = useDispatch();
  const { users, loadingUsers, errorUsers, userCount } = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    dispatch(getUserCount());
    dispatch(getUser({ page: page, limit: limit }));
  }, [dispatch, page, limit]);

  const totalPages = Math.ceil(userCount / limit);

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleToggleStatus = (userId, currentStatus) => {
    // Dispatch an action to update the user's status (if you have this action in your redux slice)
    const updatedStatus = !currentStatus;
    // You can implement your action for toggling the status here (e.g., updateUserStatus)
    // dispatch(updateUserStatus({ userId, updatedStatus }));
    console.log(`User ID: ${userId} status updated to: ${updatedStatus}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Table for displaying users */}
      <div className="overflow-x-auto mt-4 flex-grow p-5">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-sm font-bold text-left">UserName</th>
              <th className="px-6 py-3 text-sm font-bold text-left">Email</th>
              <th className="px-6 py-3 text-sm font-bold text-left">PhoneNumber</th>
              <th className="px-6 py-3 text-sm font-bold text-left">Status</th>
              <th className="px-6 py-3 text-sm font-bold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingUsers ? (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4">
                  <Loader className="animate-spin text-gray-500" size={24} /> {/* Loading Spinner */}
                </td>
              </tr>
            ) : errorUsers ? (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4">Error loading users.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.UserId}>
                  <td className="px-6 py-4 text-sm">{user.UserName}</td>
                  <td className="px-6 py-4 text-sm">{user.Email}</td>
                  <td className="px-6 py-4 text-sm">{user.PhoneNumber}</td>
                  <td className="px-6 py-4 text-sm">{user.IsActive ? "Active" : "Inactive"}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleToggleStatus(user.UserId, user.IsActive)}
                      className={`btn ${user.IsActive ? "btn-error" : "btn-success"}`}
                    >
                      {user.IsActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mb-4">
        <Pagination 
          currentPage={page} 
          totalPages={totalPages} 
          onPageChange={handlePagination} 
        />
      </div>
    </div>
  );
};

export default ViewUserPage;
