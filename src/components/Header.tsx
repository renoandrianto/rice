import React from 'react'

export default function Header(props) {
  const { charge, charging, online } = props;
  // console.log(props);
  return (
    <div className='header'>
      <h1>RiceCore Lite</h1>
      <div className='status-bar'>
        <div className='status-bar-item'>
          <h4>Robot Status</h4>
          {`${online? "Online":"Offline"}`}
        </div>
        <div className='status-bar-item'>
          <h4>Power</h4>
          {`${charge}%`}
        </div>
        <div className='status-bar-item'>
          <h4>Battery Status</h4>
          {`${charging? "Charging":"Not charging"}`}
        </div>
      </div>
    </div>
  )
}