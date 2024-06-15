import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: user?.displayName,
    email: user?.email,
    phone: user?.phoneNumber || "Not provided",
  });

  console.log(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="card shadow-lg p-4">
      <h2 className="text-2xl mb-4">My Profile</h2>
      {!isEditing ? (
        <div>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>

          <button className="btn btn-primary mt-4" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div className="form-control">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Address</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="mt-4">
            <button type="submit" className="btn btn-primary mr-2">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
