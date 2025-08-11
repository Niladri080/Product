import { createContext, useState } from "react";

export const UserContext=createContext();
export const UserProvider=({children})=>{
  const [user,setuser]=useState(()=>{
    const stored=localStorage.getItem("user");
    return stored?JSON.parse(stored):null;
  })
  return (
    <UserContext.Provider value={{user,setuser}}>
      {children}
    </UserContext.Provider>
  )
}
