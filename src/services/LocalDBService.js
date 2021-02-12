function isProductExist(products, newProduct) {
  let index = -1;
  products.forEach((product, productIndex) => {
    if (product.id == newProduct.id) {
      index = productIndex;
      console.log("index", index)
    }
  });
  return index;
}

function isProductSKUExist(products, newProduct) {
  let index = -1;
  products.forEach((product, productIndex) => {
    if (product.sku == newProduct.sku) {
      index = productIndex;
    }
  });
  //console.log(index)
  return index;
}

const init = () => {
  sessionStorage.setItem("userData", "");
  sessionStorage.setItem("products", "");
  sessionStorage.setItem("pageProducts", "");
  sessionStorage.clear();
};
const saveProduct = (product) => {
  var products = sessionStorage.getItem("products");
  products = JSON.parse(products);
  const index = isProductExist(products, product);
  if (index > -1) {
    products[index] = product;
  } else products.push(product);

  sessionStorage.setItem("products", JSON.stringify(products));
};

const appendProducts = (productArray) => {
  if (sessionStorage.getItem("products")) {
    var products = sessionStorage.getItem("products");
    products = JSON.parse(products);
    console.log("before products")
    console.log(products)
    console.log(productArray)
    productArray.forEach((nProduct, i) => {
      const index = isProductExist(products, nProduct);
      if (index > -1) {
        products[i] = nProduct;
      } else products.push(nProduct);
    });
    console.log("after products")
    console.log(products)
    console.log(productArray)
    
    sessionStorage.setItem("products", JSON.stringify(products));
  } else {
    sessionStorage.setItem("products", JSON.stringify(productArray));
  }
};

const saveAllProducts = (products) => {
  sessionStorage.setItem("products", JSON.stringify(products));
};

const getAllProducts = (per_page, pageNumber) => {
  var products = sessionStorage.getItem("products");
  products = JSON.parse(products);
  let startIndex = (per_page - 1) * pageNumber;

  let filteredProduct = [];
  for (let index = startIndex; index < startIndex + per_page; index++) {
    filteredProduct.push(products[index]);
  }
  return filteredProduct;
};

const get = (id) => {
  id = Number(id);
  var products = sessionStorage.getItem("products");
  if (products) {
    products = JSON.parse(products);
    const index = isProductExist(products, { id });
    if (index > -1) {
      return products[index];
    }
  } else return false;
};

const findBySKU = (sku) => {
  var products = sessionStorage.getItem("products");
  //console.log(JSON.parse(products))
  if (products) {
    products = JSON.parse(products);
    const index = isProductSKUExist(products, { sku });
    if (index > -1) {
      return products[index];
    }
  } else return false;
};

export default {
  init,
  getAllProducts,
  get,
  findBySKU,
  saveAllProducts,
  saveProduct,
  appendProducts,
};
