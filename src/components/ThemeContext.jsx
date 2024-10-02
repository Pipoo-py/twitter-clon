import { useContext, createContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeComponent= ( { children })=>{
    const [ dark, setDark ] = useState([]);

    return(
        <ThemeContext.Provider value={{dark, setDark}}>
            { children }
        </ThemeContext.Provider>
    )
}


export const useContextOfTheme = ()=>{
    return useContext(ThemeContext);
}