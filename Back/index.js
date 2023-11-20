const express = require('express');
const dotenv = require('dotenv');
const usersRoutes = require('./routes/users.router');
const mapRoutes = require('./routes/map.router');
const loginRoutes = require('./routes/login.router');
dotenv.config();
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*'  // Autorise les requêtes de toutes les origines
}));

app.use(express.json());
app.use("/api/users", usersRoutes);
app.use("/api/map", mapRoutes);
app.use("/api/login",loginRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}); // npm startx