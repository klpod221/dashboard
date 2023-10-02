import axios from "axios";

class AuthService {
  async login(email, password) {
    const { data } = await axios.post('/auth/login', {
      email,
      password
    });

    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  };

  async profile() {
    const { data } = await axios.get('/auth/profile');
    return data;
  };

  logout() {
    localStorage.removeItem('token');
  };
}

export default new AuthService();
