// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// // import "react.tostify/dist/ReactToastify.css";
// import { toast, ToastContainer } from "react-toastify";
// import { useCart } from './CartContext';
// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories]=useState([]);
//   const navigate = useNavigate();
//   const {updateCartCount} =useCart();
//   const getProducts = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/food/getAllFoods`);
//       const data = await response.json();
//       console.log(13, data)
//       setProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   }
//   const getCategory = async () =>{
//     const response = await fetch(`http://localhost:3000/category/getAllCategory`)
//     const data = await response.json()
//     console.log(22, data)
//     setCategories(data)
//   }
//   const searchByCategories= async(id)=>{
//     const requestOptions = {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//   };
//        const response = await fetch(`http://localhost:3000/food/getAllFoodsByCategory/${id}`, requestOptions);
//         const data = await response.json();
//         setProducts(data); 
//   }

//   const searchProducts = async (keyword) => {
//     if (keyword.length === 0) {
//       getProducts(); 
//     }
//     else{
//       const response = await fetch(`http://localhost:3000/food/searchFood/${keyword}`);
//       const data = await response.json();
//       setProducts(data);
//     }  
//   };

  
// const handleAddToCart = async (pid) => {
//  // const navigate = useNavigate(); 

//   const userid = localStorage.getItem("id");

//   if (!userid) {
//     navigate("/login");
//   } else {
//     const cartData = {
//       userid: userid,
//       foodid: pid,
//       quantity: "1",
//     };
// console.log(61, cartData)
//     try {
//       const response = await fetch("http://localhost:3000/cart/addCart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(cartData),
//       });
//       const data = await response.json();

//       if (data._id!=null) {
//         toast.success("Added to cart!");
//         updateCartCount();
//       } else {
//         toast.error(data.message || "Failed to add to cart.");
//       }

//     } catch (error) {
//       toast.error("Server error. Please try again later.");
//       console.error(error);
//     }
//   }
// };

//   useEffect(()=>{
//     getProducts();
//     getCategory();
//   }, [])



//   return (
//     <div>
//       <ToastContainer/>
//        <div className="container-xxl py-5">
//     <div className="container">
//       <div className="row g-0 gx-5 align-items-end">
//         <div className="col-lg-6">
//           <div className="section-header text-start mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: 500}}>
//             <h1 className="display-5 mb-3">Our Products</h1>
//             {/* <p>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p> */}
//           </div>
//           {/* search bar for products */}
//           <input
//                 type="text"
//                 className="form-control w-50 d-inline-block" placeholder="Search product..." onChange={(e) => searchProducts(e.target.value)}
//           />
//           <br />
//           <br />
//         </div>
        
//         <div className="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
//           <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
//             <li className="nav-item me-2">
//               <a  className="btn btn-outline-primary border-2 active" data-bs-toggle="pill" onClick={getProducts}>All</a>
//             </li>
//             {
//               categories.map((c)=>
//                 <li className="nav-item me-2">
//                 <a className="btn btn-outline-primary border-2 active" data-bs-toggle="pill" onClick={(e)=> searchByCategories(c._id)}>{c.category}</a>
//                 </li>
//               )
//             } 
//           </ul>
          
//         </div>
//       </div>
//       <div className="tab-content">
//         <div id="tab-1" className="tab-pane fade show p-0 active">
//           <div className="row g-4">
//            {
//             products.map((p)=>
//               <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
//                   <div className="product-item">
//                     <div className="position-relative bg-light overflow-hidden">
//                       <img className="img-fluid w-100" src={p.image} style={{width:'20%'}} alt />
//                       <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
//                     </div>
//                     <div className="text-center p-4">
//                       <a className="d-block h5 mb-2" href>{p.foodname}</a>
//                       <span className="text-primary me-1">{p.price}</span>
//                       <span className="text-body text-decoration-line-through">$29.00</span>
//                     </div>
//                     <div className="d-flex border-top">
//                       <small className="w-50 text-center border-end py-2">
//                         <a className="text-body" href><i className="fa fa-eye text-primary me-2" />View detail</a>
//                       </small>
//                       <small className="w-50 text-center py-2">
//                         <button onClick={(e) => handleAddToCart(p._id)} className="text-body border-0 bg-transparent">
//                           <i className="fa fa-shopping-bag text-primary me-2" />Add to cart
//                         </button>
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//             )
//            }

//             <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
//               <a className="btn btn-primary rounded-pill py-3 px-5" href>Browse More Products</a>
//             </div>
//           </div>
//         </div>
       
       
//       </div>
//     </div>
//   </div>
     
//     </div>

//   )
// }

// export default Product

import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from './CartContext'; // Adjust path as needed

