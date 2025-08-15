import React, { useEffect, useState } from "react";
import axios from 'axios';

const AddProducts = () => {
  const [foodname, setFoodname] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(false);
  const [image, setImage] = useState(null);
  const [image_id, setImage_id] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([])
  const [category, setCategory]=useState("");
   
   const getCategory = async () =>{
    const response = await fetch(`http://localhost:3000/category/getAllCategory`)
    const data = await response.json()

    setCategories(data)
  }

  useEffect(()=>{
    getCategory()
  }, [])

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "FoodDeliveryApp"); // Replace with your actual preset

    try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/dycrd5npm/image/upload`,
            formData
        );

        console.log("response: ", res.data);
        setPreview(res.data.secure_url)
        setImage(res.data.secure_url);
        setImage_id(res.data.public_id);
    } catch (error) {
        console.error("Error uploading image: ", error);
    }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const product = {
        foodname: foodname,
        price: price,
        image: image,
        availability:availability,
        image_id: image_id,
        availability: availability === true, // Convert to boolean
        category: category
    };

    console.log(60, product);

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    };

    const response = await fetch("http://localhost:3000/food/addFood", requestOptions);
    const data = await response.json();

    if (data._id != null) {
        setMessage("Uploaded Successfully");
    } else {
        setMessage("Failed");
    }                   
  };
  

  return (
    <div className="container-fluid">
      <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
            <h3 className="text-primary text-center mb-3">Add Food Item</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="foodname" placeholder="Food Name" value={foodname} onChange={(e) => setFoodname(e.target.value)} required />
                <label htmlFor="foodname">Food Name</label>
              </div>
              
                
                {/* <select class="form-select mb-3" aria-label="Default select example">
                      <option selected="">Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                  </select> */}
                  <select className="form-select mb-3" onChange={(e)=> setCategory(e.target.value)}>
                      <option value="">Select a category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.category}</option>
                      ))}
                  </select>
               

              <div className="form-floating mb-3">
                <input type="number" className="form-control" id="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <label htmlFor="price">Price</label>
              </div>

              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="availability" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
                <label className="form-check-label" htmlFor="availability">Available</label>
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">Upload Image</label>
                <input type="file" className="form-control" id="image" accept="image/*" onChange={handleImageChange} required />
              </div>

              {preview && (
                <div className="mb-3 text-center">
                  <img src={preview} alt="Preview" className="img-fluid rounded" style={{ maxHeight: "100px" }} />
                </div>
              )}

              <button type="submit" className="btn btn-primary py-3 w-100 mb-3">Add Food</button>
              {message}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
