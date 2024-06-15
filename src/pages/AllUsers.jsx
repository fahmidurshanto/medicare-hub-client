import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error.message));
  }, []);
  console.log(users);

  const handleBlockUser = (userId) => {
    axios
      .patch(`http://localhost:5000/users/${userId}`, { status: "blocked" })
      .then((response) => {
        if (response.status === 200) {
          // Update user data locally for immediate UI feedback
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, status: "blocked" } : user
            )
          );
          console.success("User blocked successfully!");
        } else {
          console.error("Failed to block user:", response.data);
        }
      })
      .catch((error) => console.error("Error blocking user:", error));
  };
  return (
    <div className="m-10">
      <h2 className="text-4xl">All Users: {users.length}</h2>
      <div className="grid grid-cols-3 gap-7">
        {users.map((user) => (
          <div
            key={user._id}
            className="card w-96 bg-white shadow-xl rounded-lg p-6"
          >
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="card-title text-xl font-semibold">
                  {user?.name}
                </h2>
                <p className="text-gray-500">{user?.email}</p>
                <p className="text-gray-500">Blood Group: {user?.bloodGroup}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">
                <span className="font-bold">District:</span> {user?.district}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Upazila:</span> {user?.upazila}
              </p>
            </div>
            <Link to={`/allUsers/${user._id}`} className="btn btn-info mt-4">
              See info
            </Link>
            <button className="btn btn-secondary mt-4">Delete</button>
            <button
              className={`btn btn-warning mt-4 ${
                user.status === "blocked" ? "disabled" : ""
              }`}
              onClick={() => handleBlockUser(user._id)}
              disabled={user.status === "blocked"}
            >
              {user.status === "blocked" ? "Blocked" : "Block"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
