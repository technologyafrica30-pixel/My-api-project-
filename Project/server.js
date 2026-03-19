const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(express.static('.')); // hii inaserve files kwenye folda lako

// Dummy users
const users = [
  { id: 1, username: 'test', password: bcrypt.hashSync('123', 8) }
];

// Endpoint ya login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
  res.json({ token });
});

const port = 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
