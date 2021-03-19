import axios from 'axios';

export const readMoney = async (token) => axios.get(`${process.env.REACT_APP_API}/read-money`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const createMoney = async (data, token) => axios.post(`${process.env.REACT_APP_API}/create-money`, data, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const myMoney = async (token) => axios.get(`${process.env.REACT_APP_API}/total-money`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});