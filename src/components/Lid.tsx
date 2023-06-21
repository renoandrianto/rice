import React from 'react'
import Image from './Image'
import {FaBoxOpen} from 'react-icons/fa'
import boxOpen from '../assets/box-opened.png'
import boxClosed from '../assets/box-closed.png'

export default function Lid({ lid, handleLidButton, atHome } ) {
  // const = props;
  // console.log(lid)
  let closed
  if (lid == 'close') {
    closed = true
  } else {
    closed = false
  }
    return (
      <div className="lid">
        <div className="lid-visual">
          {/* <FaBoxOpen size={200} color='grey'/> */}
          <p>Lid Status: {lid}</p>
          <img className="box-img" src={closed ? boxClosed : boxOpen}></img>
        </div>
        <div className="open-close">
          <button className="button open-button" onClick={() => handleLidButton("open")}>
            Open Lid
          </button>
          <button className="button close-button" onClick={() => handleLidButton("close")}>
            Close Lid
          </button>
        </div>
      </div>
    )
}