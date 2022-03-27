import http from './httpService';

const apiEndpoint = '/checkout/payment';

export function stripePayment(data) {
  return http.post(apiEndpoint, data);
}
