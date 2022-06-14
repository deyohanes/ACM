import axios from 'axios'
import {
    GET_REQUEST,
    AUCTION_SUCCESS,
} from '../constants/auctionConstrants'
export const getid   =  async (dispatch) =>{
    try {
        dispatch({
            type: GET_REQUEST,
          })
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    
      const { data } = await axios.post(
        '/api/auction/all',
        config
      )
    
      dispatch({
        type: AUCTION_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('auctions', JSON.stringify(data))
    } catch (error) {
      
    }
    }