import React, {useContext} from 'react'
import { GlobalState } from '../../../GlobalState'

const LoadMore = () => {
    const state = useContext(GlobalState);
    const [page, setPage] = state.productAPI.page;
    const [result, setResult] = state.productAPI.result;

  return (
    <div className='load_more'>
        {
            result < page * 9 ? "" : <button onClick={() => setPage(page+1)}>LOAD MORE</button>
        }
    </div>
  )
}

export default LoadMore