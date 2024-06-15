import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { signUp, loading } = useContext(AuthContext);
  const [avatar, setAvatar] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // districts data fetching by axios
  useEffect(() => {
    axios
      .get("http://localhost:5000/districts")
      .then((res) => {
        setDistricts(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // upazilas data fetching by axios
  useEffect(() => {
    axios
      .get("http://localhost:5000/upazilas")
      .then((res) => {
        setUpazilas(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleImageUpload = (e) => {
    const imageData = new FormData();
    imageData.set("key", "ebc8e8779676d69b4a0f03efe9e939c2");
    imageData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((response) => {
        setAvatar(response.data.data.display_url);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      name,
      email,
      avatar,
      bloodGroup,
      district,
      upazila,
      password,
    };
    console.log(newUser);

    axios
      .post("http://localhost:5000/users", newUser)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your account data has been stored in the database successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/userDashboard");
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          icon: "error",
          title: error.message,
          text: "Something went wrong!",
        });
      });

    signUp(email, password, newUser)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during signup:", error);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {loading ? (
        <span className="loading loading-ball loading-lg"></span>
      ) : (
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg my-10">
          <h1 className="text-2xl font-bold text-center">Register</h1>
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
              />
            </div>
            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
            </div>
            {/* avatar */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Avatar</span>
              </label>
              <input
                name="avatar"
                type="file"
                className="input input-bordered w-full"
                onChange={handleImageUpload}
              />
            </div>
            {/* blood group */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                name="bloodGroup"
                className="select select-bordered w-full"
              >
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <select name="district" className="select select-bordered w-full">
                {districts.map((district) => (
                  <option key={district._id}>{district?.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upazila</span>
              </label>
              <select name="upazila" className="select select-bordered w-full">
                {upazilas.map((upazila) => (
                  <option key={upazila._id}>{upazila?.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Register</button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="form-control">
            <button className="btn btn-outline w-full flex items-center justify-center">
              <FcGoogle className="mr-2" />
              Sign up with Google
            </button>
          </div>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
