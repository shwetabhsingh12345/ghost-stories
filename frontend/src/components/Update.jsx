import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);
    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setError('');
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };

    const response = await fetch(`http://localhost:5000/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError('');
      navigate('/all');
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="h-screen bg-black text-white flex justify-center">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="container mx-auto px-4 py-8 w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center mb-6">Edit the Ghost Story</h2>
        <form onSubmit={handleUpdate} className="flex flex-col items-center">
          <div className="mb-6 w-full">
            <label className="block text-gray-300 text-sm font-semibold mb-2">Ghost Story</label>
            <div>
              <textarea
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-gray-500 text-gray-200 h-80 resize-none text-center"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4 md:mb-6 w-full">
            <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
              <label className="block text-gray-300 text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-gray-500 text-gray-200 text-sm mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block text-gray-300 text-sm font-semibold mb-2">Advised reader age</label>
              <input
                type="number"
                className="w-full px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-gray-500 text-gray-200 text-sm mb-4"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 text-sm md:text-base"
              >
                Update Ghost Story
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
