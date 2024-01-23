import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ViewStory() {
  const { id } = useParams();
  const [story, setStory] = useState({});
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        // Assuming you want to redirect to the "All Stories" page after deletion
        window.location.href = "/all";

      }
    } catch (error) {
      setError('Error deleting data');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${id}`);
        const result = await response.json();

        if (!response.ok) {
          setError(result.error);
        } else {
          setStory(result);
          setError('');
        }
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full rounded overflow-hidden shadow-lg bg-gray-800 text-white">
        <div className="px-6 py-4">
          <h5 className="font-bold text-xl mb-2 text-blue-500">{story.name}</h5>
          <h6 className="text-gray-400 text-sm mb-1">{story.email}</h6>
          <p className="text-gray-300 text-base mb-2">{story.age}</p>
          <div className="flex justify-center items-center mb-2">
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 mr-2"
            >
              Delete
            </button>
            <Link to={`/${id}`} className="text-blue-500 hover:text-blue-700">
              Edit
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-2">Updated: {story.updatedAt}</p>
          <p className="text-sm text-gray-400">Created: {story.createdAt}</p>
          <p className="text-gray-300 text-base mt-2">{story.story}</p>
        </div>
        <div className="px-6 py-4 flex justify-center">
          <Link to="/all" className="bg-blue-500 text-white px-4 py-2 rounded">
            Back to All Stories
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewStory;
