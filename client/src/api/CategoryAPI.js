import React, {useState, useEffect} from 'react'
import axios from 'axios';

const CategoryAPI = (token) => {
    const [categories, setCategories] = useState([]);
    const [callBack, setCallback] = useState(false);

    useEffect(()=>{
        const getCategories = async () => {
            const res = await axios.get('/api/category');
            setCategories(res.data);
        }

        getCategories();
    }, [callBack])
  return {
    categories : [categories, setCategories],
    callBack : [callBack, setCallback],
  }
}

export default CategoryAPI