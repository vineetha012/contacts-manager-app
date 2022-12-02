import React  from "react"
import logo from "./images/logoforcm.png"
import logout from "./images/im/logout.png"
import contact from "./images/contact.png"
import {useNavigate} from "react-router-dom"
import { useSessionContext } from "../Context"

const Sidebar=()=>{
    const navigate = useNavigate();
    const {setUserData} = useSessionContext()

    return(
        <div className="side-bar">
            <div>
                <div className="logo">
                    <img src={logo} styles={{height:"30px",width:"50px"}} alt="logoImg"/>
                </div>
                <div className="dash">
                <h3 className="dashboard">Dashboard</h3>
                <div className="total-contactstext">
                <img src={contact} className="contactImg" alt="contactImg"/>
                    <div>Total contacts </div></div>
                </div>
                <footer className="footer">
                    <button className="logoutbtn" onClick={() => {
                            setUserData(null);
                            navigate("/");
                            localStorage.clear("token");
                            localStorage.clear("userEmail");
                            // window.location.reload();
                          }} style={{display:"flex",flexDirection:"row",width:"80%",marginLeft:"10px"}}>
                        <img src={logout} alt="logoutImg"/>
                        <div className="logtext">Logout</div>
                    </button>
                </footer>
            </div>
        </div>
    )
}
export default Sidebar
