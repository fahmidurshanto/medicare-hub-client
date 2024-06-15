import { useLoaderData } from "react-router-dom";

const UserDetails = () => {
  const userDetails = useLoaderData();
  console.log(userDetails);
  const { name, avatar, status, district, upazila, bloodGroup, _id } =
    userDetails;
  return (
    <div className="card card-body ">
      <h1 className="text-3xl card-title">User Details</h1>
      <p className="font-bold">
        User Id: <span className="font-light">{_id}</span>
      </p>
      <h3 className="text-2xl">{userDetails?.name}</h3>
      <img src={userDetails?.avatar} alt="Avatar" />
      <p>Blood group: {bloodGroup}</p>
      <p>Status: {userDetails.status}</p>
      <address>
        <p className="font-bold">Address:</p>
        <p>District: {userDetails?.district}</p>
        <p>Upazila: {userDetails?.upazila}</p>
      </address>
    </div>
  );
};

export default UserDetails;
