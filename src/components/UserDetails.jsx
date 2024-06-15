import { useLoaderData } from "react-router-dom";

const UserDetails = () => {
  const userDetails = useLoaderData();
  console.log(userDetails);
  return (
    <div className="card card-body ">
      <h1 className="text-3xl card-title">User Details</h1>
      <h3 className="text-2xl">{userDetails?.name}</h3>
      <img src={userDetails?.avatar} alt="Avatar" />
      <p>Status: {userDetails.status}</p>
      <address>
        <p>District: {userDetails?.district}</p>
        <p>Upazila: {userDetails?.upazila}</p>
      </address>
    </div>
  );
};

export default UserDetails;
