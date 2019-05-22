import React from 'react';

const Settings = () => {
  const showDialog = () => {
    window.prompt("wasd", 'wasdwasd');
  }

  return <div className="panel">
    <div onClick={() => {showDialog()}} className="cog">
      <div className="parts">
        <span className="one"></span>
        <span className="two"></span>
        <span className="three"></span>
        <span className="four"></span>
      </div>
    </div>
  </div>
};

export default Settings;
