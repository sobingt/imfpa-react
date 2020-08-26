import http from "../http";

const getAll = (per_page, page) => {
  return http.get(`/products?per_page=${per_page}&page=${page}`);
};
const getCategory = (per_page, page) => {
  return http.get(`/products?category=156&per_page=${per_page}&page=${page}`);
};
const findById = (id) => {
  return http.get(`/products?include=${id}`);
};
const findByTerm = (search) => {
  return http.get(`/products?search=${search}`);
};
const findByTermInPainting = (search, per_page, page) => {
  return http.get(`/products?category=156&search=${search}&per_page=${per_page}&page=${page}`);
};

export default {
  getAll,
  findByTerm,
  findById,
  getCategory,
  findByTermInPainting
};
