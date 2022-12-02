import React, { useState } from "react";
import deleted from "./images/im/delete.png"
import importd from "./images/im/v1.png"
import matte from "./images/im/matte.png"
import filter from "./images/filter.png";
import DragNDrop from '../DragNDrop';
import { DeleteConfirmationPopup, DeletedPopup } from '../deletePopups';

export function Cardheaders() {
    return (
        <tr>
            <td > <input type="checkbox" /></td>
            <td  >

                <div className="texth"><div>Name</div> <img src={matte} alt="double arrow" /></div></td>
            <td>
                <div className="texth">
                <div>Designation</div> <img src={matte} alt="double arrow" />
                </div>
                </td>
            <td>
                <div className="texth">
                    <div>Company</div> <img src={matte} alt="double arrow" />
                </div>
            </td>
            <td>
                <div className="texth">
                    <div>Industry</div> <img src={matte} alt="double arrow" />
                </div>
            </td>
            <td>
                <div className="texth">
                    <div>Email</div> <img src={matte} alt="double arrow" />
                </div>
            </td>
            <td>
                <div className="texth">
                    <div>Phone number </div><img src={matte} alt="double arrow" />
                </div>
            </td>
            <td>
                <div className="texth">
                    <div>Country</div> <img src={matte} alt="double arrow" />
                </div>
            </td>
            <td className="text">Action</td>
        </tr>
    )
}

export function Buttons({ deleteTrigger, setDeleteTrigger, isChecked, setcontacts}) {

    const [importTrigger, setImportTrigger] = useState(false);
    const [deleteCompleteTrigger, setDeleteCompleteTrigger] = useState(false);

    return (
        <div className="header-btns">
            <div>
                <div className="left-btn">

                    <button className="btn left">
                        <i className="fa fa-calendar" aria-hidden="true"></i>

                        . select date .



                    </button>

                    <button className="btn left">
                        <img src={filter} alt="filterImg" />
                        Filter .
                    </button>
                    <DragNDrop setcontacts={setcontacts} importTrigger={importTrigger} setImportTrigger={setImportTrigger} />

                    {(deleteTrigger) ? <DeleteConfirmationPopup isChecked={isChecked} setDeleteTrigger={setDeleteTrigger} setDeleteCompleteTrigger={setDeleteCompleteTrigger} /> : ""}

                    {(deleteCompleteTrigger) ? <DeletedPopup setcontacts={setcontacts}/> : ""}
                    <button className="btn right">Export</button>
                    <button className="btn right" onClick={() => setImportTrigger(true)}><img src={importd} alt="importImg" /> <div>Import</div></button>
                    <button className="btn right" onClick={() => setDeleteTrigger(true)}><img src={deleted} alt="deleteImg" /><div>Delete</div> </button>




                </div>


            </div>
        </div>


    )
}
export function Li() {
    return (<li>
        vinee
    </li>)
}