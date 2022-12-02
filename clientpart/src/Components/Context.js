import React, { useContext, useEffect, useState } from "react";
import UseSession from "./apiutils";

const UserSessionContext = React.createContext();

export function UserSessionContextProvider({children}) {

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        UseSession()
            .then(res => {
                // console.log('from userContext', res);
                setIsLoading(true);
                setUserData(res);
            })
            .catch(err => {
                setIsLoading(true);
                console.log(err);
            })
    }, [])

    return <UserSessionContext.Provider value={{
        userData,
        setUserData: (data) => {
            setUserData(data)
        }
        }}>
        {isLoading ? children : 'isLoading......'}
    </UserSessionContext.Provider>
}

export const useSessionContext = () => useContext(UserSessionContext);
