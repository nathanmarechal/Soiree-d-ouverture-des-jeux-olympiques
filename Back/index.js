const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const http = require('http');
const { Server } = require("socket.io");

// Import des routes
const usersRoutes = require('./routes/users.router');
const rolesRoutes = require('./routes/roles.router');
const droitsRoutes = require('./routes/droits.router');
const role_droitRoutes = require('./routes/role_droit.router');
const mapRoutes = require('./routes/map.router');
const prestationsRoutes = require('./routes/prestations.router');
const typePrestationsRoutes = require('./routes/typePrestations.router');
const standsRoutes = require('./routes/stands.router');
const loginRoutes = require('./routes/authentication.router');
const panierRoutes = require('./routes/panier.router');
const commandeRoutes = require('./routes/commande.router');
const statistiquesRoutes = require('./routes/statistiques.router');
const typeEmplacementLogistiqueRoutes = require('./routes/typeEmplacementLogistique.router');
const emplacementLogistiqueRoutes = require('./routes/emplacementLogistique.router');
const homePageRoutes = require('./routes/homePage.router');
const avisRoutes = require('./routes/avis.router');
const messagerieRoutes = require('./routes/messagerie.router');

dotenv.config();
const app = express();
const cors = require('cors');

// Middleware
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'SuperMegaUltraSecretDeLaSaeDeDingos',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,  // 2 heures
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  },
}));


// Routes
app.use("/api/panier", panierRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/droits", droitsRoutes);
app.use("/api/role-droit", role_droitRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/map", mapRoutes);
app.use("/api/login",loginRoutes);
app.use("/api/prestations",prestationsRoutes);
app.use("/api/typePrestations",typePrestationsRoutes);
app.use("/api/stands",standsRoutes);
app.use("/api/homePage",homePageRoutes);
app.use("/api/statistiques",statistiquesRoutes);
app.use("/api/commande", commandeRoutes);
app.use("/api/type-emplacement-logistique", typeEmplacementLogistiqueRoutes);
app.use("/api/emplacement-logistique", emplacementLogistiqueRoutes);
app.use("/api/avis", avisRoutes);
app.use("/api/messagerie",messagerieRoutes);

// Configuration de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API cérémonie ouverture des JO',
      version: '1.0.0',
      description: 'API du site de la cérémonie d\'ouverture des jeux olympiques 2024',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Création du serveur HTTP
const server = http.createServer(app);

// Initialisation de Socket.IO
const io = new Server(server, {
  path: '/socket.io',
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
  console.log('A user has connected');

  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });

  socket.on('send_message', (msg) => {
    io.emit('new_message', msg);
  });
});

// Démarrage du serveur
server.listen(process.env.PORT, () => {
  console.log(`Server and Socket.IO running on port ${process.env.PORT}`);
});

