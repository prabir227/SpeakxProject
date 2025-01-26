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
  const maxPageButtons = 5;

  
  const client = new AnagramServiceClient("http://13.202.8.121:8080");

  
  const fetchData = () => {
    const request = new AnagramRequest();
    request.setTitle(inputValue); 

    client.getAnagramsByTitle(request, {}, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err.message);
        setError(err.message);
        return;
      }

      
      const data = response.toObject();
      setJsonData(data.anagramsList || []); 
      setCurrentPage(1); 
    });
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jsonData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const totalPages = Math.ceil(jsonData.length / itemsPerPage);


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