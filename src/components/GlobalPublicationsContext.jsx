import { useContext, createContext, useState } from "react";

const PublicationsContext = createContext();

export const ComponentPublicationsContext = ( { children })=>{
    const [ publications, setPublications ] = useState([]);

    return(
        <PublicationsContext.Provider value={{publications, setPublications}}>
            { children }
        </PublicationsContext.Provider>
    )
}

export const useStateForPublications = ()=>{
    return useContext(PublicationsContext);
}