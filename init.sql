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
   id_role SERIAL,
   libelle VARCHAR(50),
   PRIMARY KEY(id_role)
);

CREATE TABLE type_zone(
   id_type_zone SERIAL,
   libelle VARCHAR(50),
   PRIMARY KEY(id_type_zone)
);

CREATE TABLE type_prestation(
   id_type_prestation SERIAL,
   libelle VARCHAR(50),
   PRIMARY KEY(id_type_prestation)
);

CREATE TABLE zone(
   id_zone SERIAL,
   libelle VARCHAR(50),
   id_type_zone INT NOT NULL,
   PRIMARY KEY(id_zone),
   FOREIGN KEY(id_type_zone) REFERENCES type_zone(id_type_zone)
);

CREATE TABLE emplacement(
   id_emplacement SERIAL,
   coordonnes json,
   surface int,
   id_zone INT NOT NULL,
   PRIMARY KEY(id_emplacement),
   FOREIGN KEY(id_zone) REFERENCES zone(id_zone)
);

CREATE TABLE stand(
   id_stand SERIAL,
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
   id_prestation SERIAL,
   libelle VARCHAR(50),
   prix VARCHAR(50),
   id_type_prestation INT NOT NULL,
   id_stand INT NOT NULL,
   PRIMARY KEY(id_prestation),
   FOREIGN KEY(id_type_prestation) REFERENCES type_prestation(id_type_prestation),
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand)
);

CREATE TABLE utilisateur(
   id_user SERIAL,
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
   id_commande SERIAL,
   date_commande DATE,
   id_user INT NOT NULL,
   PRIMARY KEY(id_commande),
   FOREIGN KEY(id_user) REFERENCES utilisateur(id_user)
);

CREATE TABLE ligne_commande(
   id_prestation SERIAL,
   id_commande INT,
   prix INT,
   quantite VARCHAR(50),
   PRIMARY KEY(id_prestation, id_commande),
   FOREIGN KEY(id_prestation) REFERENCES prestation(id_prestation),
   FOREIGN KEY(id_commande) REFERENCES commande(id_commande)
);

CREATE TABLE ligne_panier(
   id_user SERIAL,
   id_prestation INT,
   prix INT,
   quantite VARCHAR(50),
   PRIMARY KEY(id_user, id_prestation),
   FOREIGN KEY(id_user) REFERENCES utilisateur(id_user),
   FOREIGN KEY(id_prestation) REFERENCES prestation(id_prestation)
);

INSERT INTO role VALUES
(1,'admin'),
(2,'prestataire');

INSERT INTO type_zone (libelle) VALUES ('Ambulant'),('Fixe');

INSERT INTO type_prestation VALUES
(1,'sport'),
(2,'nourriture'),
(3,'boisson'),
(4,'magasin'),
(5,'billeterie');

INSERT INTO zone (libelle, id_type_zone) VALUES
('Zone A', 2),
('Zone B', 2),
('Zone C', 2),
('Zone D', 2);

INSERT INTO emplacement (coordonnes, surface, id_zone) VALUES
('{"latitude": 48.8566, "longitude": 2.3522}', 100, 1),
('{"latitude": 40.7128, "longitude": -74.0060}', 200, 2),
('{"latitude": 34.0522, "longitude": -118.2437}', 150, 3);

INSERT INTO stand (nom_stand, image_stand, description_stand, date_achat, prix, id_emplacement) VALUES
('Stand1', 'image1.jpg', 'Description du stand 1', '2023-01-01', 1000, 1),
('Stand2', 'image2.jpg', 'Description du stand 2', '2023-02-01', 1500, 2),
('Stand3', 'image3.jpg', 'Description du stand 3', '2023-03-01', 2000, 3);

INSERT INTO prestation (libelle, prix, id_type_prestation, id_stand) VALUES
('Prestation A', '100€', 1, 1),
('Prestation B', '200€', 2, 2),
('Prestation C', '150€', 3, 3);

INSERT INTO utilisateur (email, password, nom, prenom, code_postal, adresse, commune, id_stand, id_role) VALUES
('email1@example.com', 'password1', 'Nom1', 'Prenom1', 75001, 'Adresse1', 'Commune1', 1, 1),
('email2@example.com', 'password2', 'Nom2', 'Prenom2', 75002, 'Adresse2', 'Commune2', 2, 2),
('email3@example.com', 'password3', 'Nom3', 'Prenom3', 75003, 'Adresse3', 'Commune3', 3, 1),
('email4@example.com', 'password4', 'Nom4', 'Prenom4', 75004, 'Adresse4', 'Commune4', 2, 2),
('email5@example.com', 'password5', 'Nom5', 'Prenom5', 75005, 'Adresse5', 'Commune5', 1, 1);
