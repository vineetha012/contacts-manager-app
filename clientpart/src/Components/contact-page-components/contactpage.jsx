import React, { useState } from "react"
import { useEffect } from "react"
import { Buttons, Cardheaders } from "./card"
import NavBar from "./navbar"
import deleted from "./images/im/delete.png"
import edited from "./images/edit.png";
import { getContacts } from "../apiutils"

const Contacts = () => {

    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [ischecked, setischecked] = useState([])

    //-----------------------------------pagination-----------
    const [contacts, setcontacts] = useState([])
    const [currentpage, setcurrentpage] = useState(1)//1,2,3
    const [itemperpage, setitemperpage] = useState(10)//how many items per page
    const [pagenumberlimit, setpagenumberlimit] = useState(2)
    const [maxpagenumberlimit, setmaxpagenumberlimit] = useState(2)//
    const [minpagenumberlimit, setminpagenumberlimit] = useState(0)


    useEffect(() => {
        getContacts()
            .then(res => {
                // console.log(res.data);
                setcontacts(res.data);
            })
            .catch(err => console.log(err));

    }, [])

    const pages = []
    let currentItem;
    const indexoflatitem = currentpage * itemperpage;
    const indexoffirstitem = indexoflatitem - itemperpage;
    if(contacts) {
        for (let i = 1; i < Math.ceil(contacts.length / itemperpage); i++) {
            pages.push(i)
        }
        currentItem = contacts.slice(indexoffirstitem, indexoflatitem)
    }

   
    

    const handlenext = () => {
        setcurrentpage(currentpage + 1)
        if (currentpage + 1 > maxpagenumberlimit) {
            setmaxpagenumberlimit(maxpagenumberlimit + pagenumberlimit)
            setminpagenumberlimit(minpagenumberlimit + pagenumberlimit)
        }
    }
    const handleprev = () => {
        setcurrentpage(currentpage - 1)
        if ((currentpage - 1) % pagenumberlimit === 0) {
            setmaxpagenumberlimit(maxpagenumberlimit - pagenumberlimit)
            setminpagenumberlimit(minpagenumberlimit - pagenumberlimit)
        }
    }
    let pageIncrementbtn = null
    if (pages.length > maxpagenumberlimit) {
        pageIncrementbtn = <li onclick={handlenext}>&hellip;</li>
    }
    let pageDecrementbtn = null
    if (pages.length > maxpagenumberlimit) {
        pageDecrementbtn = <li onclick={handleprev}>&hellip;</li>
    }

    const handlecheckbox = (e) => {
        const { value, checked } = e.target
        if (value === 'all') {
            currentItem.map((contact) => {
                contact.checked = true
            })
        }
        else {
            console.log(value);
            if (checked) {
                setischecked([...ischecked, value])
            }
            else {//uncheck
                setischecked(ischecked.filter((e) => e !== value))//finding the value of
            }
        }


    }

    const allDElete = (e) => {
        setDeleteTrigger(true);
        setischecked([e.currentTarget.id]);
    }

    const handleclick = (event) => {
        setcurrentpage(Number(event.target.id))
    }


    const renderconts = (conts) => {
        return (<>
        {(contacts) ? contacts.map((contact, index) => {
            let len = contacts.length
            let val = index
            return (
                //individual  checkbox 
                <tr key={index}>
                    <td className="tdinp">
                        <input type="checkbox" value={contact._id} checked={contact.ischecked}
                            onChange={(e) => {
                                handlecheckbox(e)
                            }}/></td>
                    <td className="td">{contact.name}</td>
                    <td className="td">{contact.designation}</td>
                    <td className="td">{contact.company}</td>
                    <td className="td">{contact.industry}</td>
                    {/* //tooltip */}
                    <td className="tdemail">
                        <div className="tooltip">
                            {contact.email}
                            <span className="tooltiptext"> {contact.email}</span>
                        </div>
                    </td>
                    <td className="td">{contact.phoneNumber}</td>
                    <td className="td">{contact.country}</td>
                    {/* action buttons */}
                    <td className="td" style={{ display: "flex", flexDirection: "row" }}>
                        <button id={contact._id} onClick={(e) => allDElete(e)}><img className="actionimage" src={deleted} alt="deleteImg" /></button>
                        <button><img src={edited} alt="editImg" className="actionimage"/></button>
                    </td>
                </tr>
            )
        }) : "" } </>)
    }
    // onClick={() => setDeleteTrigger(true)}

    const renderpagenumbers = pages.map(pgnumber => {
        if (pgnumber < maxpagenumberlimit + 1 && pgnumber > minpagenumberlimit) {
            return (
                <li key={pgnumber} id={pgnumber} onClick={handleclick} className={currentpage == pgnumber ? "active" : null} >
                    {pgnumber}
                </li>
            )
        } else {
            return null
        }
    })


    return (
        <div className="main">
            <div className="nav">
            <NavBar  setcontacts={setcontacts}/>
            </div>
            <div className="contacts">
                <div className="btn-container">
                    <Buttons isChecked={ischecked} deleteTrigger={deleteTrigger} setDeleteTrigger={setDeleteTrigger} setcontacts={setcontacts}/>
                </div>
                <table>
                    <thead>
                        <Cardheaders setDeleteTrigger={setDeleteTrigger}
                            handlecheckbox={handlecheckbox}
                            currentItem={currentItem} />
                    </thead>
                    <tbody>
                        {
                            renderconts(currentItem)
                        }
                    </tbody>


                </table>

            </div>
            <div className="pagenumbers-container">
                <ul className="pagenumbers">
                    <li>
                        <button onClick={handleprev}
                            disabled={currentpage == pages[0] ? true : false}
                        >prev</button>
                    </li>
                    {pageDecrementbtn}
                    {renderpagenumbers}
                    {pageIncrementbtn}
                    <li>
                        <button onClick={handlenext} disabled={currentpage == pages[pages.length-1] ? true : false}>next</button>

                    </li>

                </ul>
            </div>

        </div>

    )
}
export default Contacts