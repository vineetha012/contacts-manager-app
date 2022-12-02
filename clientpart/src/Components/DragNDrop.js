import React, { useState } from "react";
import './styles/dragNdrop.css'
import { ImportCompletePopup, ImportPopup } from "./importPopups";

export default function DragNDrop({importTrigger, setImportTrigger, setcontacts}) {
    
    const [importCompleteTrigger, setImportCompleteTrigger] = useState(false);

    return <>
        <ImportPopup importTrigger={importTrigger} setImportTrigger={setImportTrigger} setImportCompleteTrigger={setImportCompleteTrigger} />
        {(importCompleteTrigger) ? (<ImportCompletePopup setcontacts={setcontacts} />) : ""}
    </>
}