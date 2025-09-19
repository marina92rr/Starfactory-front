import { use } from "react"
import { FindClient } from "./FindClient"
import { useAuthStore } from "../../hooks/useAuthStore"



export const Navbar = () => {

  const {user, startLogout} = useAuthStore();
  
  return (
    <>
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">

        <span className="navbar-brand ms-3">
          <i className="fas"></i>
          &nbsp;
          {user.name}
        </span>

       <FindClient/>

        <button 
          className="btn btn-outline-danger ms-auto me-5"
          onClick={startLogout}>
          <i className="fas fa-sign-out-alt"></i>
          &nbsp;
          <span>Salir</span>
        </button>
      </div>
    </>



  )
}