const url = import.meta.env.VITE_BASE_URL;
const Product = () => {
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [displayedProducts, setDisplayedProducts] = useState([]); // Products currently shown
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const navigate = useNavigate();
  const { updateCartCount } = useCart();
  
  const PRODUCTS_PER_PAGE = 4;

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/food/getAllFoods`);
      const data = await response.json();
      console.log(13, data)
      setAllProducts(data);
      setDisplayedProducts(data.slice(0, PRODUCTS_PER_PAGE));
      setCurrentPage(1);
      setHasMore(data.length > PRODUCTS_PER_PAGE);
      setSearchKeyword('');
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const getCategory = async () => {
    try {
      const response = await fetch(`${url}/category/getAllCategory`)
      const data = await response.json()
      console.log(22, data)
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  const searchByCategories = async (id) => {
    try {
      setLoading(true);
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(`${url}/food/getAllFoodsByCategory/${id}`, requestOptions);
      const data = await response.json();
      setAllProducts(data);
      setDisplayedProducts(data.slice(0, PRODUCTS_PER_PAGE));
      setCurrentPage(1);
      setHasMore(data.length > PRODUCTS_PER_PAGE);
      setSelectedCategory(id);
      setSearchKeyword('');
    } catch (error) {
      console.error('Error fetching products by category:', error);
    } finally {
      setLoading(false);
    }
  }

  const searchProducts = async (keyword) => {
    try {
      setLoading(true);
      setSearchKeyword(keyword);
      
      if (keyword.length === 0) {
        await getProducts();
        return;
      }

      const response = await fetch(`${url}/food/searchFood/${keyword}`);
      const data = await response.json();
      setAllProducts(data);
      setDisplayedProducts(data.slice(0, PRODUCTS_PER_PAGE));
      setCurrentPage(1);
      setHasMore(data.length > PRODUCTS_PER_PAGE);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;

    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const nextProducts = allProducts.slice(startIndex, endIndex);

    if (nextProducts.length > 0) {
      setDisplayedProducts(prev => [...prev, ...nextProducts]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < allProducts.length);
    } else {
      setHasMore(false);
    }
  }, [currentPage, allProducts, loading, hasMore]);

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    
    // Load more products when user is 300px away from bottom
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    
    if (distanceFromBottom <= 300) {
      loadMoreProducts();
    }
  }, [loadMoreProducts, loading, hasMore]);

  useEffect(() => {  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleAddToCart = async (pid) => {
    const userid = localStorage.getItem("id");

    if (!userid) {
      navigate("/login");
    } else {
      const cartData = {
        userid: userid,
        foodid: pid,
        quantity: "1",
      };
      console.log(61, cartData)
      try {
        const response = await fetch(`${url}/cart/addCart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartData),
        });

        const data = await response.json();

        if (data._id != null) {
          toast.success("Added to cart!");
          updateCartCount();
        } else {
          toast.error(data.message || "Failed to add to cart.");
        }

      } catch (error) {
        toast.error("Server error. Please try again later.");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getProducts();
    getCategory();
  }, [])

  return (
    <div>
      <ToastContainer />
      <div className="container-xxl py-5 mt-5">
        <div className="container">
          <div className="row g-0 gx-5 align-items-end">
            <div className="col-lg-6">
              <div className="section-header text-start mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 500 }}>
                <h1 className="display-5 mb-3">Our Products</h1>
              </div>
              {/* search bar for products */}
              <input
                type="text"
                className="form-control w-50 d-inline-block"
                placeholder="Search product..."
                value={searchKeyword}
                onChange={(e) => searchProducts(e.target.value)}
              />
              <br />
              <br />
            </div>

            <div className="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
              <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
                <li className="nav-item me-2">
                  <a className={`btn btn-outline-primary border-2 ${!selectedCategory ? 'active' : ''}`} 
                     data-bs-toggle="pill" 
                     onClick={getProducts}
                     style={{ cursor: 'pointer' }}>
                    All
                  </a>
                </li>
                {
                  categories.map((c) =>
                    <li key={c._id} className="nav-item me-2">
                      <a className={`btn btn-outline-primary border-2 ${selectedCategory === c._id ? 'active' : ''}`} 
                         data-bs-toggle="pill" 
                         onClick={(e) => searchByCategories(c._id)}
                         style={{ cursor: 'pointer' }}>
                        {c.category}
                      </a>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
          
          <div className="tab-content">
            <div id="tab-1" className="tab-pane fade show p-0 active">
              <div className="row g-4">
                {
                  displayedProducts.length > 0 ?
                    displayedProducts.map((p, index) =>
                      <div key={`${p._id}-${index}`} className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="product-item">
                          <div className="position-relative bg-light overflow-hidden">
                            <img className="img-fluid w-100" src={p.image} style={{ width: '20%', height: '280px', paddingTop: '50px' }} alt={p.foodname} />
                            <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                          </div>
                          <div className="text-center p-4">
                            <a className="d-block h5 mb-2" href="#" onClick={(e) => e.preventDefault()}>{p.foodname}</a>
                            <span className="text-primary me-1">₹ {p.price}</span>
                            <span className="text-body text-decoration-line-through">₹ 29.00</span>
                          </div>
                          <div className="d-flex border-top">
                            <small className="w-50 text-center border-end py-2">
                              <a className="text-body" href="#" onClick={(e) => e.preventDefault()}>
                                <i className="fa fa-eye text-primary me-2" />View detail
                              </a>
                            </small>
                            <small className="w-50 text-center py-2">
                              <button onClick={(e) => handleAddToCart(p._id)} className="text-body border-0 bg-transparent">
                                <i className="fa fa-shopping-bag text-primary me-2" />Add to cart
                              </button>
                            </small>
                          </div>
                        </div>
                      </div>
                    )
                    :
                    !loading &&
                    <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                      <h3>No Products are available...!!!</h3>
                    </div>
                }
              </div>

              {/* Loading indicator */}
              {loading && (
                <div className="col-12 text-center mt-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading more products...</p>
                </div>
              )}

              {/* End of results indicator */}
              {!hasMore && displayedProducts.length > 0 && !loading && (
                <div className="col-12 text-center mt-4">
                  <p className="text-muted">You've reached the end of the products!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
