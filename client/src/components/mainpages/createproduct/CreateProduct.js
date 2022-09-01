import React, { useState, useContext, useEffect} from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import {useNavigate, useParams} from 'react-router-dom';

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description :"",
  category: "",
  _id : ""
};

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const param = useParams();
  const [products, setProducts] = state.productAPI.products;
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if(param.id){
      setOnEdit(true);
      products.forEach((product) => {
          if(product._id === param.id){
            setProduct(product);
            setImages(product.images);
          }
      })
    }else{
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const [categories] = state.CategoryAPI.categories;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [token] = state.token;
  const [callBack, setCallback] = state.productAPI.callBack;

  const styleUpload = {
    display: images ? "block" : "none",
  };

  const uploadSettings = {
    border: images
      ? "1px solid rgb(105, 32, 105)"
      : "4px dashed rgb(105, 32, 105)",
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        return alert("YOU'RE NOT AN ADMIN!!!!");
      }

      const file = e.target.files[0];
      if (!file) return alert("FILE NOT EXISTS!!!");

      if (file.size > 1024 * 1024) return alert("FILE SIZE IS TOO LARGE!!!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("Invalid FILE TYPE");

      // console.log(file);
      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const result = await axios.post("/api/uploads", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(result.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleDestroy = async (e) =>{
    e.preventDefault();
    try {
        if(!isAdmin) return alert("YOU'RE NOT AN ADMIN!!!!");
        setLoading(true);
        await axios.post('/api/destroy', {public_id:images.public_id}, {
            headers : {Authorization : token}
        })
        setLoading(false);
        setImages(false);
    } catch (error) {
        alert(error.response.data.message);
    }
  }

  const handleChangeInput = async (e) => {
    const {name, value} = e.target;
    setProduct({
        ...product,
        [name]:value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!isAdmin) return alert('You\'re not an ADMIN!!!!');
      if(!images) return alert('Image of the product is required!!!!');
      if(!onEdit) {
      await axios.post('/api/products', {
        ...product,
        images
      }, {
        headers : {Authorization : token}
      })
      alert('PRODUCT ADDED!!');
    }else{
      await axios.put(`/api/products/${product._id}`, {
        ...product,
        images
      }, {
        headers : {Authorization : token}
      })
      alert('UPDATED PRODUCT!!');
    }
      setCallback(!callBack);
      setImages(false);
      setProduct(initialState);
      navigate('/');
    
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className="create_product">
      <div className="upload" style={uploadSettings}>
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            {" "}
            <Loading />{" "}
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product ID: </label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={product._id}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price(Rupees): </label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description: </label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows={"5"}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content: </label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            rows={"7"}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="category">Categories: </label>
          <select name="category" id="category" value={product.category} onChange={handleChangeInput}>
            <option value="">Please select a category.</option>
            {categories.map((category) => {
              return (
                <option value={category.name} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit">{onEdit ?"UPDATE PRODUCT":"CREATE PRODUCT"}</button>
      </form>
    </div>
  );
};

{
  /* <div style={{textAlign:"center", marginTop:"10px"}}><button type='submit'>CREATE PRODUCT</button></div> */
}
export default CreateProduct;
