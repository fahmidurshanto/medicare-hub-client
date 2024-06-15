import React, { useEffect, useState } from "react";

const FeaturedTests = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Fetch featured tests data from server
    fetch("/api/featured-tests")
      .then((response) => response.json())
      .then((data) => setTests(data));
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Featured Tests</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tests.map((test) => (
          <div key={test.id} className="card">
            <figure>
              <img src={test.image} alt={test.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{test.name}</h2>
              <p>{test.description}</p>
              <button className="btn btn-primary">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTests;
