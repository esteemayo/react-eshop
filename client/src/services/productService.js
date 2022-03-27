import http from './httpService';

const apiEndpoint = '/products';

const productUrl = (id) => {
  return `${apiEndpoint}/${id}`;
};

export function getProducts(category) {
  return http.get(
    category ? `${apiEndpoint}?category=${category}` : apiEndpoint
  );
}

export function getProductById(id) {
  return http.get(productUrl(id));
}

export function getProductBySlug(slug) {
  return http.get(`${apiEndpoint}/details/${slug}`);
}

export function createProduct(data) {
  return http.post(apiEndpoint, data);
}

export function updateProduct(id, data) {
  return http.patch(productUrl(id), data);
}

export function deleteProduct(id) {
  return http.delete(productUrl(id));
}
