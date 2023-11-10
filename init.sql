-- First, drop the tables with foreign key constraints
DROP TABLE IF EXISTS ligne_panier;
DROP TABLE IF EXISTS ligne_commande;
DROP TABLE IF EXISTS prestation;
DROP TABLE IF EXISTS commande;
DROP TABLE IF EXISTS utilisateur;
DROP TABLE IF EXISTS stand;
DROP TABLE IF EXISTS emplacement;
DROP TABLE IF EXISTS zone;
DROP TABLE IF EXISTS type_zone;
DROP TABLE IF EXISTS type_prestation;
DROP TABLE IF EXISTS role;


CREATE TABLE role(
   id_role INT AUTO_INCREMENT,
   libelle VARCHAR(50),
   PRIMARY KEY(id_role)
);

CREATE TABLE type_zone(
   id_type_zone INT AUTO_INCREMENT,
   libelle VARCHAR(50),
   PRIMARY KEY(id_type_zone)
);

CREATE TABLE type_prestation(
   id_type_prestation INT AUTO_INCREMENT,
   libelle VARCHAR(50),
   PRIMARY KEY(id_type_prestation)
);

CREATE TABLE zone(
   id_zone INT AUTO_INCREMENT,
   libelle VARCHAR(50),
   id_type_zone INT NOT NULL,
   PRIMARY KEY(id_zone),
   FOREIGN KEY(id_type_zone) REFERENCES type_zone(id_type_zone)
);

CREATE TABLE emplacement(
   id_emplacement INT AUTO_INCREMENT,
   coordonnes json,
   surface int,
   id_zone INT NOT NULL,
   PRIMARY KEY(id_emplacement),
   FOREIGN KEY(id_zone) REFERENCES zone(id_zone)
);

CREATE TABLE stand(
   id_stand INT AUTO_INCREMENT,
   nom_stand VARCHAR(50),
   image_stand VARCHAR(50),
   description_stand VARCHAR(50),
   date_achat DATE,
   prix INT,
   id_emplacement INT NOT NULL,
   PRIMARY KEY(id_stand),
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement)
);

CREATE TABLE prestation(
   id_prestation INT AUTO_INCREMENT,
   libelle VARCHAR(50),
   prix VARCHAR(50),
   id_type_prestation INT NOT NULL,
   id_stand INT NOT NULL,
   PRIMARY KEY(id_prestation),
   FOREIGN KEY(id_type_prestation) REFERENCES type_prestation(id_type_prestation),
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand)
);

CREATE TABLE utilisateur(
   id_user INT AUTO_INCREMENT,
   email VARCHAR(50) UNIQUE,
   password VARCHAR(50),
   nom VARCHAR(50),
   prenom VARCHAR(50),
   code_postal INT,
   adresse VARCHAR(50),
   commune VARCHAR(50),
   id_stand INT,
   id_role INT,
   PRIMARY KEY(id_user),
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand),
   FOREIGN KEY(id_role) REFERENCES role(id_role)
);

CREATE TABLE commande(
   id_commande INT AUTO_INCREMENT,
   date_commande DATE,
   id_user INT NOT NULL,
   PRIMARY KEY(id_commande),
   FOREIGN KEY(id_user) REFERENCES utilisateur(id_user)
);

CREATE TABLE ligne_commande(
   id_prestation INT AUTO_INCREMENT,
   id_commande INT,
   prix INT,
   quantite VARCHAR(50),
   PRIMARY KEY(id_prestation, id_commande),
   FOREIGN KEY(id_prestation) REFERENCES prestation(id_prestation),
   FOREIGN KEY(id_commande) REFERENCES commande(id_commande)
);

CREATE TABLE ligne_panier(
   id_user INT AUTO_INCREMENT,
   id_prestation INT,
   prix INT,
   quantite VARCHAR(50),
   PRIMARY KEY(id_user, id_prestation),
   FOREIGN KEY(id_user) REFERENCES utilisateur(id_user),
   FOREIGN KEY(id_prestation) REFERENCES prestation(id_prestation)
);

INSERT INTO type_zone (libelle) VALUES ('Ambulant'),('Fixe');

INSERT INTO `type_prestation` VALUES
(1,'sport'),
(2,'nourriture'),
(3,'boisson'),
(4,'magasin'),
(5,'billeterie');

INSERT INTO `role` VALUES
(1,'admin'),
(2,'prestataire');
