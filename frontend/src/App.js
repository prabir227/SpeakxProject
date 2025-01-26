import React, { useState } from 'react';
import { AnagramServiceClient } from './protos/anagram_grpc_web_pb';
import { AnagramRequest } from './protos/anagram_pb';
import "./App.css";

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [jsonData, setJsonData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const maxPageButtons = 5; // Maximum number of pagination buttons to display

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
      setCurrentPage(1); // Reset to the first page on new search
    });
  };

  // Calculate the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jsonData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(jsonData.length / itemsPerPage);

  // Calculate the range of pages to display
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  const displayedPages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div>
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
        {currentItems.map((anagram, index) => (
          <div key={index} className="serverdata">
            <p><span className="colorpurple">Question:</span> {anagram.title}</p>
            <p><span className="colorpurple">Type:</span> {anagram.type}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {displayedPages.map((page) => (
          
          <button
            key={page}
            className={`page-button ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;