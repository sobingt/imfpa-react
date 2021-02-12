import http from "../http";

const getAllProducts = (per_page, pageNumber) => {
  return http().get(`/products?per_page=${per_page}&page=${pageNumber}`);
};
const getProductByCategory = (per_page, pageNumber) => {
  return http().get(
    `/products?category=156&per_page=${per_page}&page=${pageNumber}`
  );
};

const findByTerm = (search) => {
  return http().get(`/products?search=${search}`);
};

const findBySKU = (sku) => {
  return http().get(`products?sku=${sku}&filter[meta]=true`);
  
};

const findByTermInPainting = (search, per_page, page) => {
  return http().get(
    `/products?category=156&search=${search}&per_page=${per_page}&page=${page}`
  );
};

const get = (id) => {
  return http().get(`/products/${id}`);
};

const removeVariation = (id, variations) => {
  return http().post(`products/${id}/variations/batch`, variations);
};

const findById = (id) => {
  return http().get(`/products?include=${id}`);
};

///wp-json/wc/v3/
export default {
  getAllProducts,
  get,
  findByTerm,
  findBySKU,
  findById,
  getProductByCategory,
  findByTermInPainting,
  removeVariation,
};
