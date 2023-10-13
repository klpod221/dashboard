import axios from 'axios';

class UsersService {
  async getAll(query) {
    const { data } = await axios.get('admin/users', { params: query });
    return data;
  }

  async get(id) {
    const { data } = await axios.get(`admin/users/${id}`);
    return data;
  }

  async create(data) {
    const response = await axios.post('admin/users', data);
    return response.data;
  }

  async update(id, data) {
    const response = await axios.put(`admin/users/${id}`, data);
    return response.data;
  }

  async updateStatus(id, status = '') {
    const response = await axios.put(`admin/users/${id}/status`, { status });
    return response.data;
  }
}

export default new UsersService();
