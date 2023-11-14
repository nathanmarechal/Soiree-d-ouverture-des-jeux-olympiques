const express = require('express');
const dotenv = require('dotenv');
const usersRoutes = require('./routes/users.router');
dotenv.config();
const app = express();

app.use(express.json());
app.use("/users", usersRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}); // npm start