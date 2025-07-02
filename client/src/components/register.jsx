import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://note-app-8r1f.onrender.com/api/auth/register',
        form
      );
      toast.success(res.data.msg || 'Pendaftaran berhasil!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Gagal mendaftar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Form Section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Sign up</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold transition"
            >
              SIGN UP
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-green-500 hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-blue-500 text-white flex flex-col justify-center items-center p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Selamat Datang!</h2>
          <p className="mb-6">Masuk ke akun Anda untuk mengakses catatan Anda.</p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
