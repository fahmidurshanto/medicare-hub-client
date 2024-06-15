import React from "react";

const TestResults = () => {
  const results = [
    { id: 1, testName: "Blood Test", date: "2024-06-20" },
    { id: 2, testName: "MRI Scan", date: "2024-06-25" },
    // Add more results as needed
  ];

  const handleDownload = (id) => {
    // Logic to download the test result
    console.log("Download result:", id);
  };

  const handlePrint = (id) => {
    // Logic to print the test result
    console.log("Print result:", id);
  };

  return (
    <div className="card shadow-lg p-4">
      <h2 className="text-2xl mb-4">My Test Results</h2>
      <div className="results-list">
        {results.map((result) => (
          <div
            key={result.id}
            className="result mb-4 p-4 border rounded shadow-sm"
          >
            <p>
              <strong>Test Name:</strong> {result.testName}
            </p>
            <p>
              <strong>Date:</strong> {result.date}
            </p>
            <div className="mt-2">
              <button
                className="btn btn-primary mr-2"
                onClick={() => handleDownload(result.id)}
              >
                Download
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handlePrint(result.id)}
              >
                Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResults;
