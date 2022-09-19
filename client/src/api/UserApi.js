import {useState, useEffect} from 'react'
// import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [callBack, setCallBack] = useState(false);

    useEffect(() => {
        if(token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/users/infor', {
                        headers : {Authorization : token}
                    })
                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    
                    setCart(res.data.cart);

                } catch (error) {
                    alert(error);
                }   
            }
            getUser();
        }
    }, [token])

    useEffect(() => {
        if(token){
            const getHistory = async () => {
                // console.log('Anshuman');
                const res = await axios.get('/users/history', {
                    headers : {Authorization : token}
                })
                setHistory(res.data);
            }
            getHistory()
        }
    }, [token, callBack])

    const addCart = async (product) => {
        console.log(product);
        if(!isLogged){
            alert("KINDLY LOGIN FIRST!!");
            return;
        }
        const check = cart.every(item => {
            console.log(item);
            return item._id !== product._id;
        })

        
        if(check){
            setCart([...cart, {
                ...product,
                Quantity : 1
            }])
            console.log('hello');
            await axios.patch('/users/addtocart', {
                cart : [...cart, {
                    ...product,
                    Quantity : 1
                }]
            }, {
                headers : {Authorization : token}
            })
        }else{
            console.log('Anshuman');
            alert('THESE HAS BEEN ALREADY ADDED TO CART')
        }
    }
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    addToCart: addCart,
    cart: [cart, setCart],
    history: [history, setHistory],
    callBack: [callBack, setCallBack]
  }
}

export default UserAPI;