import {useState, useEffect} from 'react'
// import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if(token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/users/infor', {
                        headers : {Authorization : token}
                    })
                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    // console.log("the result is ", res);

                } catch (error) {
                    alert(error);
                }   
            }
            getUser();
        }
    }, [token])

    const addCart = async (product) => {
        if(!isLogged){
            alert("KINDLY LOGIN FIRST!!");
        }
        const check = cart.every(item => {
            console.log(item);
            return item._id !== product._id;
        })

        // console.log(check);
        if(check){
            setCart([...cart, {
                ...product,
                Quantity : 1
            }])
        }else{
            console.log('Anshuman');
            alert('THESE HAS BEEN ALREADY ADDED TO CART')
        }
    }
  return {
    isLogged : [isLogged, setIsLogged],
    isAdmin : [isAdmin, setIsAdmin],
    addToCart : addCart,
    cart: [cart, setCart]
  }
}

export default UserAPI;