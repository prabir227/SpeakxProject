import React, { useState } from 'react';
import { AnagramServiceClient } from './protos/anagram_grpc_web_pb';
import { AnagramRequest } from './protos/anagram_pb';
import './App.css';
const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [jsonData, setJsonData] = useState([]);
  const [error, setError] = useState(null);

  // Create gRPC client
  const client = new AnagramServiceClient("http://localhost:8080"); // Update with the proxy URL

  // Function to fetch data via gRPC
  const fetchData = () => {
    const request = new AnagramRequest();
    request.setTitle(inputValue); // Set the title in the request

    client.getAnagramsByTitle(request, {}, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err.message);
        setError(err.message);
        return;
      }

      // Parse the response
      const data = response.toObject(); // Convert response to a JavaScript object
      setJsonData(data.anagramsList || []); // Set the anagrams data in state
    });
  };

  return (
    <div >
      <h1 className="heading">Question Finder</h1>
      <div className="inputdiv">
        <input
          type="text"
          className="textinput"
          placeholder="Type here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="findbutton"
          onClick={fetchData}
        >
          Search
        </button>
      </div>
      {error && <p className="">{error}</p>}
      <div className="">
        {jsonData.map((anagram, index) => (
          <div key={index} className="serverdata">
            <p>Type: {anagram.type}</p>
            <p>Title: {anagram.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;