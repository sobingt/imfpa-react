import http from "../http";

const getAll = () => {
  return http.get("/products?per_page=100");
};
const getCategory = () => {
  return http.get("/products?category=156&&per_page=10&&page=5");
};
// const get = (id) => {
//   return http.get(`/products/${id}`);
// };

// const create = (data) => {
//   return http.post("/products", data);
// };

// const update = (id, data) => {
//   return http.put(`/products/${id}`, data);
// };

// const remove = (id) => {
//   return http.delete(`/products/${id}`);
// };

// const removeAll = () => {
//   return http.delete(`/products`);
// };

const findById = (id) => {
  return http.get(`/products?include=${id}`);
};

export default {
  getAll,
  // get,
  // create,
  // update,
  // remove,
  // removeAll,
  findById,
  getCategory,
};
