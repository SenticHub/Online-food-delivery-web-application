// import React, { useState } from "react";
// import axios from 'axios';

// const AddCategory = () => {
//   const [foodname, setFoodname] = useState("");
//   const [price, setPrice] = useState("");
//   const [availability, setAvailability] = useState(false);
//   const [category, setCategory] = useState(""); 
//   const [image, setImage] = useState(null);
//   const [image_id, setImage_id] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "FoodDeliveryApp"); 

//     try {
//         const res = await axios.post(
//             `https://api.cloudinary.com/v1_1/dycrd5npm/image/upload`,
//             formData
//         );

//         setPreview(res.data.secure_url);
//         setImage(res.data.secure_url);
//         setImage_id(res.data.public_id);
//     } catch (error) {
//         console.error("Error uploading image: ", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const product = {
//         foodname: foodname,
//         price: price,
//         category: category, // Include category
//         image: image,
//         availability: availability,
//         image_id: image_id,
//     };

//     console.log(product);

//     const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(product)
//     };

//     const response = await fetch("http://localhost:3000/food/addFood", requestOptions);
//     const data = await response.json();

//     if (data._id != null) {
//         setMessage("Uploaded Successfully");
//     } else {
//         setMessage("Failed");
//     }                   
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
//         <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
//           <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
//             <h3 className="text-primary text-center mb-3">Add Food Item</h3>
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//               <div className="form-floating mb-3">
//                 <input type="text" className="form-control" id="foodname" placeholder="Food Name" value={foodname} onChange={(e) => setFoodname(e.target.value)} required />
//                 <label htmlFor="foodname">Food Name</label>
//               </div>

//               <div className="form-floating mb-3">
//                 <input type="number" className="form-control" id="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
//                 <label htmlFor="price">Price</label>
//               </div>

//               <div className="form-floating mb-3">
//                 <select className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
//                   <option value="">Select Category</option>
//                   <option value="Appetizer">Appetizer</option>
//                   <option value="Main Course">Main Course</option>
//                   <option value="Dessert">Dessert</option>
//                   <option value="Beverage">Beverage</option>
//                 </select>
//                 <label htmlFor="category">Category</label>
//               </div>

//               <div className="form-check mb-3">
//                 <input type="checkbox" className="form-check-input" id="availability" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
//                 <label className="form-check-label" htmlFor="availability">Available</label>
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="image" className="form-label">Upload Image</label>
//                 <input type="file" className="form-control" id="image" accept="image/*" onChange={handleImageChange} required />
//               </div>

//               {preview && (
//                 <div className="mb-3 text-center">
//                   <img src={preview} alt="Preview" className="img-fluid rounded" style={{ maxHeight: "100px" }} />
//                 </div>
//               )}

//               <button type="submit" className="btn btn-primary py-3 w-100 mb-3">Add Food</button>
//               {message}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

//export default AddCategory;
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const url = import.meta.env.VITE_BASE_URL;
const AddCategory = () => {
  //const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const add = async() =>{

    alert(category)

    const new_category =  {
        "category": category
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new_category)
    };
    const response = await fetch(`${url}/category/addCategory`, requestOptions);
    const data = await response.json();

    console.log(142,data)

    if(data._id!=null)
    {
      toast("Addded sucessfully")
        //window.location.href = ""
    }
    else{
      toast("Failed")
    }

}
 
  return (
    <>
      <div>
          <ToastContainer />
      </div>
   
    <div className="container-fluid">
      <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
            <h3 className="text-primary text-center mb-3">Add Categories</h3>
            <div >
              <div>
                    <h2>Add Category</h2>
                    <input type="text" className="form-control" id="exampleInputfirstname" name="categories" onChange={(e) => setCategory(e.target.value)}/>

                    <button type="submit" className="btn btn-primary" onClick={add} name="create">Add</button>
                  {/* <ul>{categories.map((cat, index) => (<li key={index}>{cat}</li>))}</ul> */}
              </div>
              {/* <div className="form-floating mb-3">
                <input type="number" className="form-control" id="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <label htmlFor="price">Price</label>
              </div> */}

              {/* <div className="form-floating mb-3">
                <select className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="">Select Category</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                </select>
                <label htmlFor="category">Category</label>
              </div> */}
{/* 
              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="availability" checked={availability} onChange={(e) => setAvailability(e.target.checked)} />
                <label className="form-check-label" htmlFor="availability">Available</label>
              </div> */}

              {/* <div className="mb-3">
                <label htmlFor="image" className="form-label">Upload Image</label>
                <input type="file" className="form-control" id="image" accept="image/*" onChange={handleImageChange} required />
              </div> */}

              {/* {preview && (
                <div className="mb-3 text-center">
                  <img src={preview} alt="Preview" className="img-fluid rounded" style={{ maxHeight: "100px" }} />
                </div>
              )} */}

              {/* <button type="submit" className="btn btn-primary py-3 w-100 mb-3">Add Food</button>
              {message} */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}


export default AddCategory
