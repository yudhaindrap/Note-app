import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const BASE_URL = 'https://note-app-8r1f.onrender.com';

  const fetchNotes = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/notes`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = Array.isArray(res.data) ? res.data : [];
      setNotes(data);
    } catch (err) {
      toast.error('Sesi login habis, silakan login ulang.');
      localStorage.removeItem('token');
      navigate('/login', { replace: true }); // Hindari tombol back
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/notes`, form, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setForm({ title: '', content: '' });
      toast.success('Catatan berhasil ditambahkan!');
      fetchNotes();
    } catch (err) {
      toast.error('Gagal menambahkan catatan');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/notes/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      toast.info('Catatan dihapus.');
      fetchNotes();
    } catch (err) {
      toast.error('Gagal menghapus catatan');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Berhasil logout');
    navigate('/login', { replace: true }); // replace = blok tombol back
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      fetchNotes();
    }
  }, [fetchNotes, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-100 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 relative transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-600">📒 Dashboard</h2>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline hover:text-red-600"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <input
            type="text"
            placeholder="Judul"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <textarea
            placeholder="Isi catatan"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200"
          >
            ➕ Tambah Catatan
          </button>
        </form>

        <h3 className="text-xl font-semibold text-gray-700 mb-4">📝 Daftar Catatan</h3>
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center">Belum ada catatan.</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note._id}
                className="border border-gray-200 rounded-xl p-4 bg-white shadow-md relative group hover:shadow-lg transition-all duration-200"
              >
                <h4 className="font-bold text-lg text-gray-800">{note.title}</h4>
                <p className="text-gray-600 mt-1 mb-3">{note.content}</p>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="absolute top-3 right-4 text-sm text-red-500 hover:underline hover:text-red-600"
                >
                  ❌ Hapus
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
