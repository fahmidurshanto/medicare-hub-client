import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../Hooks/useAxiosSecure";

const AllUsers = () => {
  const [loggeduser, setUsers] = useState([]);
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User made admin successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to make user admin",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  useEffect(() => {
    axios
      .get("https://medicare-hub-server.onrender.com/users")
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error.message));
  }, []);
  console.log(loggeduser);

  const handleBlockUser = (userId) => {
    axios
      .patch(`https://medicare-hub-server.onrender.com/users/${userId}`, {
        status: "blocked",
      })
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

  const handleDeleteUser = (userId) => {
    axios
      .delete(`https://medicare-hub-server.onrender.com/users/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } else {
          console.error("Failed to delete user:", response.data);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="m-10">
      <h2 className="text-4xl">All Users: {loggeduser.length}</h2>
      <div className="grid grid-cols-3 gap-7">
        {loggeduser.map((user) => (
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
            {user.role === "admin" ? (
              <button className="btn btn-outline">Admin</button>
            ) : (
              <button
                onClick={() => handleMakeAdmin(user)}
                className="btn btn-success mt-4"
              >
                Make admin
              </button>
            )}
            <Link to={`/allUsers/${user._id}`} className="btn btn-info mt-4">
              See info
            </Link>
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="btn btn-secondary mt-4"
            >
              Delete
            </button>
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
