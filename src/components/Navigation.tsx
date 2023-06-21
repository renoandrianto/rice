import React from 'react'
import { useState } from 'react'

export default function Navigation({ destinations, handleNavigation, cancelNavigation, message, atHome }) {
  const [ curDest, setCurDest ] = useState('unselected');
  return(
    <div className='navigation'>
      <h2>Select Destination:</h2>
      <select
        onChange= {e => setCurDest(e.target.value)}>
        <option value={'unselected'} key={'unselected'}>Not selected</option>
        {Object.keys(destinations).map(function(key) {
          // console.log(key);
          return <option value={key} key={key}>{destinations[key].name}</option>
        })}
      </select>
      <div className="go-cancel">
        <button disabled={!atHome} className="button go-button" onClick={(() => handleNavigation(curDest))}>Go</button>
        <button className="button cancel-button" onClick={cancelNavigation}>Cancel</button>
      </div>
      <div className="navigation-message">
        <h4>Message</h4>
        <p>{message}</p>
      </div>
    </div>
  )
}