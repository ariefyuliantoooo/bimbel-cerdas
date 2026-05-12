import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: path.resolve(__dirname, envFile) });
dotenv.config(); // Fallback to .env


const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// API Routes

// 1. Settings
app.get('/api/settings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM settings');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/settings/:id', async (req, res) => {
  const { value } = req.body;
  try {
    const result = await pool.query('UPDATE settings SET value = $1, updated_at = NOW() WHERE id = $2 RETURNING *', [value, req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Services
app.get('/api/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/services', async (req, res) => {
  const { icon, title, description, is_active } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO services (icon, title, description, is_active) VALUES ($1, $2, $3, $4) RETURNING *',
      [icon, title, description, is_active]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/services/:id', async (req, res) => {
  const { icon, title, description, is_active } = req.body;
  try {
    const result = await pool.query(
      'UPDATE services SET icon = $1, title = $2, description = $3, is_active = $4 WHERE id = $5 RETURNING *',
      [icon, title, description, is_active, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM services WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const result = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC LIMIT $1', [limit]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/testimonials', async (req, res) => {
  const { name, occupation, image_url, rating, message, is_approved } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO testimonials (name, occupation, image_url, rating, message, is_approved) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, occupation, image_url, rating, message, is_approved]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/testimonials/:id', async (req, res) => {
  const { name, occupation, image_url, rating, message, is_approved } = req.body;
  try {
    const result = await pool.query(
      'UPDATE testimonials SET name = $1, occupation = $2, image_url = $3, rating = $4, message = $5, is_approved = $6 WHERE id = $7 RETURNING *',
      [name, occupation, image_url, rating, message, is_approved, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/testimonials/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM testimonials WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Team
app.get('/api/team', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/team', async (req, res) => {
  const { name, role, expertise, image_url, is_active } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO team (name, role, expertise, image_url, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, role, expertise, image_url, is_active]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/team/:id', async (req, res) => {
  const { name, role, expertise, image_url, is_active } = req.body;
  try {
    const result = await pool.query(
      'UPDATE team SET name = $1, role = $2, expertise = $3, image_url = $4, is_active = $5 WHERE id = $6 RETURNING *',
      [name, role, expertise, image_url, is_active, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/team/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM team WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Rentals
app.get('/api/rentals', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rentals ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/rentals', async (req, res) => {
  const { name, category, price, description, size, stock, image_url, is_available } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO rentals (name, category, price, description, size, stock, image_url, is_available) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, category, price, description, size, stock, image_url, is_available]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/rentals/:id', async (req, res) => {
  const { name, category, price, description, size, stock, image_url, is_available } = req.body;
  try {
    const result = await pool.query(
      'UPDATE rentals SET name = $1, category = $2, price = $3, description = $4, size = $5, stock = $6, image_url = $7, is_available = $8 WHERE id = $9 RETURNING *',
      [name, category, price, description, size, stock, image_url, is_available, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/rentals/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM rentals WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Registrations
app.get('/api/registrations', async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM registrations';
    let params = [];
    if (status && status !== 'all') {
      query += ' WHERE status = $1';
      params.push(status);
    }
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/registrations', async (req, res) => {
  const { student_name, parent_name, phone, email, school, grade, program } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO registrations (student_name, parent_name, phone, email, school, grade, program) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [student_name, parent_name, phone, email, school, grade, program]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/registrations/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const result = await pool.query('UPDATE registrations SET status = $1 WHERE id = $2 RETURNING *', [status, req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/registrations/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM registrations WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contacts', async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/contacts/:id', async (req, res) => {
  const { is_read } = req.body;
  try {
    const result = await pool.query('UPDATE contacts SET is_read = $1 WHERE id = $2 RETURNING *', [is_read, req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM contacts WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Admin Stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    const services = await pool.query('SELECT COUNT(*) FROM services');
    const rentals = await pool.query('SELECT COUNT(*) FROM rentals');
    const registrations = await pool.query('SELECT COUNT(*) FROM registrations');
    const contacts = await pool.query('SELECT COUNT(*) FROM contacts');
    const team = await pool.query('SELECT COUNT(*) FROM team');
    const testimonials = await pool.query('SELECT COUNT(*) FROM testimonials');

    res.json({
      services: parseInt(services.rows[0].count),
      rentals: parseInt(rentals.rows[0].count),
      registrations: parseInt(registrations.rows[0].count),
      messages: parseInt(contacts.rows[0].count),
      team: parseInt(team.rows[0].count),
      testimonials: parseInt(testimonials.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. User Management (Admin Accounts)
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, created_at FROM users ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Note: In a real app, hash the password. For simplicity as requested:
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at',
      [username, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Login (Simple Auth for Admin)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      // Compare password directly (or use bcrypt if hashed)
      if (user.password === password) {
        res.json({ success: true, user: { id: user.id, username: user.username } });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
