import http from "../http-common";
import httpCommon from "../http-common";

class CustomerDataService {
  getAll() {
    return http.get("/customers");
  }

  get(id) {
    return http.get(`/customers/${id}`);
  }

  getSome(team) {
    return http.get(`/customers?team=${team}`)
  }

  update(id, data) {
    return http.put(`/customers/${id}`, data);
  }


  findByEmail(email) {
    return http.get(`/customers?email=${email}`);
  }
  
  findByFirstName(name) {
    return http.get(`/customers?firstname=${name}`);
  }
  
}

export default new CustomerDataService();