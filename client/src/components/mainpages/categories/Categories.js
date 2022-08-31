import React , {useState, useContext}from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios';

const Categories = () => {
    const state = useContext(GlobalState);
    const [categories, setCategories] = state.CategoryAPI.categories;
    const [category, setCategory] = useState('');
    const [token] = state.token;
    const [callBack, setCallback] = state.CategoryAPI.callBack;
    const [edit, setEdit] = useState(false);
    const [id, setID] = useState(false);

    const createCategory = async (e) => {
        e.preventDefault();
        try {
            if(!edit){
                const res = await axios.post('/api/category',{name:category},{
                    headers : {Authorization : token}
                })
                alert(res.data.message);
            }else{
                const res = await axios.put(`/api/category/${id}`,{name:category},{
                    headers : {Authorization : token}
                })
                alert(res.data.message);
            }
            setEdit(false);
            setCategory('');
            setCallback(!callBack);
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    const editCategory = async (id, name) => {
        try {  
            setID(id);
            setCategory(name);
            setEdit(true);

        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers : {Authorization : token}
            })

            alert(res.data.message);
            setCategory('');
            setCallback(!callBack);
        } catch (error) {
            alert(error.response.data.message)
        }
    }

  return (
    <div className="box">
    <div className='categories'>
        <form onSubmit={createCategory}>
            <label htmlFor="category">Category...</label>
            <input type="text" name="category" id="category" value={category} required onChange={e => setCategory(e.target.value)}/>

            <button type="submit">{edit ? "Update" : "Save"}</button>
        </form>

        <div className="col">
            {
                categories.map((category) => {
                   return (<div className="row" key={category._id}>
                        <p>{category.name}</p>
                        <div>
                            <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                            <button onClick={() => deleteCategory(category._id)}>Delete</button>
                        </div>
                    </div>
                   )
                })
            }
        </div>
    </div>
    </div>
  )
}

export default Categories;