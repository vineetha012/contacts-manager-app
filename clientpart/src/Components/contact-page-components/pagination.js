import React from "react";

const Pagination = ({ data,pageHandler }) => {
    console.log(Math.ceil(data.length / 10))
    let pageNumbers = []
    for (let i = 0; i <Math.ceil(data.length / 10); i++) {
        pageNumbers.push(i+1)
        
    }
    return (
        <div style={{display:"flex",flexDirection:"row"}}>
            <center>
                {pageNumbers.map(page => <button className="pagebutton" 
                onClick={()=>pageHandler(page)} >{page}</button>)}
            </center>
        </div>
    )
}
export default Pagination
{/* <li key={number} id={number}  onClick={handleclick}>
                {number}
            </li> */}