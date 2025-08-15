import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {useLocation} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const EditCategory = () => {

        //const[userid, setUserId] = useState("")
        const [id, setId] = useState('')
        const[foodname, setFoodName]=useState("")
        const[price, setPrice]=useState("")
        const[availability,setAvailability]=useState("")
        const [image, setImage]=useState('')
        const [category, setCategory]=useState('')
        const [message, setMessage]=useState('')
        const location = useLocation();

        const getusers = async (foodid) =>{
          const response = await fetch(`http://localhost:3000/food/getFoodById/${foodid}`)
          const data = await response.json()

          console.log(data)
          setId(data._id)
          setFoodName(data.foodname)
          setPrice(data.price)
          setAvailability(data.availability)
          setCategory(data.category)
          setImage(data.image)
      }

        useEffect(()=>{
          var userid = location.state.id
          getusers(userid)
        },[])

        const update = async() =>{
            const new_user =  {
                //"userid": userid,
                "name": foodname,
                "price": price,
                "availability": availability,
                "category": category
            }
    
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(new_user)
            };
            const response = await fetch(`http://localhost:3000/food/updateFood/${id}`, requestOptions);
            const data = await response.json();
    
            if(data._id!=null)
            {
              toast("Update Success")
                //window.location.href = ""
            }
            else{
              toast("Update failed")
            }
    
        }
  return (
       <div>
      <div>
      <ToastContainer />
      </div>
      <div className="container">
        <h2>update details</h2>
        <div>
          {/* <div className="form-group">
            <label htmlFor="userId">UserId</label>
            <input type="text" className="form-control" id="exampleInputfirstname" value={userid}  onChange={(e) => setUserId(e.target.value)}/>
          </div> */}
          <div className="form-group">
            <label htmlFor="name">Food Name</label>
            <input type="text" className="form-control" id="exampleInputFoodname" value={foodname} onChange={(e) => setFoodName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="price">price</label>
            <input type="text" className="form-control" id="exampleInputPrice" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          {/* <div className="form-group">
            <label htmlFor="Email1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" />
          </div> */}
          <div className="form-group">
            <label htmlFor="Password">Availability</label>
            <input type="availability" className="form-control" id="exampleInputAvailability" value={availability}  onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="Image">Image</label>
            <input type="image" className="form-control" id="exampleInputImage" value={image}  onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="category" className="form-control" id="exampleInputCategory" value={category}  onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" name="create" onClick={update}>Update</button>
          {message}
        </div>
      </div>
    </div>
    
  )
}

export default EditCategory
