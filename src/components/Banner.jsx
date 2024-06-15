import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    // Fetch active banner data from server
    fetch("/api/banner")
      .then((response) => response.json())
      .then((data) => setBanner(data));
  }, []);

  return (
    <div
      className="relative w-full h-64 bg-cover bg-center"
      style={{ backgroundImage: `url(${banner?.image})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold">{banner?.title}</h1>
          <p>text{banner?.text}</p>
          <p>
            Coupon Code: {banner?.couponCode} - {banner?.discountRate}% off
          </p>
          <button className="btn btn-primary mt-4">
            <Link to="/all-tests">View All Tests</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
