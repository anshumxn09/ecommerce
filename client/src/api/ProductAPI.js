import  {useState, useEffect} from 'react'
import axios from 'axios';

const ProductAPI = () => {
    const [products, setProducts] = useState([]);
    const [callBack, setCallback] = useState(false);
    useEffect(() => {
        const getProducts = async () => {
          const res = await axios.get("/api/products");
          setProducts(res.data.products);
        };
        getProducts();
      }, [callBack]);
   
  return {
        products : [products, setProducts],
        callBack : [callBack, setCallback],
  }
}

export default ProductAPI;