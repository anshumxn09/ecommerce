import React, {useContext, useState, useEffect} from 'react'
import { GlobalState } from '../../../GlobalState';
import './Review.css';
import axios from 'axios';

const Review = (props) => {
    const [review, setMyData] = useState("");
    const [reload, setReload] = useState(false);
    const [collection, setCollection] = useState([]);
    const state = useContext(GlobalState);
    const [token] = state.token;
    useEffect(() => {
        if(props.userId){
          const getReview = async () => {
            const result = await axios.get('/api/review', {
                headers : {Authorization : token}
            })
            console.log(result.data);
            setCollection(result.data);
          }
          getReview();
         }
    }, [setCollection, token, reload])
    
    const [isLogged] = state.UserAPI.isLogged;
    const addReview = async () => {
        if(isLogged){
            await axios.post('/api/review', {
                user_id: props.userId ,review
            }, {
                headers : {Authorization : token}
            });
            setMyData("");
            setReload(!reload);
        }else{
            alert('Kindly Login First');
        }
    }
  return (
    <>
    <div className='reviewbox'>
    <input type="text" name='data' id='rdata' value={review} onChange={(e) => setMyData(e.target.value)}/>
    <input type="submit" value={"+"} onClick={addReview} className="rsub"/>
    </div>
    <div className="reviewContent">
        {
            collection.map((elem) => {
                if(elem.user_id === props.userId){
                    return (
                        <>
                            <div className="rbox">
                                <h3>{elem.name}</h3>
                                <p>{elem.review}</p>
                            </div>
                        </>
                    )
                }
            })
        }
    </div>
    </>
  )
}

export default Review