import './styles.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { init } from './web3client';

export default function App() {
  let navigate = useNavigate();

  const onConnect = (e) => {
    e.preventDefault();
    init();

    navigate(`/transfer`);
  };
  return (
    <div className='App'>
      <div className='outer'>
        <div className='inner'>
          <form onSubmit={onConnect}>
            <button type='submit'>Connect Here</button>
          </form>
        </div>
      </div>
    </div>
  );
}
