import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiTest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('ApiTest component mounted. Fetching data...');
    
    axios.get('http://localhost:8080/api/foods', {
      headers: { 'X-User-Id': '1' }
    })
    .then(response => {
      console.log('✅ [ApiTest] Success:', response.data);
      setData(response.data);
    })
    .catch(err => {
      console.error('❌ [ApiTest] Error:', err);
      setError(err);
    });

  }, []); // 空の依存配列で、マウント時に1回だけ実行

  if (error) {
    return (
      <div>
        <h1>Error Occurred</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>API Test Successful!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ApiTest;