import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const url = import.meta.env.VITE_BASE_URL;
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await fetch(`${url}/food/getAllFoods`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`${url}/food/deleteFood/${id}`, { method: 'DELETE' });
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const editProduct = (id) => {
    navigate('/editProducts', { state: { id } });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100 bg-secondary rounded align-items-center justify-content-center mx-0">
        <div className="col-md-12 text-center">
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Manage Products</h6>
            <table className="table table-bordered text-white">
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Price</th>
                  <th>Availability</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.foodname}</td>
                    <td>${product.price}</td>
                    <td>{product.availability ? 'Available' : 'Not Available'}</td>
                    <td>
                      <img src={product.image} style={{width:'20%'}}  />
                    </td>
                    <td>
                      <button onClick={() => editProduct(product._id)} className="btn btn-outline-success mx-1">Edit</button>
                      <button onClick={() => deleteProduct(product._id)} className="btn btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;