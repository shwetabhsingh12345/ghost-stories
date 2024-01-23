import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Read() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  async function getData() {
    const response = await fetch('http://localhost:5000');
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setData(result);
      setError('');
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setError('Data Deleted Successfully');
      setTimeout(() => {
        setError('');
        getData();
      }, 1000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-screen bg-black text-white">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-4xl font-extrabold text-center mb-6 py-6 text-red-500">All Ghost Stories</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((ele) => (
          <div key={ele._id} className="max-w-md rounded overflow-hidden shadow-lg bg-gray-800 text-white mb-4">
            <div className="px-6 py-4">
              <Link to={`/view/${ele._id}`} className="text-blue-500 hover:text-blue-700">
                <h5 className="font-bold text-xl mb-2 truncate">{ele.name}</h5>
              </Link>
              <p className="text-gray-300 text-base mb-4 truncate">{ele.story}</p>
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <h6 className="text-gray-400 text-sm mb-1 truncate">Email: {ele.email}</h6>
                  <p className="text-gray-300 text-base truncate">Advised reader age: {ele.age}</p>
                </div>
                <div className="flex">
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Read;
