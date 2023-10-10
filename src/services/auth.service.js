import axios from 'axios';

class AuthService {
  async login(email, password) {
    const { data } = await axios.post('/auth/login', {
      email,
      password,
    });

    console.log(data);

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    }

    return data;
  }

  async profile() {
    const { data } = await axios.get('/auth/profile');

    localStorage.setItem('user', JSON.stringify(data));

    return data;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}

export default new AuthService();
