import React from 'react'
import Navigation from './Navigation'
import Image from './Image'
import Lid from './Lid'
import Header from './Header'
import {useState, useEffect} from 'react'

function Main() {
  const url = 'http://localhost:5173'
  const statusUrl = '/api/status'
  const lidPath = '/api/lid'
  const waypointsPath = '/api/map/waypoint'
  const navPath = '/api/nav/goal'
  const cancelPath = '/api/nav/cancel'
  const [ robotState, setRobotState ] = useState([]);
  const [ destinations, setDestinations ] = useState({});
  const [ message, setMessage ] = useState("");
  const [ atHome, setAtHome ] = useState(true);

  useEffect(() => {
    fetchRobotState();
    fetchWaypoints();
  }, [])
  
  // useEffect(() => {
  //   console.log(robotState);
  // }, [robotState]);

  useEffect(()=> {
    if(!atHome) {
      if (robotState.lid == "close") {
        setMessage("Returning home...")
        handleNavigation("ADESqX9j_h6ujP4n");
      } else {
        setMessage("I have an item for you. Please take it and close the lid to send me back home!")
      }
    } else {
      if (robotState.lid =="open") {
        setMessage("Put in your item and close the lid.");
      } else{
        setMessage("I'm home! Please put in your item and select a destination.");
      }
    }

  }, [robotState.lid])

  const fetchRobotState = () => {
    // console.log("FETCH INVOKED");
    fetch(url+statusUrl)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      setRobotState(data);
    })
    .catch(error => {
      console.error('Error fetching data', error);
    })
  }

  const fetchWaypoints = () => {
    fetch(url+waypointsPath)
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
      setDestinations(data);
    }).catch(error => {
      console.error('Error fetching destinations', error);
    })
  }

  const handleLidButton = (lid) => {
    console.log("lid button invoked", lid)
    setMessage((lid=="close")?"Closing lid...":"Opening lid...");
    if (!atHome && lid=="close") {
      console.log("Auto return triggered");
    }
    fetch(url + lidPath, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({lid: lid})
    })
    .then(response => {
      if (response.ok) {
        fetchRobotState();
      }
    })
    .catch(error => {
      console.error('Error updating data:', error);
      setMessage((lid=="close") ? "Error during losing lid":"Error during opening lid");
    });
  }

  const handleNavigation = (dest) => {
    console.log("Dest button invoked", dest);
    if (atHome) {
      setMessage("Delivering item...");
    } else{
      setMessage("Returning home...");
    }
    if (robotState.lid =='open') {
      setMessage("Close the lid first!");
    }
    else if (dest == 'unselected') {
      setMessage("Please select your destination!");
    }
    else {
      fetch(url + navPath, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({waypoint: dest})
      })
      .then(response => response.json())
      .then(data => {
        if (data.result == "success") {
          console.log("Arrived");
          if (dest == "ADESqX9j_h6ujP4n") {
            setMessage("I'm home. Please put in your item and select a destination!")
            setAtHome(true);
            fetchRobotState();
          } else{
            setAtHome(false);
            handleLidButton("open");
          }
        } else if (data.result == "cancelled") {
          console.log("Cancelled")
        }
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
    }
  }

  const cancelNavigation = () => {
    console.log("Cancel button invoked")
    setMessage("Cancelling deliery...");
    fetch(url + cancelPath, {
      method: "POST",
    })
    .then(response => {
      if (response.ok) {
        console.log("Cancelled")
        setMessage("Delivery cancelled");
      }
    })
    .catch(error => {
      console.error('Error updating data:', error);
    });
  }

  return (
    <div>
      <Header charge = {robotState.charge} charging = {robotState.charging} online = {robotState.online}/>
      <div className="content">
        <Lid lid={robotState.lid} handleLidButton={handleLidButton} atHome={atHome}/>
        <Navigation destinations={destinations} handleNavigation={handleNavigation} cancelNavigation={cancelNavigation} message ={message} atHome={atHome}/>
      </div>
    </div>
  )
}

export default Main