import React, { useEffect, useMemo, useState } from 'react'
import { useProductStore } from '../../../hooks/useProductStore';
import { useQuotaStore } from '../../../hooks/useQuotaStore';
import { useClientsStore } from '../../../hooks/useClientsStore';
import { TransactNewSales } from './sales/TransactNewSales';
import { TransactModalSales } from './sales/TransactModalSales';


export const AddNewSales = () => {

  const { products, starLoadingProducts } = useProductStore();
  const { quotas, starLoadingQuotas } = useQuotaStore();
  const { activeClient } = useClientsStore();

  //Seleccionar productos al carrito
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    starLoadingProducts();
    starLoadingQuotas();
  }, []);


  //Añadir productos/cuotas al carrito
  const handleAddProduct = (product, type) => {
    setSelectedProducts(prev => [
      ...prev,
      {
        ...product,
        type,
        idProduct: type === 'product' ? product.idProduct : null,
        idQuota: type === 'quota' ? product.idQuota : null,
        discount:null // Descuento inicial
      }
    ]);
  };

  //Descuento
  const handleDiscountChange = (index, value) => {
  setSelectedProducts(prev =>
    prev.map((product, i) =>
      i === index
        ? { ...product, discount: parseFloat(value) || 0 }
        : product
    )
  );
};

const totalAmount = useMemo(() => {
  return selectedProducts.reduce((total, product) => {
    const discountAmount = parseFloat(product.discount) || 0;
    const finalPrice = product.price - discountAmount;
    return total + finalPrice;
  }, 0).toFixed(2);
}, [selectedProducts]);

  const handleRemoveProduct = (indexToRemove) => {
    setSelectedProducts(prev => prev.filter((_, i) => i !== indexToRemove));
  };



  return (
    <div className='container-fluid  mt-5'>
      <div className='py-5 d-flex justify-content-between'>
        <h1>Añadir producto</h1>
      </div>

      <div className=' d-flex'>
        <div className='col-3' >
          <div >
            <input type="text" className='form-control' placeholder='Buscar' />
          </div>
          <table className="table">
            <tbody>
              <tr>
                <td >
                  {products.map((product, i) => {
                    return (
                      <div
                        key={i} className="border p-4 m-2 text-start"
                        onClick={() => handleAddProduct(product, 'product')}
                        style={{ cursor: 'pointer' }}
                      >

                        <div className='d-flex justify-content-between'>
                          <div className='text  fw-medium'>{product.name}</div>
                          <div className='text-end  fw-medium'>{product.price}€</div>
                        </div>
                        <div className='text-secondary'>{product.description}</div>
                      </div>
                    );
                  })}
                  {quotas.map((quota, i) => (
                    <div
                      key={i}
                      className="border p-4 m-2 text-start"
                      onClick={() => handleAddProduct(quota, 'quota')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className='d-flex justify-content-between'>
                        <div className='text fw-medium'>{quota.name}</div>
                        <div className='text-end fw-medium'>{quota.price}€</div>
                      </div>
                      <div className='text-secondary'>{quota.description}</div>
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='col-8 ms-4' >
          <div className=' justify-content-between align-items-center p-3'>
            <h2 className='text-muted'>Resumen de Venta</h2>
          </div>
          <table className="table border">
            <tbody>
              {selectedProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-muted text-center">
                    <div className='text-muted h-100'>
                      No hay Productos en esta categoría
                    </div>
                    
                  </td>
                </tr>
              ) : (
                selectedProducts.map((product, i) => (
                  <tr key={i}>
                    <td className=' border p-4 m-2 text-start'>
                      <div className='d-flex  justify-content-between'>
                        <div className='col-10' >
                          <div className='d-flex justify-content-between'>
                            <div className='text fw-medium'>{product.name}</div>
                            <div className='input-group w-25'>
                              <input 
                                type="number" 
                                className='form-control' 
                                placeholder='Descuento'
                                value={product.discount ?? ''}
                                onChange={(e) => handleDiscountChange(i, e.target.value)} />
                              <span className='input-group-text'>%</span>
                            </div>
                            <div className='text-end  fw-medium'>{product.price}€</div>
                          </div>

                          <div className='text-secondary'>{product.description}</div>
                        </div>
                        
                        <div>
                          <button
                            className='btn btn-outline-secondary '
                            onClick={() => handleRemoveProduct(i)}>
                            <i className="bi bi-pencil-square "></i>

                          </button>
                          <button
                            className='btn btn-outline-danger'
                            onClick={() => handleRemoveProduct(i)}>
                            <i className="bi bi-trash heading"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              <tr>
                <td className='border p-4 m-2 text-start' colSpan={5}>
                  <div className="d-flex text-end justify-content-end align-items-center  p-3">
                    <h4 className="fw-medium px-2">Total a pagar: </h4>
                    <h4 className="fw-medium">
                      {totalAmount} €
                    </h4>
                  </div>
                  <div className='d-flex justify-content-end'>
                    <TransactNewSales/>
                    <TransactModalSales 
                      selectedProducts={selectedProducts}
                      totalAmount={totalAmount} 
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}
