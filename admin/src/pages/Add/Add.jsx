import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
 import { ToastContainer, toast } from 'react-toastify';


const Add = ({uri}) => {
     // ✅ use http, not https (unless you set up SSL)
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    // ✅ Handles input changes
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    // ✅ Handles form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            alert("Please upload an image!");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${uri}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(null);
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                {/* Image Upload */}
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                    />
                </div>

                {/* Product Name */}
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name='name'
                        placeholder='Type here'
                        required
                    />
                </div>

                {/* Product Description */}
                <div className="product-discription flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder='Write Content here'
                        required
                    />
                </div>

                {/* Category & Price */}
                <div className="add-category-price flex-col">
                    <div className="add-category">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure veg">Pure veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p> Product Price </p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name='price'
                            placeholder='$20'
                            required
                        />
                    </div>
                </div>

                <button className='btn' type='submit'>Add</button>
                
            </form>

        </div>
    )
}

export default Add
