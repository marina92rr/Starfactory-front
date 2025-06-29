import { useDispatch, useSelector } from "react-redux";
import { FindClient } from "./FindClient"
import { useClientsStore } from "../../hooks/useClientsStore";
import { useCallback, useState } from "react";


export const Navbar = () => {

  

  return (
    <>
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">

        <span className="navbar-brand ms-3">
          <i className="fas"></i>
          &nbsp;
          User
        </span>

       <FindClient/>

        <button className="btn btn-outline-danger ms-auto me-5">
          <i className="fas fa-sign-out-alt"></i>
          &nbsp;
          <span>Salir</span>
        </button>

      </div>





    </>



  )
}
