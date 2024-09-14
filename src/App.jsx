import React, { useState } from "react";
import "./App.css"; // Add this line to link to the CSS file

const PostToApi = () => {
  const [phonenumber, setPhoneNumber] = useState("");
  const [headersData, setHeadersData] = useState(null);

  const postData = async () => {
    try {
      const response = await fetch("https://chimpu.online/api/post.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phonenumber }),
      });
      console.log("response..............", response);

      const headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      setHeadersData(headers);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postData();
    console.log("postData....", await postData());
  };

  return (
    <div className="form-container">
      <h1>Post Phone Number to API</h1>
      <form onSubmit={handleSubmit} className="api-form">
        <input
          type="text"
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          required
        />
        <button type="submit">Submit</button>
      </form>

      {headersData && (
        <div className="headers-section">
          <h2>Response Headers:</h2>
          <pre>{JSON.stringify(headersData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PostToApi;
