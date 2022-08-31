import React, {useState, useContext} from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';

const initialState = {
    product_id : '',
    title : '',
    price : 0,
    description : 'z lc alv a;dvn jdabvuavbjd vdabv;d vjkasd vuiab vlajsd v;kjda vi;asd bvalsd vasdsvd vlasdj vadinvasd jvaisdb vasdjkcv ;',
    content : "njvbvlyuyadc",
    category : ''
}

const CreateProduct = () => {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.CategoryAPI.categories;
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);

    const styleUpload = {
        display : images ? "block" : "none",
    }

    const uploadSettings = {
        border : images ? "1px solid rgb(105, 32, 105)" : "4px dashed rgb(105, 32, 105)",
    }

  return (
    <div className='create_product'>
        <div className="upload" style={uploadSettings}>
            <input type="file" name='file' id='file_up'/>
            <div id="file_img" style={styleUpload}>
                <img src="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/raftaar_2.jpg" alt="" />
                <span>X</span>
            </div>
        </div>

        <form>
            <div className="row">
                <label htmlFor="product_id">Product ID: </label>
                <input type="text" name="product_id" id="product_id" required value={product.product_id}/>
            </div>

            <div className="row">
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" id="title" required value={product.title}/>
            </div>

            <div className="row">
                <label htmlFor="price">Price: </label>
                <input type="number" name="price" id="price" required value={product.price}/>
            </div>

            <div className="row">
                <label htmlFor="description">Description: </label>
                <textarea type="text" name="description" id="description" required value={product.description} rows={"5"}/>
            </div>

            <div className="row">
                <label htmlFor="content">Content: </label>
                <textarea type="text" name="content" id="content" required value={product.content} rows={'7'} />
            </div>

            <div className="row">
                <label htmlFor="category">Categories: </label>
                <select name="category" id="category" value={product.category}>
                    <option value="">Please select a category.</option>
                    {
                        categories.map(category => {
                            return (
                                <option value={category._id} key={category._id}>{category.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <button type='submit'>CREATE PRODUCT</button>
        </form>
    </div>
  )
}

{/* <div style={{textAlign:"center", marginTop:"10px"}}><button type='submit'>CREATE PRODUCT</button></div> */}
export default CreateProduct;