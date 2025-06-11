

export const AddNewSales = () => {
  return (
    <div className='container-fluid'>
      
      <div className=' d-flex'>
        <div className='col-4' >
          <h3>Añadir Producto</h3>
          
            <input className='rounded-1 border border-secondary-subtle p-2 my-2'
              style={{ outline: 'none',  width: '100%' }} type="text" placeholder='buscar...' />
         
                <div  className="border py-3 my-2 text-start">
                  <div className="d-flex justify-content-between px-3">
                    <strong className='text  '>1 clase/semana</strong>
                    <strong className='text '>25€</strong>
                  </div>

                  <div className="d-flex justify-content-between px-3">
                    <p className='text  '>Hora y media</p>
                    <p className='text '>25€</p>
                  </div>
                  
                </div>
                 <div  className="border py-3 text-start">
                    <div className='text ps-3'>Producto</div>
                </div>
          </div>


        <div className='col-8 ms-4' >
          <h3>Resumen de Venta</h3>
          
          <div className="d-flex flex-column border">
              <div className='d-flex justify-content-between p-3'>
                <strong>Nombre</strong>
                <strong>Precio</strong>
                <strong>IVA</strong>
                <strong>Cantidad Actual</strong>
              </div>
                <div className='d-flex justify-content-between p-3'>
                <div color=''>Nombre</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
