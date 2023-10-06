import axios from 'axios';

class UserService {
  async getAll(query) {
    const { data } = await axios.get('admin/users', { params: query });

    return data;
  }
}

export default new UserService();
