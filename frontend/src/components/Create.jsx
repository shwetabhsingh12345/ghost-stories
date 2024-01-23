import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { name, email, age };

    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      body: JSON.stringify(addUser),
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
      console.log(result);
      setError('');
      setName('');
      setEmail('');
      setAge(0);
      navigate('/all');
    }
  };

  return (
    <div className="h-screen bg-black text-white flex justify-center ">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="container mx-auto px-4 py-8 w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center mb-6">Share Your Ghost Story</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
                className="w-full bg-red-600 text-white p-1 rounded-md hover:bg-red-700 text-sm md:text-base"
              >
                Submit Ghost Story
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
