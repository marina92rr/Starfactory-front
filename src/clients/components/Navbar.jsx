

export const Navbar = () => {
  return (
    <>
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">

        <span className="navbar-brand ms-3">
          <i className="fas"></i>
          &nbsp;
          User
        </span>

        <input
          className='rounded-1 bg-dark-subtle p-1 m-1'
          style={{ border: 'none', outline: 'none' }}
          type="text"
          id="foundName"
          placeholder='Buscar...'
        />

        <button className="btn btn-outline-danger ms-auto me-5">
          <i className="fas fa-sign-out-alt"></i>
          &nbsp;
          <span>Salir</span>
        </button>

      </div>





    </>



  )
}
