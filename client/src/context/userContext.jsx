import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({children}){

    const [userEmail, setUserEmail] = useState("");

    return(
        <UserContext.Provider value={{userEmail,setUserEmail}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(){
    return useContext(UserContext);
}