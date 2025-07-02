const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const auth = require('../middleware/auth');

// GET semua catatan milik user
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: 'Gagal mengambil data' });
  }
});

// POST tambah catatan baru
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ msg: 'Isi semua field' });

  try {
    const newNote = new Note({
      user: req.user.id,
      title,
      content
    });
    const saved = await newNote.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ msg: 'Gagal menambahkan catatan' });
  }
});

// DELETE catatan
router.delete('/:id', auth, async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ msg: 'Catatan dihapus' });
  } catch (err) {
    res.status(500).json({ msg: 'Gagal menghapus' });
  }
});

// PUT update catatan
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Gagal mengupdate catatan' });
  }
});

module.exports = router;
