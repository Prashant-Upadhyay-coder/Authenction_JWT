const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const secretKey = 'q1w23e4r5t6y7u8i90@!'; // Random for now

//Hardcode records
const users = [
  { id: 1, email: 'admin@demo.com', password: 'admin', role: 'Admin' },
  { id: 2, email: 'user@demo.com', password: 'user', role: 'User' }
];

app.use(bodyParser.json());
app.use(cors());


app.post('/login', (req, res) => {
  const { email, password, role } = req.body;
 console.log(req.body.email);
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email, password, or role' });
  }

  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
