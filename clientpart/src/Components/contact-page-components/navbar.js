import axios from "axios"
import prof from "./images/prof.png"
import React, { useState } from "react"
import { getContacts } from "../apiutils"

const NavBar = ({ setcontacts }) => {
   
    const localEmail = localStorage.getItem('userEmail')
    let localName = "User";
    if(localEmail) {
        localName = `Welcome ${localStorage.getItem('userEmail').split('@')[0]}`
    }
    const [name] = useState(localName)
    const [email] = useState(localEmail)

    const searchHandle = async (e) => {
        let key = e.target.value
        if (key) {
            await axios.get(`http://localhost:5000/v1/contacts/${key}`,
                {
                    headers:
                        { 'Authorization': localStorage.getItem('token') }
                })
                .then(res => {
                    console.log(res.data.contactlistSearchkey);
                    if (res.data.contactlistSearchkey) {
                        setcontacts([res.data.contactlistSearchkey])
                    }
                    else{
                        setcontacts([])
                    }
                })
                .catch(err => console.log(err))
        } else {
            getContacts()
            .then(res => {
                // console.log(res.data);
                setcontacts(res.data);
                
            })
            .catch(err => console.log(err));

        }

    }
    return (
        <div className="nav-bar">
            <div className="navtext">
                <h3>Total Contacts</h3>
            </div>
            <div className="search-container">
                <i className="fa fa-search icon"></i>
                <input className="input-field" placeholder="Search..." type="text" onChange={searchHandle} />
            </div>
            <div className="profile">
                <div>
                    <img className="profile-img" src={prof} alt='profileImg'/>
                </div>
                <div>
                    <div>{name}</div>
                    <div>{email}</div>
                </div>
            </div>
        </div>
    )
}
export default NavBar;