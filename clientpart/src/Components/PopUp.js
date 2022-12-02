import './styles/popup.css'
import React from 'react'

export default function PopUp({children}) {

    return (
        <div className="popup">
            <div className="inner-popup">
                {children}
            </div>
        </div>
     )
}