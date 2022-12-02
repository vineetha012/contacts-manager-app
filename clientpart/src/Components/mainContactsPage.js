import React, { useEffect } from "react"
import Contacts from "./contact-page-components/contactpage"
import Sidebar from "./contact-page-components/sidebar"
import "./contact-page-components/mainpagestyles.css"
import { SessionUtils } from "./SessionUtils"

const MainContactsPage = () => {

    const {ifSessionDoesNotExist} = SessionUtils();

    useEffect(() => {
        ifSessionDoesNotExist('/');
    }, [])

    return (
        <div className="contact-page">
            <div>
                <Sidebar />
            </div>
            <div>
                <Contacts />
            </div>

        </div>
    )
}
export default MainContactsPage