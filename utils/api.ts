import axios from "axios";

const BASE_URL = "https://67f7183e42d6c71cca6403bd.mockapi.io/v1/api/products";

export const fetchProducts = () => axios.get(BASE_URL);

export const fetchProductById = (id: string) => axios.get(`${BASE_URL}/${id}`);

export const addProduct = (data: any) =>
  axios.post(BASE_URL, data, { headers: { "Content-Type": "application/json" } });

export const updateProduct = (id: string, data: any) =>
  axios.put(`${BASE_URL}/${id}`, data, { headers: { "Content-Type": "application/json" } });

export const deleteProduct = (id: string) =>
  axios.delete(`${BASE_URL}/${id}`);
