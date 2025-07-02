import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://note-app-8r1f.onrender.com/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success('Login berhasil!', { autoClose: 2000 });
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login gagal');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Sign in</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition"
            >
              SIGN IN
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Daftar di sini
            </Link>
          </p>
        </div>

        <div className="bg-green-500 text-white flex flex-col justify-center items-center p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Halo, Teman!</h2>
          <p className="mb-6">Daftarkan diri anda dan mulai gunakan layanan kami segera.</p>
          <Link
            to="/register"
            className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
