const express = require('express');
const dotenv = require('dotenv');
const usersRoutes = require('./routes/users.router');
const mapRoutes = require('./routes/map.router');
const prestationsRoutes = require('./routes/prestations.router');
const typePrestationsRoutes = require('./routes/typePrestations.router');
const standsRoutes = require('./routes/stands.router');
const loginRoutes = require('./routes/authentication.router');
const panierRoutes = require('./routes/panier.router');
dotenv.config();
const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*'  // Autorise les requêtes de toutes les origines
}));

app.use(express.json());
app.use("/api/panier", panierRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/map", mapRoutes);
app.use("/api/login",loginRoutes);
app.use("/api/prestations",prestationsRoutes);
app.use("/api/typePrestations",typePrestationsRoutes);
app.use("/api/stands",standsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}); // npm start