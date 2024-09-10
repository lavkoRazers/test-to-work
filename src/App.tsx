import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserTable from './features/users/UserTable';




const App: React.FC = () => {
  return (
      <div className="App">
        <UserTable />
      </div>
  );
};

export default App;