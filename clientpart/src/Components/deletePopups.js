import React, { useEffect } from "react";
import PopUp from "./PopUp";
import deleteImg from './images/deleteImg.svg'
import completedImg from './images/completedImg.svg'
import { deleteContacts, getContacts } from "./apiutils";

export function DeleteConfirmationPopup({setDeleteTrigger, setDeleteCompleteTrigger, isChecked}) {

    const okDeleteHandler = async () => {
        await deleteContacts(isChecked)
            .then(res => {
                console.log(res);
                setDeleteTrigger(false)
                setDeleteCompleteTrigger(true);
                // document.location.reload();
                setTimeout(() => {
                    setDeleteCompleteTrigger(false);
                }, 2000);
            })
        
    }    

    return <PopUp>
        <div className='deleteConfirmation'>
            <div className="img-container">
                <img src={deleteImg} alt="importImg"/>
            </div>
            <h3>Delete Contacts</h3>
            <p>Sure you want to delete these contacts</p>
            <button className="close-btn" onClick={() => setDeleteTrigger(false)}>Cancel</button>
            <button className="close-btn" 
                onClick={okDeleteHandler}>Ok</button>

        </div>
    </PopUp>
}

export function DeletedPopup({setcontacts}) {

    useEffect(() => {
        getContacts()
            .then(res => {
                setcontacts(res.data);
            })
    })

    return <PopUp>
        <div className='deletecomplete'>
            <div className="img-container">
                <img className="checkedImg" src={completedImg} alt="importCompleteImg"/>
            </div>
            <h3>Deleted Contacts</h3>
        </div>
    </PopUp>
}

