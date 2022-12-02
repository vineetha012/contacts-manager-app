import axios from "axios";

export const postContacts = async (contactArr) => {

    const res = await fetch('http://localhost:5000/v1/contacts', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(contactArr)
    })

    return res.json();
}

export async function deleteContacts(arrayOfContactsId) {
    const res = await fetch('http://localhost:5000/v1/contacts', {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(arrayOfContactsId)
    })

    return res.json();
}

export const getContacts = async () => {
    try {
        const res = await axios.get(
            'http://localhost:5000/v1/contacts', 
            {headers: 
                {'Authorization': localStorage.getItem('token')}
            })

        return res.data
    } catch (e) {
        console.log(e)
    };
}

export const searchContact = async (key) => {
    const res = await axios.get(`http://localhost:5000/v1/contacts/${key}`, 
            {headers: 
                {'Authorization': localStorage.getItem('token')}
            })
            return res
}

export default function UseSession() {

    const sessionId = localStorage.getItem('token');
    // console.log(sessionId);

    return new Promise ((resolve, reject) => {
        if(!sessionId) {
            reject(new Error("User not Signed In"))
        }
        return fetch(`http://localhost:5000/v1/signin/get-current-user?sessionId=${sessionId}`)
            .then(res => res.json())
            .then(data => {
                if(data) {
                    resolve(data);
                }
                reject(new Error("User not Signed In"))
            })
            .catch(err => {
                reject(err);
            });

    })

}