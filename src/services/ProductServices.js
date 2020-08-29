import http from "../http";

const getAllProducts = (per_page, pageNumber) => {
  return http.get(`/products?per_page=${per_page}&page=${pageNumber}`);
};
const getProductByCategory = (per_page, pageNumber) => {
  return http.get(
    `/products?category=156&per_page=${per_page}&page=${pageNumber}`
  );
};

const findByTerm = (search) => {
  return http.get(`/products?search=${search}`);
};
const findByTermInPainting = (search, per_page, page) => {
  return http.get(
    `/products?category=156&search=${search}&per_page=${per_page}&page=${page}`
  );
};

const get = (id) => {
  return http.get(`/products/${id}`);
};

// const create = (data) => {
//   return http.post("/products", data);
// };

// const update = (id, data) => {
//   return http.put(`/products/${id}`, data);
// };

// const remove = (id) => {
//   return http.delete(`/products/${id}`);
// };
const removeVariation = (id, variations) => {
  return http.delete(
    `/wp-json/wc/v3/products/${id}/variations/batch`,
    variations
  );
};

// const removeAll = () => {
//   return http.delete(`/products`);
// };

const findById = (id) => {
  return http.get(`/products?include=${id}`);
};

export default {
  getAllProducts,
  get,
  findByTerm,
  findById,
  getProductByCategory,
  findByTermInPainting,
  removeVariation,
};
