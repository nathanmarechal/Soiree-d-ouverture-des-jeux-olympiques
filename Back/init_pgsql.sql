-- Drop the tables with foreign key constraints
DROP TABLE IF EXISTS avis_stand_utilisateur CASCADE;
DROP TABLE IF EXISTS type_emplacement_logistique CASCADE;
DROP TABLE IF EXISTS emplacement_logistique CASCADE;

DROP TABLE IF EXISTS ligne_panier CASCADE;
DROP TABLE IF EXISTS ligne_commande CASCADE;
DROP TABLE IF EXISTS commande CASCADE;
DROP TABLE IF EXISTS etat_commande CASCADE;
DROP TABLE IF EXISTS creneau CASCADE;
DROP TABLE IF EXISTS prestation CASCADE;
DROP TABLE IF EXISTS utilisateurAttente CASCADE;
DROP TABLE IF EXISTS utilisateur CASCADE;
DROP TABLE IF EXISTS standAttente CASCADE;
DROP TABLE IF EXISTS stand CASCADE;
DROP TABLE IF EXISTS emplacement CASCADE;
DROP TABLE IF EXISTS zone CASCADE;
DROP TABLE IF EXISTS type_zone CASCADE;
DROP TABLE IF EXISTS type_prestation CASCADE;

DROP TABLE IF EXISTS session CASCADE;
DROP TABLE IF EXISTS role_droits CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS droits CASCADE;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS creneau CASCADE;

DROP TABLE IF EXISTS text_accueil CASCADE;

DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
-- Create the tables

CREATE TABLE text_accueil(
    id_text_accueil SERIAL PRIMARY KEY,
    description TEXT
);

CREATE TABLE role(
   id_role SERIAL PRIMARY KEY,
   libelle VARCHAR(50)
);

CREATE TABLE type_zone(
   id_type_zone SERIAL PRIMARY KEY,
   libelle VARCHAR(50)
);

CREATE TABLE type_prestation(
   id_type_prestation SERIAL PRIMARY KEY,
   libelle VARCHAR(50),
   image varchar(255),
   page_title varchar(255),
   description_type_prestation TEXT
);

CREATE TABLE zone(
   id_zone SERIAL PRIMARY KEY,
   libelle VARCHAR(50),
   couleur_hexa VARCHAR(50),
   id_type_zone INT NOT NULL,
   FOREIGN KEY(id_type_zone) REFERENCES type_zone(id_type_zone) ON DELETE CASCADE
);

CREATE TABLE emplacement(
   id_emplacement SERIAL PRIMARY KEY,
   coordonnes json,
   surface int,
   id_zone INT NOT NULL,
   FOREIGN KEY(id_zone) REFERENCES zone(id_zone) ON DELETE CASCADE)
;

CREATE TABLE stand(
   id_stand SERIAL PRIMARY KEY,
   nom_stand VARCHAR(100),
   image_stand VARCHAR(100),
   description_stand TEXT,
   date_achat DATE,
   prix INT,
   id_emplacement INT,
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement) ON DELETE SET NULL
);

CREATE TABLE standAttente(
   id_stand SERIAL PRIMARY KEY,
   nom_stand VARCHAR(100),
   image_stand VARCHAR(100),
   description_stand TEXT,
   date_achat DATE,
   prix INT,
   id_emplacement INT,
   FOREIGN KEY(id_emplacement) REFERENCES emplacement(id_emplacement) ON DELETE CASCADE
);

CREATE TABLE prestation(
    id_prestation SERIAL PRIMARY KEY,
    libelle VARCHAR(50),
    prix NUMERIC(7,2),
    date timestamp,
    image varchar(255),
    id_type_prestation INT NOT NULL,
    id_stand INT NOT NULL,
    is_available BOOLEAN,
    FOREIGN KEY(id_type_prestation) REFERENCES type_prestation(id_type_prestation) ON DELETE CASCADE,
    FOREIGN KEY(id_stand) REFERENCES stand(id_stand) ON DELETE CASCADE
);

CREATE TABLE utilisateur(
   id_user SERIAL PRIMARY KEY,
   email VARCHAR(50) UNIQUE,
   password VARCHAR(50),
   nom VARCHAR(50),
   prenom VARCHAR(50),
   code_postal INT,
   adresse VARCHAR(50),
   commune VARCHAR(50),
   solde FLOAT,
   id_stand INT,
   id_role INT,
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand) ON DELETE SET NULL,
   FOREIGN KEY(id_role) REFERENCES role(id_role) ON DELETE SET NULL
);

CREATE TABLE utilisateurAttente(
   id_user SERIAL PRIMARY KEY,
   email VARCHAR(50) UNIQUE,
   password VARCHAR(50),
   nom VARCHAR(50),
   prenom VARCHAR(50),
   code_postal INT,
   adresse VARCHAR(50),
   commune VARCHAR(50),
   solde numeric,
   id_stand INT,
   id_role INT,
   FOREIGN KEY(id_stand) REFERENCES stand(id_stand) ON DELETE CASCADE,
   FOREIGN KEY(id_role) REFERENCES role(id_role) ON DELETE CASCADE
);

CREATE TABLE session(
    session_id VARCHAR(255),
    id_user INT PRIMARY KEY ,
    timeLimit TIMESTAMP,
    FOREIGN KEY(id_user) REFERENCES utilisateur(id_user) ON DELETE CASCADE
);

CREATE TABLE droits(
    id SERIAL PRIMARY KEY,
    libelle VARCHAR(255)
);

CREATE TABLE role_droits(
    id_droit INT,
    id_role INT,
    PRIMARY KEY (id_droit, id_role),
    FOREIGN KEY(id_droit) REFERENCES droits(id)ON DELETE CASCADE,
    FOREIGN KEY(id_role) REFERENCES role(id_role) ON DELETE CASCADE
);

CREATE TABLE creneau(
    id_creneau SERIAL PRIMARY KEY,
    heure_creneau varchar(50)
);

CREATE TABLE etat_commande(
    id_etat SERIAL PRIMARY KEY,
    libelle VARCHAR(255)
);

CREATE TABLE commande(
    id_commande SERIAL PRIMARY KEY,
    date_commande varchar(50),
    id_user INT NOT NULL,
    id_etat_commande INT NOT NULL,
    FOREIGN KEY(id_user) REFERENCES utilisateur(id_user) ON DELETE CASCADE,
    FOREIGN KEY(id_etat_commande) REFERENCES etat_commande(id_etat) ON DELETE CASCADE
);

CREATE TABLE ligne_commande(
    id_commande INT,
    id_user INT,
    id_prestation INT,
    id_creneau INT,
    quantite INT,
    prix FLOAT,
    id_etat_commande INT,
    PRIMARY KEY(id_user, id_prestation, id_creneau),
    FOREIGN KEY (id_etat_commande) REFERENCES etat_commande(id_etat) ON DELETE CASCADE,
    FOREIGN KEY (id_creneau) REFERENCES creneau(id_creneau) ON DELETE CASCADE,
    FOREIGN KEY(id_user) REFERENCES utilisateur(id_user) ON DELETE CASCADE,
    FOREIGN KEY(id_prestation) REFERENCES prestation(id_prestation) ON DELETE CASCADE,
    FOREIGN KEY(id_commande) REFERENCES commande(id_commande) ON DELETE CASCADE
);

CREATE TABLE Ligne_panier(
    id_user INT,
    id_prestation INT,
    id_creneau INT,
    quantite INT,
    PRIMARY KEY(id_user, id_prestation, id_creneau),
    FOREIGN KEY (id_creneau) REFERENCES creneau(id_creneau) ON DELETE CASCADE,
    FOREIGN KEY(id_user) REFERENCES utilisateur(id_user) ON DELETE CASCADE,
    FOREIGN KEY(id_prestation) REFERENCES prestation(id_prestation) ON DELETE CASCADE
);

CREATE TABLE type_emplacement_logistique(
    id_type_emplacement_logistique SERIAL PRIMARY KEY,
    image VARCHAR(50),
    libelle VARCHAR(50),
    libelle_unite  VARCHAR(50)
);

CREATE TABLE emplacement_logistique(
    id_emplacement_logistique SERIAL PRIMARY KEY,
    libelle VARCHAR(50),
    coordonnes json,
    unite INT,
    id_type_emplacement_logistique INT,
    FOREIGN KEY(id_type_emplacement_logistique) REFERENCES type_emplacement_logistique(id_type_emplacement_logistique) ON DELETE CASCADE
);

CREATE TABLE avis_stand_utilisateur(
    id_avis_stand_utilisateur SERIAL PRIMARY KEY,
    note INT,
    commentaire TEXT,
    id_stand INT,
    id_user INT,
    FOREIGN KEY(id_stand) REFERENCES stand(id_stand) ON DELETE CASCADE,
    FOREIGN KEY(id_user) REFERENCES utilisateur(id_user) ON DELETE CASCADE
);

CREATE TABLE conversations(
    id_conversation SERIAL PRIMARY KEY,
    id_creator INTEGER,
    titre VARCHAR(64),
    resolu BOOLEAN,
    FOREIGN KEY (id_creator) REFERENCES utilisateur(id_user)  ON DELETE CASCADE
);


CREATE TABLE messages(
	id SERIAL,
    id_sender INTEGER ,
    id_conversation INTEGER,
    message VARCHAR(1024),
    temps_emmission TIMESTAMP,
    PRIMARY KEY (id,id_sender,id_conversation,temps_emmission),
    FOREIGN KEY (id_sender) REFERENCES utilisateur(id_user)  ON DELETE CASCADE,
    FOREIGN KEY (id_conversation) REFERENCES conversations(id_conversation)   ON DELETE CASCADE
);

INSERT INTO type_emplacement_logistique(libelle,image, libelle_unite) VALUES
('eau','water.svg','L/h'),
('éléctrcité','electricity.svg','kW'),
('internet haut débit','wifi.svg','Mbp/s')
;

INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('raccordement du flop', '[48.857572, 2.2977709]', 50, 3);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('raccordement Anatole France', '[48.8575458, 2.2963378]', 25, 1);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('eau grand palais éphémère', '[48.85361664555185,2.301281675224711]', 120, 1);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('grand palais éphémère', '[48.85389540910096,2.3017054680343967]', 50, 2);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('ouest champs mars', '[48.854777584984355,2.297537284224052]', 120, 3);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('ouest champs mars', '[48.85527865240099,2.295745555856659]', 75, 2);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('Gustave Eiffel', '[48.858489825337315,2.2963195587438805]', 55, 2);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('Gustave Eiffel', '[48.85703650350346,2.2940933207574825]', 55, 1);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('Theirry', '[48.85634601478476,2.2951017862667826]', 80, 3);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('est champs de mars', '[48.857057615531076,2.2996562377789114]', 80, 1);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('est champs de mars', '[48.85750572284105,2.299087604388737]', 20, 2);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('seine ouest', '[48.86254864492503,2.3016783478713214]', 250, 1);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('Pont de la concorde', '[48.86280266263824,2.318715891712828]', 75, 2);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('Pont de la concorde', '[48.864157234894385,2.3194454732642416]', 20, 3);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('Terrasse du bord d''eau', '[48.863381230711504,2.323243574081175]', 80, 1);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('centre tuilerie', '[48.86288793466376,2.329219554605007]', 80, 3);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('jeu de paume ', '[48.86556255135248,2.3245310199938145]', 30, 2);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('carouselle', '[48.860243742908146,2.3332643294570192]', 180, 1);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('pyramide du louvre', '[48.86101393860024,2.335828563416747]', 250, 2);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('pont de notre dame', '[48.85672656998265,2.348928394630727]', 30, 3);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('quai saint michel', '[48.85374114229819,2.344615394868313]', 30, 2);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('pont d’Austerlitz', '[48.84434889575977,2.3649144355065754]', 150, 1);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('pont d’Austerlitz', '[48.84566035881054,2.3669099012665256]', 60, 2);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('le petit labyrinthe', '[48.84344950254814,2.3575007509734207]', 60, 2);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('allée buffon', '[48.842944814495354,2.3604780177857876]', 30, 3);
INSERT INTO emplacement_logistique (libelle, coordonnes, unite, id_type_emplacement_logistique) VALUES ('rue cuvier', '[48.843781438599436,2.355011654778623]', 65, 3);

INSERT INTO creneau(heure_creneau) VALUES
('16h00-16h15'),
('16h15-16h30'),
('16h30-16h45'),
('16h45-17h00'),
('17h00-17h15'),
('17h15-17h30'),
('17h30-17h45'),
('17h45-18h00'),
('18h00-18h15'),
('18h15-18h30'),
('18h30-18h45'),
('18h45-19h00'),
('19h00-19h15'),
('19h15-19h30'),
('19h30-19h45'),
('19h45-20h00'),
('20h00-20h15'),
('20h15-20h30'),
('20h30-20h45'),
('20h45-21h00'),
('21h00-21h15'),
('21h15-21h30'),
('21h30-21h45'),
('21h45-22h00'),
('22h00-22h15'),
('22h15-22h30'),
('22h30-22h45'),
('22h45-23h00'),
('23h00-23h15'),
('23h15-23h30'),
('23h30-23h45'),
('23h45-00h00'),
('00h00-00h15'),
('00h15-00h30'),
('00h30-00h45'),
('00h45-01h00'),
('01h00-01h15'),
('01h15-01h30'),
('01h30-01h45'),
('01h45-02h00'),
('02h00-02h15'),
('02h15-02h30'),
('02h30-02h45'),
('02h45-03h00'),
('03h00-03h15'),
('03h15-03h30'),
('03h30-03h45'),
('03h45-04h00');

INSERT INTO droits(libelle) VALUES
('see_users'),
('create_users'),
('update_users'),
('update_self_users'),
('delete_users'),

('see_waiting_users'),
('accept_waiting_users'),
('refuse_waiting_users'),

('create_stands'),
('update_stands'),
('update_self_stands'),
('delete_stands'),

('create_zones'),
('update_zones'),
('delete_zones'),

('create_areas'),
('update_areas'),
('delete_areas'),

('create_roles'),
('update_roles'),
('delete_roles'),

('create_prestations'),
('update_prestations'),
('delete_prestations'),

('create_self_prestations'),
('update_self_prestations'),
('delete_self_prestations'),

('create_avis'),
('delete_avis'),

('update_home_page'),

('messages_admin'),
('messages_user'),

('statistiques_admin'),
('statistiques_prestataire'),

('see_self_panier'),
('add_self_panier'),
('update_self_panier'),
('delete_self_panier'),

('see_self_commande'),
('add_self_commande'),

('see_self_commande_received')
;

INSERT INTO role (libelle) VALUES
('admin'),
('prestataire'),
('utilisateur')
;

SELECT d.libelle FROM role_droits
LEFT JOIN droits d on role_droits.id_droit = d.id
WHERE id_role = 1
;

INSERT INTO role_droits(id_droit, id_role) VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(7,1),
(8,1),
(9,1),
(10,1),

(12,1),
(13,1),
(14,1),
(15,1),
(16,1),
(17,1),
(18,1),
(19,1),
(20,1),
(21,1),
(22,1),
(23,1),
(24,1),



(28,1),
(29,1),
(30,1),
(31,1),

(33,1),

(35,1),
(36,1),
(37,1),
(38,1),
(39,1),
(40,1),

(4,2),
(11,2),
(25,2),
(26,2),
(27,2),
(28,2),
(32,2),
(34,2),
(35,2),
(36,2),
(37,2),
(38,2),
(39,2),
(40,2),
(41,2),

(4,3),
(28,3),
(32,3),
(35,3),
(36,3),
(37,3),
(38,3),
(39,3),
(40,3)
;

INSERT INTO type_zone (libelle) VALUES
('Fixe'),
('Ambulant')
;

INSERT INTO type_prestation (libelle, page_title, image , description_type_prestation) VALUES
('Nourriture', 'Venez découvrir les saveurs disponibles' ,'food.jpg','Envie de goûter à des plats provenant de tous les horizons ? Notre collection de mets délicieux est spécialement conçue pour vous offrir une expérience gastronomique inoubliable. De la cuisine traditionnelle aux innovations culinaires modernes, chaque bouchée est une aventure pour vos papilles.
Que vous recherchiez des plats réconfortants faits maison ou des spécialités exotiques, notre gamme variée saura satisfaire tous les goûts.'),
('Boisson', 'Explorez notre sélection de Boissons', 'drink.jpg','À la découverte de saveurs nouvelles ? Notre site regroupe une variété impressionnante de boissons pour tous les goûts. Chaque stand a sa spécialité, offrant un choix riche et diversifié pour satisfaire toutes vos envies de boissons.
Nous collaborons avec des stands locaux pour vous apporter le meilleur en termes de qualité et d''originalité. Que vous recherchiez une boisson rafraîchissante, une pause détente ou une expérience gustative unique, notre sélection a de quoi ravir tout un chacun.'),
('Activité','Des activités passionnantes avec nos stands', 'activity.jpeg','À la recherche d''expériences uniques et mémorables ? Saisissez l opportunité de découvrir une multitude d activités variées offertes par nos stands. Que vous soyez à la recherche d''ateliers créatifs, de démonstrations culinaires, de jeux interactifs ou d expériences éducatives, nos stands ont quelque chose à offrir pour tous les âges et tous les intérêts.'),
('Articles', 'Partez en Mini-Tour du Monde avec Nos Magasins', 'shop.avif','À la recherche de souvenirs uniques ou d''articles qui capturent l essence des différents pays, y compris la France ? Nos magasins regorgent de trouvailles intéressantes et originales, parfaites pour se remémorer vos voyages ou pour offrir un cadeau spécial. Des objets d ailleurs aux spécialités françaises, il y a quelque chose pour chacun.'),
('Fanzone', 'Vivez l''Évènement en Grand dans Nos Fanzones !', 'fanzone.jpg','Envie de vivre l''évènement comme si vous y étiez ? Nos fanzones sont l''endroit parfait pour ça ! Imaginez-vous au cœur de l''action, entouré d''autres fans, tous les yeux rivés sur un écran géant qui retransmet chaque instant en direct. C''est l''expérience immersive que nous vous proposons.'),
('Transport','Profitez de Nos Services de Transport',  'ratp.jpg','Pour que vous profitiez pleinement de votre soirée sur notre grand espace, nous avons pensé à tout, surtout à votre confort ! Découvrez nos services de transport pratiques et fiables, conçus pour faciliter vos déplacements. Que ce soit pour arriver à l''évènement, pour vous déplacer dans celui-ci ou encore pour le retour, vous pouvez compter sur nous pour un trajet sûr et confortable.'),
('Billeterie', 'Vivez les Jeux Olympiques en Direct !', 'billet.jpg','Les Jeux Olympiques sont à nos portes, et avec eux, l''excitation de vivre des moments historiques. Ne manquez pas cette chance unique de faire partie de l''histoire du sport. Nos billetteries vous proposent des billets pour assister aux différentes épreuves des JO qui se dérouleront dans les jours à venir.')
;

INSERT INTO zone (libelle, couleur_hexa, id_type_zone) VALUES
('champs de mars','#4CE79E',1),
('tuileries','#75BD31',1),
('zones ambulantes','#BD7531',2),
('jardin des plantes','#CF2525',1)
;

INSERT INTO emplacement (coordonnes,surface,id_zone) VALUES
('[[48.857572, 2.2977709], [48.8575631, 2.2977724], [48.8575566, 2.2977726], [48.857554, 2.2977637], [48.8575404, 2.2976456], [48.8575318, 2.2975923], [48.8575262, 2.2975621], [48.8575281, 2.2975502], [48.8575798, 2.2975381], [48.8576294, 2.297513], [48.8576625, 2.2974845], [48.8577107, 2.297447], [48.8577602, 2.2973924], [48.8577737, 2.2973886], [48.8577838, 2.2973952], [48.8577886, 2.297414], [48.857789, 2.2974299], [48.857572, 2.2977709]]',443,1),
('[[48.8580521, 2.2963765], [48.8580445, 2.2963764], [48.8580387, 2.2963565], [48.858035, 2.296242], [48.8580298, 2.2961346], [48.8580379, 2.2961337], [48.8580339, 2.2960491], [48.8580247, 2.2960504], [48.8580035, 2.2957834], [48.8580078, 2.2957652], [48.8580158, 2.2957515], [48.8580275, 2.2957602], [48.8582676, 2.2961086], [48.8582676, 2.2961228], [48.858263, 2.2961348], [48.8582263, 2.2961566], [48.8581787, 2.296187], [48.8581443, 2.2962204], [48.8581074, 2.2962744], [48.8580747, 2.2963307], [48.8580521, 2.2963765]]',920,1),
('[[48.8569054, 2.2973425], [48.8569272, 2.2973183], [48.8569658, 2.2974223], [48.8569893, 2.2975001], [48.8570241, 2.297653], [48.8570432, 2.297766], [48.8570588, 2.2979002], [48.857066, 2.2980394], [48.8570669, 2.2981832], [48.8570577, 2.298309], [48.8570348, 2.2984538], [48.8570107, 2.2985601], [48.8569834, 2.2986426], [48.8569612, 2.2986128], [48.8569866, 2.2985302], [48.8570083, 2.2984363], [48.8570315, 2.2982674], [48.8570385, 2.2981574], [48.857036, 2.2980235], [48.8570284, 2.2979073], [48.8570151, 2.2977852], [48.8569949, 2.2976586], [48.8569621, 2.2975131], [48.8569389, 2.2974298], [48.8569054, 2.2973425]]',485,1),
('[[48.8579968, 2.2960593], [48.8580009, 2.2961475], [48.8580013, 2.2962112], [48.8579791, 2.2962056], [48.8579577, 2.296222], [48.8579352, 2.2962657], [48.8579247, 2.2963571], [48.8578959, 2.2965359], [48.8578838, 2.2965481], [48.857874, 2.2965598], [48.8578685, 2.2965708], [48.8578619, 2.2965845], [48.8578535, 2.2965995], [48.8578448, 2.2966012], [48.8578155, 2.2965602], [48.8578031, 2.2965803], [48.8577826, 2.2965918], [48.8577685, 2.2966089], [48.8577583, 2.2966323], [48.8577563, 2.2966534], [48.8577444, 2.296673], [48.8577648, 2.296703], [48.8577676, 2.2967153], [48.8577602, 2.2967319], [48.8577359, 2.2967684], [48.8577249, 2.296808], [48.8577143, 2.2968799], [48.8577242, 2.2969705], [48.8577407, 2.2970392], [48.8577358, 2.2970553], [48.8577128, 2.2970676], [48.8576467, 2.2970902], [48.8575984, 2.2970946], [48.8575315, 2.2970766], [48.8574847, 2.2970584], [48.8574105, 2.2970119], [48.8573955, 2.2969981], [48.8573898, 2.2969812], [48.8573925, 2.296961], [48.8574025, 2.2969277], [48.8574189, 2.2968762], [48.8574489, 2.2967987], [48.8574923, 2.2967153], [48.8575343, 2.2966373], [48.8575602, 2.2965852], [48.8575849, 2.2965149], [48.8575991, 2.2964584], [48.8576025, 2.296388], [48.8575991, 2.2963271], [48.8575945, 2.2962858], [48.8575963, 2.2962676], [48.8576025, 2.2962526], [48.8578787, 2.2958253], [48.8578655, 2.2959248], [48.8578777, 2.2959856], [48.8579101, 2.296009], [48.8579489, 2.2960007], [48.8579717, 2.2960053], [48.8579968, 2.2960593]]',4057,1),
('[[48.857283, 2.2970309], [48.8572898, 2.2970099], [48.8573046, 2.2970033], [48.8573449, 2.2970274], [48.8573539, 2.2970572], [48.8573516, 2.29713], [48.8573575, 2.2971825], [48.8573808, 2.297283], [48.8574048, 2.2973574], [48.8574357, 2.2974193], [48.8574759, 2.2974841], [48.8574816, 2.2975], [48.8574785, 2.2975131], [48.8574688, 2.2975239], [48.8573811, 2.2975397], [48.8573737, 2.297532], [48.8573605, 2.2975131], [48.857283, 2.2970309]]',457,1),
('[[48.8578161, 2.2969884], [48.8577962, 2.2970126], [48.8577807, 2.29702], [48.8577661, 2.2970139], [48.8577586, 2.2970005], [48.8577515, 2.2969548], [48.8577449, 2.2969051], [48.8577497, 2.2968446], [48.8577597, 2.2967955], [48.8577746, 2.296764], [48.8578006, 2.2967476], [48.8578067, 2.2967506], [48.8578254, 2.296728], [48.8578355, 2.2967098], [48.8578396, 2.2967156], [48.8578494, 2.2966989], [48.8578464, 2.2966945], [48.857858, 2.2966728], [48.8578707, 2.2966472], [48.8578739, 2.2966253], [48.8578817, 2.2966159], [48.8579041, 2.2966065], [48.8579292, 2.2966114], [48.8579638, 2.2966254], [48.8579694, 2.2966311], [48.8579723, 2.2966436], [48.8579682, 2.2966684], [48.8579502, 2.2967186], [48.857933, 2.2967854], [48.8579093, 2.2968444], [48.8578724, 2.2969098], [48.8578161, 2.2969884]]',595,1),
('[[48.8575458, 2.2963378], [48.8575587, 2.2963213], [48.8575688, 2.2963242], [48.8575771, 2.296342], [48.8575833, 2.2963773], [48.8575839, 2.296413], [48.8575809, 2.2964588], [48.8575681, 2.2965087], [48.8575464, 2.2965608], [48.8575185, 2.2966185], [48.8574733, 2.2967009], [48.8574324, 2.2967803], [48.857406, 2.296843], [48.8573749, 2.2969487], [48.8573673, 2.2969599], [48.8573585, 2.2969637], [48.8573506, 2.2969621], [48.8573021, 2.2969248], [48.8572659, 2.2968878], [48.8572404, 2.2968553], [48.857234, 2.2968406], [48.8572348, 2.2968273], [48.8572794, 2.2967624], [48.8573919, 2.2965804], [48.8575458, 2.2963378]]',978,1),
('[[48.8574471, 2.2972365], [48.857512, 2.2973762], [48.8576169, 2.2973952], [48.8576774, 2.2973289], [48.8577127, 2.2972879], [48.8577149, 2.2972631], [48.8577081, 2.2972437], [48.8576981, 2.2972323], [48.8576858, 2.2972289], [48.8576863, 2.2972143], [48.8576269, 2.2972007], [48.8576171, 2.2971928], [48.8576081, 2.2971829], [48.8576083, 2.2971717], [48.8576176, 2.2971666], [48.8576726, 2.2971472], [48.8577273, 2.2971282], [48.8577624, 2.2971153], [48.8577775, 2.297133], [48.8578011, 2.2972577], [48.8577429, 2.2973605], [48.8577142, 2.2973958], [48.8576629, 2.2974403], [48.8576141, 2.2974725], [48.8575674, 2.2974915], [48.8575411, 2.2975015], [48.8575145, 2.2974939], [48.8574705, 2.2974332], [48.8574315, 2.2973455], [48.8574044, 2.2972715], [48.8573821, 2.2971685], [48.8573847, 2.2970831], [48.8573928, 2.2970785], [48.8574063, 2.2970813], [48.8575469, 2.2971534], [48.8575569, 2.2971606], [48.8575596, 2.2971682], [48.8575559, 2.2971827], [48.8575418, 2.2971875], [48.8574898, 2.297173], [48.8574884, 2.2971858], [48.8574683, 2.2971905], [48.8574545, 2.2972007], [48.8574484, 2.2972157], [48.8574471, 2.2972365]]',875,1),
('[[48.8573805, 2.2976259], [48.8573849, 2.2975964], [48.8573978, 2.2975925], [48.8574896, 2.2975759], [48.8575038, 2.2975798], [48.8575113, 2.2975924], [48.8575171, 2.2976482], [48.8575255, 2.2977098], [48.857528, 2.2977806], [48.8575267, 2.2978085], [48.8575173, 2.2978426], [48.857451, 2.2979597], [48.857442, 2.2979652], [48.8574354, 2.2979582], [48.8573805, 2.2976259]]',483,1),
('[[48.8578186, 2.297231], [48.8577916, 2.2971056], [48.8577916, 2.2970911], [48.8577956, 2.2970783], [48.8578061, 2.2970669], [48.8578673, 2.2969986], [48.8579149, 2.2969085], [48.8579328, 2.2968855], [48.8579456, 2.2968879], [48.8579495, 2.2969069], [48.8579355, 2.296974], [48.8579197, 2.2970268], [48.8578705, 2.2971506], [48.8578278, 2.2972346], [48.8578186, 2.297231]]',261,1),
('[[48.856947, 2.2972886], [48.8569534, 2.2972736], [48.857031, 2.297187], [48.8570405, 2.2971333], [48.8570825, 2.2970679], [48.8570971, 2.2970663], [48.8571121, 2.297083], [48.8571479, 2.2973099], [48.8571744, 2.2974792], [48.8571743, 2.2975027], [48.8571687, 2.2975087], [48.8571543, 2.2975102], [48.8571206, 2.2974964], [48.8570716, 2.2974715], [48.8570289, 2.2974425], [48.8569943, 2.2974026], [48.8569597, 2.2973333], [48.856947, 2.2972886]]',698,1),
('[[48.8567192, 2.2983005], [48.8566751, 2.2982386], [48.8566835, 2.2981205], [48.8566831, 2.2980081], [48.856673, 2.297897], [48.8566589, 2.2978146], [48.8566434, 2.2977537], [48.8567185, 2.297644], [48.8567425, 2.29773], [48.8567595, 2.2978235], [48.8567762, 2.2979539], [48.8567811, 2.2981313], [48.8567784, 2.2981931], [48.8567671, 2.2983121], [48.8567192, 2.2983005]]',715,1),
('[[48.8581034, 2.2963382], [48.8581505, 2.2962684], [48.8581907, 2.296222], [48.8582506, 2.2961837], [48.8582783, 2.2961711], [48.8583012, 2.2961756], [48.8583196, 2.2961871], [48.8584537, 2.296386], [48.8578752, 2.2973081], [48.8578626, 2.2973154], [48.8578495, 2.2973089], [48.8578417, 2.2972958], [48.8578371, 2.2972803], [48.8578375, 2.2972679], [48.8578426, 2.2972547], [48.8578803, 2.2971825], [48.8579229, 2.2970893], [48.8579553, 2.2969994], [48.8579823, 2.2968945], [48.8579993, 2.2968073], [48.8580169, 2.296641], [48.8580279, 2.2965578], [48.8580493, 2.2964695], [48.85807, 2.2964114], [48.8581034, 2.2963382]]',2781,1),
('[[48.8570145, 2.2974971], [48.8570156, 2.2974844], [48.8570255, 2.2974794], [48.8570326, 2.2974813], [48.857078, 2.2975159], [48.8571339, 2.2975413], [48.8571588, 2.2975598], [48.8571781, 2.2975833], [48.8571879, 2.2976037], [48.8571978, 2.2976365], [48.8572015, 2.2976842], [48.8571964, 2.2977404], [48.8571618, 2.297866], [48.8571105, 2.2980848], [48.8571043, 2.2980973], [48.8570975, 2.2980967], [48.8570919, 2.2980939], [48.8570896, 2.2980458], [48.8570871, 2.2979731], [48.8570783, 2.2978773], [48.8570661, 2.2977692], [48.8570439, 2.2976335], [48.8570145, 2.2974971]]',703,1),
('[[48.8570962, 2.2982347], [48.8571579, 2.2979943], [48.8572004, 2.2978382], [48.85721, 2.297825], [48.8572191, 2.2978272], [48.8572265, 2.2978394], [48.8572849, 2.2981894], [48.8572847, 2.2982071], [48.8572781, 2.2982218], [48.8571688, 2.2983931], [48.8570524, 2.2985774], [48.8570447, 2.2985816], [48.8570393, 2.2985775], [48.857036, 2.2985711], [48.8570357, 2.2985587], [48.8570674, 2.2984164], [48.8570962, 2.2982347]]',941,1),
('[[48.8556711, 2.2981729], [48.8557213, 2.2982816], [48.8557774, 2.298375], [48.8558419, 2.2984572], [48.8559125, 2.2985216], [48.8555468, 2.2990868], [48.8553112, 2.2987404], [48.8556711, 2.2981729]]',3126,1),
('[[48.8549325, 2.2993302], [48.8551723, 2.2996762], [48.8548057, 2.3002527], [48.8545657, 2.2998972], [48.8549325, 2.2993302]]',3274,1),
('[[48.855288, 2.2987757], [48.855526, 2.2991238], [48.8551959, 2.2996357], [48.8549566, 2.2992937], [48.855288, 2.2987757]]',2920,1),
('[[48.8540066, 2.3007806], [48.854242, 2.3011307], [48.8538906, 2.3016794], [48.8536546, 2.3013278], [48.8540066, 2.3007806]]',3111,1),
('[[48.8544152, 2.3001346], [48.8546539, 2.3004896], [48.8542659, 2.3010944], [48.8540298, 2.3007435], [48.8544152, 2.3001346]]',3456,1),
('[[48.8565343, 2.2951474], [48.8565375, 2.2951557], [48.8565199, 2.2951803], [48.8564952, 2.295216], [48.8564593, 2.2952641], [48.8564378, 2.2952613], [48.8564213, 2.295243], [48.8564117, 2.2952115], [48.8564194, 2.2951791], [48.8564379, 2.2951549], [48.8568291, 2.2945487], [48.8569184, 2.2946526], [48.8568837, 2.2947158], [48.8568804, 2.2947704], [48.8568995, 2.2948015], [48.8569251, 2.2948216], [48.8569339, 2.2948423], [48.8569303, 2.2948815], [48.8569205, 2.294908], [48.8568991, 2.2949269], [48.8568742, 2.2949391], [48.8568287, 2.294952], [48.8567755, 2.2949759], [48.8567217, 2.295008], [48.8567181, 2.2949985], [48.8566503, 2.2950436], [48.8566515, 2.2950504], [48.856605, 2.2950883], [48.8565718, 2.2951179], [48.8565643, 2.2951125], [48.8565343, 2.2951474]]',1461,1),
('[[48.8555858, 2.2965891], [48.8555683, 2.2965602], [48.8555905, 2.2965359], [48.8556562, 2.2964931], [48.855738, 2.2964571], [48.8558017, 2.2964322], [48.8558675, 2.2964135], [48.8559509, 2.2964055], [48.8560213, 2.2964054], [48.856103, 2.2964157], [48.8561718, 2.2964347], [48.8562515, 2.2964695], [48.8563213, 2.2965071], [48.8563936, 2.2965606], [48.8564273, 2.2965901], [48.8564062, 2.2966145], [48.8563246, 2.2965569], [48.8562448, 2.2965112], [48.8561561, 2.2964788], [48.8560811, 2.2964612], [48.8559973, 2.2964528], [48.8559278, 2.2964547], [48.8558601, 2.2964643], [48.8557915, 2.2964821], [48.855722, 2.2965072], [48.8556673, 2.2965328], [48.855598, 2.2965772], [48.8555858, 2.2965891]]',487,1),
('[[48.8559275, 2.2963749], [48.855923, 2.296368], [48.8559216, 2.2963558], [48.8559271, 2.2963481], [48.8560938, 2.2962005], [48.8561184, 2.2961844], [48.8561446, 2.296183], [48.8561676, 2.2961906], [48.8561851, 2.2962035], [48.8561986, 2.2962215], [48.8562309, 2.2962978], [48.8562998, 2.2964345], [48.8562997, 2.296446], [48.8562943, 2.296455], [48.856285, 2.296456], [48.8562498, 2.2964361], [48.8562032, 2.2964142], [48.8561332, 2.296392], [48.8560864, 2.2963813], [48.8560317, 2.2963743], [48.855979, 2.2963733], [48.8559275, 2.2963749]]',602,1),
('[[48.8571685, 2.2949498], [48.8571765, 2.294958], [48.8571834, 2.2949663], [48.8571848, 2.29499], [48.8571736, 2.2950419], [48.8571337, 2.2951775], [48.8571087, 2.2952882], [48.8571017, 2.2953574], [48.8571036, 2.2954099], [48.8571242, 2.2955335], [48.8571216, 2.2955575], [48.8567691, 2.2961018], [48.8567088, 2.2960858], [48.8566262, 2.2960554], [48.8566122, 2.2960359], [48.8566038, 2.2960113], [48.856595, 2.2959353], [48.8566055, 2.2959333], [48.8566025, 2.2958887], [48.8565914, 2.2958898], [48.8565859, 2.2957944], [48.8565911, 2.2956653], [48.8566023, 2.2955976], [48.8566339, 2.2954801], [48.8566708, 2.2953836], [48.856723, 2.2952789], [48.8567824, 2.2951945], [48.8568352, 2.2951242], [48.8568712, 2.2950842], [48.856894, 2.2950613], [48.8569293, 2.2950282], [48.8569621, 2.2950075], [48.8570234, 2.294976], [48.857092, 2.2949578], [48.8571479, 2.2949471], [48.8571685, 2.2949498]]',4998,1),
('[[48.8568421, 2.2945283], [48.85701, 2.2942637], [48.8570783, 2.294372], [48.8571212, 2.2944646], [48.8571552, 2.2945658], [48.857182, 2.2946506], [48.8571953, 2.2946975], [48.857196, 2.2947106], [48.8571943, 2.2947199], [48.8571845, 2.2947244], [48.8571182, 2.2947267], [48.8571166, 2.2946727], [48.8570888, 2.2946684], [48.8570884, 2.2946201], [48.8570496, 2.2946186], [48.8570475, 2.2945302], [48.8570218, 2.2945037], [48.8569825, 2.2945107], [48.856962, 2.2945365], [48.8569552, 2.2945657], [48.8569527, 2.2946219], [48.8569527, 2.2946383], [48.8568421, 2.2945283]]',812,1),
('[[48.8572138, 2.2949724], [48.8572241, 2.2949582], [48.8572361, 2.2949535], [48.8572649, 2.2949531], [48.8574352, 2.2949801], [48.8574584, 2.2949903], [48.8574653, 2.2950024], [48.8574643, 2.2950192], [48.857448, 2.2950509], [48.8571677, 2.2954874], [48.8571546, 2.2954938], [48.8571422, 2.2954843], [48.8571321, 2.2954618], [48.8571238, 2.2954146], [48.8571217, 2.295359], [48.8571299, 2.2952869], [48.8571548, 2.295181], [48.8571887, 2.2950639], [48.8572138, 2.2949724]]',1145,1),
('[[48.8562262, 2.2958713], [48.8562172, 2.2959228], [48.8562118, 2.2959285], [48.8562051, 2.2959289], [48.8560052, 2.2958672], [48.8560008, 2.2958615], [48.8560015, 2.2958501], [48.8561325, 2.2956487], [48.8563485, 2.2953154], [48.8563587, 2.2953103], [48.8563751, 2.2953109], [48.8563871, 2.2953297], [48.8563939, 2.2953559], [48.8563872, 2.2953837], [48.8563151, 2.2955304], [48.8562629, 2.295687], [48.8562466, 2.2957582], [48.8562418, 2.2957569], [48.8562203, 2.2958685], [48.8562262, 2.2958713]]',988,1),
('[[48.8562326, 2.296933], [48.8561616, 2.2970503], [48.8560991, 2.2970214], [48.8559867, 2.2969938], [48.8559099, 2.2969954], [48.8558379, 2.2970057], [48.8557982, 2.296947], [48.8557909, 2.2968773], [48.8558726, 2.2968555], [48.855949, 2.296848], [48.8560272, 2.2968528], [48.8561023, 2.2968712], [48.8561721, 2.2968997], [48.8562326, 2.296933]]',713,1),
('[[48.8562638, 2.2959485], [48.856258, 2.2959425], [48.856257, 2.2959294], [48.8562644, 2.2958837], [48.856269, 2.2958848], [48.8562798, 2.2958261], [48.8562742, 2.2958233], [48.8562874, 2.2957606], [48.8563086, 2.2956835], [48.8563412, 2.2955752], [48.8563976, 2.2954449], [48.8564503, 2.2953573], [48.856508, 2.2952738], [48.8565699, 2.2951956], [48.856636, 2.295132], [48.8567223, 2.2950658], [48.8567988, 2.2950261], [48.8568561, 2.2949929], [48.8568831, 2.294985], [48.8568932, 2.2949971], [48.8568948, 2.295008], [48.8568891, 2.2950217], [48.8568439, 2.2950647], [48.8567879, 2.2951359], [48.8567543, 2.2951801], [48.8567514, 2.2951732], [48.8567221, 2.2952107], [48.856726, 2.2952172], [48.8566844, 2.2952817], [48.8566505, 2.2953553], [48.856614, 2.2954439], [48.8565917, 2.295524], [48.8565729, 2.295616], [48.8565601, 2.2957405], [48.8565664, 2.2958942], [48.8565554, 2.2958962], [48.8565585, 2.2959421], [48.856571, 2.2959392], [48.8565781, 2.2960154], [48.8565721, 2.2960309], [48.8565638, 2.2960375], [48.8565554, 2.296038], [48.8563912, 2.2959872], [48.8562638, 2.2959485]]',2703,1),
('[[48.8562361, 2.2962301], [48.8562385, 2.2962217], [48.8562454, 2.2962155], [48.8563581, 2.2962517], [48.8563526, 2.2962943], [48.8563788, 2.2963029], [48.8563869, 2.2963054], [48.8564139, 2.2963138], [48.8564194, 2.2962712], [48.856461, 2.2962848], [48.856453, 2.2963409], [48.856533, 2.2963603], [48.8565364, 2.2963335], [48.856518, 2.2963284], [48.8565224, 2.2963004], [48.8565649, 2.2963132], [48.8565874, 2.2963279], [48.8565991, 2.2963538], [48.8565966, 2.2963705], [48.8565353, 2.2964718], [48.8565276, 2.2964606], [48.8564913, 2.2965179], [48.8564962, 2.2965251], [48.8564741, 2.2965588], [48.8564671, 2.2965651], [48.8564608, 2.2965644], [48.8564302, 2.2965375], [48.8563858, 2.2964951], [48.8563183, 2.296403], [48.8563483, 2.2963548], [48.8563443, 2.296329], [48.856332, 2.2963142], [48.8563154, 2.2963139], [48.8562882, 2.2963496], [48.8562432, 2.2962475], [48.8562361, 2.2962301]]',658,1),
('[[48.857191, 2.2947508], [48.8571993, 2.2947597], [48.8572027, 2.2947677], [48.8572047, 2.294858], [48.8572007, 2.2948733], [48.8571952, 2.2948854], [48.8571888, 2.2948843], [48.8571078, 2.294886], [48.8570935, 2.294882], [48.857087, 2.2948717], [48.8570799, 2.2948219], [48.8571195, 2.2948179], [48.8571175, 2.2947583], [48.857191, 2.2947508]]',162,1),
('[[48.8556262, 2.2964703], [48.8556157, 2.2964616], [48.8556132, 2.296448], [48.8556257, 2.2964213], [48.855841, 2.2960965], [48.855849, 2.2960947], [48.8560504, 2.2961579], [48.8560578, 2.296165], [48.8560603, 2.2961769], [48.8560587, 2.2961886], [48.8559918, 2.2962553], [48.8559345, 2.2963011], [48.8558523, 2.2963568], [48.8557824, 2.2963987], [48.8557055, 2.2964316], [48.8556262, 2.2964703]]',853,1),
('[[48.8574554, 2.2949234], [48.8574534, 2.2949345], [48.8574428, 2.2949333], [48.8573497, 2.2949093], [48.8572368, 2.2948922], [48.8572281, 2.2948843], [48.8572243, 2.2948662], [48.8572213, 2.2947369], [48.8572138, 2.2946764], [48.8571915, 2.294595], [48.8571718, 2.2945272], [48.8571759, 2.2945178], [48.8571847, 2.2945191], [48.8574554, 2.2949234]]',508,1),
('[[48.8557352, 2.2992307], [48.8557482, 2.2992044], [48.8558281, 2.2992518], [48.8559308, 2.2992996], [48.8560199, 2.29933], [48.856126, 2.2993484], [48.8562292, 2.2993526], [48.8563136, 2.2993445], [48.8564071, 2.2993149], [48.8564951, 2.299276], [48.8565298, 2.2992573], [48.856568, 2.2992253], [48.8565894, 2.2992581], [48.8565557, 2.2992919], [48.8564403, 2.2993437], [48.8563361, 2.2993733], [48.8562161, 2.2993855], [48.8561216, 2.2993823], [48.8560128, 2.2993612], [48.8559205, 2.2993329], [48.8558184, 2.2992841], [48.8557352, 2.2992307]]',382,1),
('[[48.8552047, 2.2984383], [48.8551726, 2.2983255], [48.8551388, 2.2981848], [48.8551223, 2.2980886], [48.8551067, 2.2979682], [48.8550966, 2.2978423], [48.8550928, 2.2977087], [48.8550964, 2.2975911], [48.85511, 2.2974332], [48.8551299, 2.2973154], [48.8551538, 2.2972221], [48.8551763, 2.297152], [48.8551979, 2.2971706], [48.8551927, 2.2971787], [48.855197, 2.2971848], [48.8551833, 2.2972277], [48.8551548, 2.297327], [48.855137, 2.2974428], [48.8551213, 2.2975967], [48.8551181, 2.2977198], [48.8551212, 2.2978428], [48.8551316, 2.2979678], [48.8551492, 2.2980846], [48.8551681, 2.2981888], [48.8551923, 2.298299], [48.8552239, 2.2984096], [48.8552047, 2.2984383]]',416,1),
('[[48.8550008, 2.2983202], [48.8549952, 2.2983283], [48.8549891, 2.2983284], [48.8549814, 2.2983187], [48.8548758, 2.2976113], [48.8548769, 2.2975953], [48.8548821, 2.2975816], [48.8551043, 2.2972347], [48.855112, 2.2972323], [48.8551171, 2.2972376], [48.8551183, 2.2972479], [48.8550904, 2.2973851], [48.8550741, 2.29753], [48.855067, 2.2976321], [48.8550613, 2.2978661], [48.8550541, 2.2978674], [48.8550506, 2.2979434], [48.855058, 2.2979437], [48.8550429, 2.2980737], [48.855023, 2.2982022], [48.8550008, 2.2983202]]',1514,1),
('[[48.856024, 2.2996138], [48.8560074, 2.2995417], [48.8559845, 2.2994655], [48.8559647, 2.2994237], [48.8559661, 2.2994098], [48.855972, 2.299403], [48.8560566, 2.2994222], [48.8561591, 2.2994343], [48.856243, 2.2994382], [48.8562494, 2.2994446], [48.8562501, 2.2994572], [48.8562452, 2.2994673], [48.856207, 2.2995065], [48.8561636, 2.2995618], [48.8561202, 2.2996237], [48.8561024, 2.2996461], [48.8560856, 2.2996529], [48.8560676, 2.2996511], [48.856047, 2.2996413], [48.856034, 2.29963], [48.856024, 2.2996138]]',491,1),
('[[48.8552609, 2.300795], [48.8552782, 2.3007391], [48.8553037, 2.3006822], [48.8553285, 2.3006474], [48.8553587, 2.3006248], [48.8553854, 2.3006171], [48.8554081, 2.3006171], [48.855423, 2.3006255], [48.8554278, 2.3006361], [48.8554289, 2.300648], [48.8554279, 2.3006618], [48.8553768, 2.3006635], [48.8553592, 2.3007013], [48.8553523, 2.3007229], [48.8553289, 2.3007282], [48.8553181, 2.3007705], [48.8553332, 2.300797], [48.8553612, 2.3008148], [48.85539, 2.3008533], [48.8554081, 2.3008563], [48.8554094, 2.3008936], [48.8554839, 2.3008902], [48.8555451, 2.3008102], [48.8555825, 2.3007495], [48.8555857, 2.3007411], [48.855573, 2.3006669], [48.8554653, 2.3006618], [48.8554676, 2.3006392], [48.8554754, 2.3006198], [48.8554838, 2.3006073], [48.8554991, 2.300597], [48.8556042, 2.3005646], [48.8556552, 2.3005382], [48.855711, 2.3005012], [48.855765, 2.300453], [48.8558188, 2.300394], [48.8558609, 2.3003416], [48.8558914, 2.3002957], [48.855898, 2.3002904], [48.8559216, 2.3002905], [48.8559298, 2.3002987], [48.8559326, 2.3003108], [48.8559301, 2.3003218], [48.8556239, 2.3008036], [48.8554721, 2.3010412], [48.8554666, 2.3010455], [48.8554592, 2.3010414], [48.8554445, 2.3010291], [48.8554343, 2.3010273], [48.8554237, 2.3010352], [48.8554172, 2.3010427], [48.8554457, 2.301085], [48.8553956, 2.3011619], [48.8552693, 2.3009772], [48.8552587, 2.3009439], [48.855254, 2.300899], [48.8552558, 2.3008481], [48.8552609, 2.300795]]',1679,1),
('[[48.8549746, 2.3005399], [48.8549741, 2.3005232], [48.8549799, 2.300515], [48.8549876, 2.3005149], [48.8550103, 2.3005252], [48.8550894, 2.3005534], [48.8551775, 2.3005766], [48.855229, 2.3005883], [48.8553139, 2.3006012], [48.8553187, 2.3006059], [48.8553202, 2.3006142], [48.8553152, 2.3006217], [48.8552924, 2.3006545], [48.8552667, 2.3007079], [48.8552471, 2.3007612], [48.8552326, 2.3008257], [48.8552242, 2.3008692], [48.8552164, 2.3008793], [48.8552062, 2.300881], [48.8551977, 2.3008773], [48.8549746, 2.3005399]]',668,1),
('[[48.8550231, 2.2985671], [48.8550251, 2.2985506], [48.855032, 2.2985392], [48.8550423, 2.2985347], [48.8551866, 2.2985379], [48.8551895, 2.2985455], [48.8551893, 2.2985587], [48.855175, 2.2985806], [48.8551728, 2.2985775], [48.8551356, 2.2986369], [48.8551374, 2.2986395], [48.8550617, 2.298758], [48.8550554, 2.2987602], [48.8550505, 2.2987543], [48.8550231, 2.2985671]]',259,1),
('[[48.8546347, 2.298331], [48.854657, 2.2982769], [48.8546537, 2.2982729], [48.8547421, 2.2980774], [48.8547487, 2.2980734], [48.8547551, 2.2980746], [48.8547604, 2.2980848], [48.8548276, 2.2985274], [48.8548253, 2.2985374], [48.8548193, 2.2985429], [48.8548136, 2.2985425], [48.8547593, 2.2985022], [48.8547134, 2.2984598], [48.854664, 2.2984047], [48.8546374, 2.2983594], [48.8546348, 2.2983462], [48.8546347, 2.298331]]',580,1),
('[[48.8559818, 2.3002441], [48.8559728, 2.3002491], [48.8559629, 2.30024], [48.8559583, 2.3002236], [48.8559571, 2.300193], [48.8559608, 2.3001596], [48.8559718, 2.3001261], [48.8560059, 2.3000312], [48.8560343, 2.2999412], [48.8560419, 2.2999258], [48.8560525, 2.2999221], [48.856158, 2.2999547], [48.8561588, 2.2999672], [48.8559818, 2.3002441]]',344,1),
('[[48.855407, 2.2996881], [48.8554121, 2.2996851], [48.8554192, 2.2996901], [48.8554515, 2.2997411], [48.8555793, 2.2997803], [48.8555995, 2.2997967], [48.8556134, 2.2998203], [48.8556228, 2.2998565], [48.8556175, 2.2998601], [48.8556245, 2.2998964], [48.8556306, 2.2998931], [48.8556371, 2.2999515], [48.8556409, 2.3000122], [48.8556387, 2.300065], [48.8556323, 2.3001322], [48.8556195, 2.3001916], [48.8555997, 2.3002529], [48.8555654, 2.3003348], [48.8555261, 2.3004039], [48.8555208, 2.3003973], [48.855496, 2.3004343], [48.8554999, 2.300441], [48.8554688, 2.3004745], [48.8554268, 2.3005048], [48.8553816, 2.30053], [48.8553282, 2.3005452], [48.8552783, 2.3005483], [48.8552221, 2.300541], [48.8551732, 2.3005297], [48.8550776, 2.3004993], [48.8549898, 2.3004639], [48.8549422, 2.3004413], [48.8549366, 2.3004337], [48.8549392, 2.3004192], [48.855407, 2.2996881]]',4387,1),
('[[48.8554969, 2.3005484], [48.8554878, 2.3005397], [48.8554848, 2.3005277], [48.8554847, 2.300512], [48.8555053, 2.3004856], [48.8555605, 2.3004045], [48.8555998, 2.300326], [48.8556329, 2.3002371], [48.8556527, 2.3001717], [48.8556649, 2.3000956], [48.8556666, 2.3000208], [48.8556653, 2.2999356], [48.8556527, 2.2998663], [48.8556431, 2.2998182], [48.8556459, 2.2998073], [48.8556523, 2.2998028], [48.8558026, 2.2998485], [48.8557981, 2.2998879], [48.85577, 2.2998789], [48.8557344, 2.3000935], [48.8557439, 2.3001315], [48.8558258, 2.3001511], [48.8558334, 2.300145], [48.8558571, 2.2999037], [48.8558352, 2.2998962], [48.8558398, 2.2998577], [48.8559961, 2.2999069], [48.8560022, 2.2999197], [48.8559921, 2.2999604], [48.8559868, 2.2999569], [48.8559696, 2.3000102], [48.855975, 2.3000129], [48.8559439, 2.3000957], [48.8559031, 2.3001883], [48.8558603, 2.3002661], [48.8558441, 2.300292], [48.8558369, 2.3002909], [48.8558088, 2.3003355], [48.8558117, 2.3003403], [48.8557725, 2.3003875], [48.8557227, 2.3004368], [48.8556599, 2.3004847], [48.8556038, 2.3005164], [48.8555499, 2.3005373], [48.8554969, 2.3005484]]',1793,1),
('[[48.8561442, 2.2996768], [48.8561373, 2.2996638], [48.8561378, 2.2996505], [48.8561843, 2.2995839], [48.856258, 2.2994966], [48.8563057, 2.2994482], [48.8564154, 2.2993909], [48.8565082, 2.299355], [48.8565349, 2.2993397], [48.8565426, 2.2993408], [48.8565456, 2.29935], [48.8565451, 2.2993585], [48.856316, 2.2997283], [48.8561442, 2.2996768]]',801,1),
('[[48.8559066, 2.2988801], [48.8559877, 2.2987591], [48.8560477, 2.2987885], [48.8561221, 2.2988101], [48.8561997, 2.2988186], [48.8562663, 2.2988121], [48.8563103, 2.2988037], [48.8563533, 2.2988677], [48.8563581, 2.2989444], [48.8562733, 2.2989628], [48.8562073, 2.2989694], [48.856136, 2.2989654], [48.8560567, 2.2989484], [48.8559753, 2.2989189], [48.8559066, 2.2988801]]',758,1),
('[[48.8541835, 2.299374], [48.854217, 2.2993245], [48.8542338, 2.2993043], [48.8542443, 2.2992788], [48.8542515, 2.2992414], [48.8542499, 2.299234], [48.854258, 2.2992001], [48.8542696, 2.2991907], [48.8542818, 2.2991744], [48.8542902, 2.2991515], [48.8543087, 2.299057], [48.8543152, 2.2990482], [48.8543256, 2.2990468], [48.854335, 2.299055], [48.8543366, 2.2990682], [48.8543425, 2.2991106], [48.8543414, 2.2991633], [48.8543383, 2.2991784], [48.8543323, 2.2993518], [48.8543343, 2.2993881], [48.8543426, 2.2994375], [48.8543529, 2.2994859], [48.8543433, 2.2994873], [48.8543572, 2.2995707], [48.8543774, 2.2996402], [48.8543764, 2.2996505], [48.8543705, 2.2996535], [48.8541835, 2.299374]]',566,1),
('[[48.8546015, 2.298392], [48.8546197, 2.2983876], [48.8546431, 2.298431], [48.8546696, 2.2984641], [48.8546871, 2.2984812], [48.8546915, 2.2984956], [48.8546911, 2.2985117], [48.854683, 2.2985298], [48.854681, 2.2985562], [48.8546854, 2.2985725], [48.8546897, 2.2985949], [48.8546862, 2.2986059], [48.8546751, 2.2986218], [48.8546468, 2.2986438], [48.8546172, 2.2986583], [48.8545794, 2.2986907], [48.854522, 2.2987455], [48.8544856, 2.2987891], [48.8544481, 2.298842], [48.8544278, 2.2988751], [48.854418, 2.2988801], [48.8544129, 2.298874], [48.8544124, 2.2988563], [48.8544158, 2.2988309], [48.8544422, 2.2987473], [48.8544846, 2.2986303], [48.8545197, 2.2985491], [48.854553, 2.298474], [48.8545586, 2.2984798], [48.8546015, 2.298392]]',638,1),
('[[48.8539503, 2.2990343], [48.8540091, 2.2989378], [48.8540171, 2.2989863], [48.853989, 2.2990281], [48.8540053, 2.2990544], [48.8540353, 2.2990102], [48.8540262, 2.2989947], [48.8540338, 2.2989809], [48.8540352, 2.298964], [48.8540327, 2.2989455], [48.8540236, 2.2989159], [48.8544704, 2.2982233], [48.8544794, 2.2982183], [48.8544868, 2.2982211], [48.8545628, 2.2983301], [48.854565, 2.2983421], [48.8545611, 2.2983538], [48.8545226, 2.2984335], [48.854528, 2.2984419], [48.8544884, 2.2985281], [48.8544524, 2.2986146], [48.8544125, 2.2987268], [48.8543756, 2.2988487], [48.8543548, 2.2989225], [48.8543451, 2.29894], [48.8543369, 2.2989417], [48.8543321, 2.2989353], [48.8543275, 2.2989233], [48.8543303, 2.2989084], [48.8543393, 2.2988625], [48.8543375, 2.2988276], [48.8543251, 2.298796], [48.8543054, 2.2987786], [48.8542861, 2.2987804], [48.8542662, 2.2987928], [48.8542568, 2.2988106], [48.8542519, 2.2988279], [48.8542145, 2.2988361], [48.8541418, 2.2988271], [48.8541232, 2.2990737], [48.8541895, 2.299084], [48.8542137, 2.2991295], [48.8542205, 2.2991623], [48.8542315, 2.2991855], [48.8542398, 2.2991958], [48.8542381, 2.2992268], [48.8542347, 2.2992268], [48.8542291, 2.2992623], [48.8542205, 2.2992877], [48.8541713, 2.299362], [48.8539503, 2.2990343]]',2377,1),
('[[48.8543852, 2.299081], [48.8544056, 2.2990023], [48.8544364, 2.2989207], [48.8544635, 2.2988753], [48.8545124, 2.2988059], [48.8545622, 2.2987518], [48.8546141, 2.2987056], [48.8546701, 2.2986634], [48.8547288, 2.2986285], [48.8547885, 2.2986023], [48.854828, 2.2985897], [48.854837, 2.2985968], [48.8548652, 2.2987773], [48.8548872, 2.2989096], [48.8549209, 2.29896], [48.8549216, 2.2989723], [48.8548615, 2.2990702], [48.8548545, 2.2990716], [48.8548489, 2.2990654], [48.8548654, 2.2990391], [48.8548504, 2.2990178], [48.8548456, 2.2990103], [48.8548389, 2.2990126], [48.8548246, 2.2990363], [48.8548259, 2.2990504], [48.8548294, 2.2990568], [48.854846, 2.2990768], [48.854848, 2.2990865], [48.8548451, 2.2990961], [48.8544706, 2.2996796], [48.8544548, 2.299693], [48.8544425, 2.2996942], [48.8544297, 2.2996886], [48.8544203, 2.2996746], [48.8544132, 2.2996583], [48.8543944, 2.299593], [48.8543775, 2.2994759], [48.8543652, 2.2993809], [48.8543638, 2.2993206], [48.8543639, 2.2992426], [48.8543706, 2.2991702], [48.8543852, 2.299081]]',4194,1),
('[[48.8550302, 2.298301], [48.8550712, 2.2980581], [48.8550759, 2.2980443], [48.8550833, 2.2980438], [48.8550868, 2.2980502], [48.855112, 2.2981833], [48.8551491, 2.2983503], [48.8551864, 2.2984716], [48.8551844, 2.2984845], [48.8551749, 2.2984946], [48.8550285, 2.2984987], [48.855016, 2.2984912], [48.8550083, 2.2984809], [48.8550031, 2.2984637], [48.855004, 2.2984392], [48.8550302, 2.298301]]',546,1),
('[[48.855652, 2.2992985], [48.855687, 2.2992435], [48.8556952, 2.2992416], [48.8557237, 2.2992645], [48.8557722, 2.2993008], [48.8558331, 2.2993353], [48.8558911, 2.2993655], [48.855902, 2.2993762], [48.8559173, 2.2994025], [48.8559449, 2.2994527], [48.8559606, 2.2994959], [48.8559728, 2.2995403], [48.8559797, 2.2995788], [48.8559795, 2.2996001], [48.8559735, 2.2996119], [48.8559642, 2.2996176], [48.8559542, 2.299619], [48.8555495, 2.2994936], [48.855546, 2.2994812], [48.8555465, 2.299472], [48.8556159, 2.2993559], [48.8556198, 2.2993615], [48.8556559, 2.2993041], [48.855652, 2.2992985]]',1106,1),
('[[48.8545936, 2.2982904], [48.8545887, 2.2982963], [48.8545815, 2.2982977], [48.8545768, 2.2982955], [48.8545073, 2.2981923], [48.8545055, 2.2981762], [48.854508, 2.2981656], [48.8545124, 2.2981569], [48.8547076, 2.2978529], [48.854715, 2.2978502], [48.8547227, 2.2978553], [48.8547268, 2.2978658], [48.8547336, 2.2979133], [48.854731, 2.2979712], [48.8547203, 2.2980228], [48.8546995, 2.2980731], [48.854625, 2.2982416], [48.8546192, 2.298236], [48.8545936, 2.2982904]]',546,1),
('[[48.8565239, 2.2997889], [48.8567687, 2.2994073], [48.8569479, 2.2996675], [48.8569478, 2.2997145], [48.8568384, 2.2998866], [48.8565239, 2.2997889]]',1335,1),
('[[48.8570823, 2.2989155], [48.8573361, 2.2985279], [48.8574082, 2.2989985], [48.8572942, 2.2991778], [48.8572627, 2.2991795], [48.8570823, 2.2989155]]',1379,1),
('[[48.8548572, 2.2966322], [48.8548935, 2.2966306], [48.8550734, 2.2968946], [48.854822, 2.2972882], [48.8547496, 2.2968026], [48.8548572, 2.2966322]]',1389,1),
('[[48.8553821, 2.2964129], [48.8552073, 2.2961516], [48.855207, 2.2961014], [48.8553214, 2.2959189], [48.8556333, 2.2960238], [48.8553821, 2.2964129]]',1379,1),
('[[48.8623126, 2.3313038], [48.8632275, 2.3319716], [48.8630434, 2.3325348], [48.8630369, 2.3325553], [48.8630255, 2.3325911], [48.8628229, 2.333228], [48.8621795, 2.3327489], [48.8622013, 2.3326782], [48.862147, 2.3326369], [48.862111, 2.3326095], [48.8620901, 2.3325936], [48.8621217, 2.3325013], [48.8621357, 2.3324492], [48.8621235, 2.3324401], [48.8620619, 2.3323941], [48.8620311, 2.3323702], [48.8619794, 2.3323326], [48.8621222, 2.3318916], [48.8623126, 2.3313038]]',16772,2),
('[[48.8643354, 2.3229439], [48.8643287, 2.3230494], [48.864329, 2.3231615], [48.8643059, 2.3231665], [48.8643164, 2.3233264], [48.8643062, 2.323347], [48.8642871, 2.3233578], [48.8642695, 2.3233685], [48.8642916, 2.3234629], [48.8643175, 2.3234511], [48.864325, 2.3234778], [48.8642, 2.3235466], [48.8641798, 2.3236126], [48.8639433, 2.3234417], [48.8640081, 2.3232324], [48.8643354, 2.3229439]]',1760,2),
('[[48.863387, 2.3298115], [48.8632157, 2.3303493], [48.8632352, 2.3303644], [48.8632799, 2.330648], [48.863529, 2.3308299], [48.8637677, 2.3300877], [48.863387, 2.3298115]]',4048,2),
('[[48.8633321, 2.3297699], [48.8632023, 2.3296785], [48.8631901, 2.3297182], [48.8631575, 2.3297013], [48.8631063, 2.3297674], [48.8630325, 2.3298295], [48.8629797, 2.3298563], [48.862927, 2.3298709], [48.86289, 2.3298744], [48.8628431, 2.3298711], [48.862816, 2.3299588], [48.8627858, 2.3299365], [48.8626953, 2.3302255], [48.8629684, 2.3304156], [48.8631407, 2.3302946], [48.86316, 2.3303063], [48.8633321, 2.3297699]]',3218,2),
('[[48.8655329, 2.3238325], [48.8656562, 2.3234451], [48.8654844, 2.3233197], [48.8655329, 2.3238325]]',505,2),
('[[48.8641058, 2.3221637], [48.8638409, 2.3229749], [48.8644526, 2.3224216], [48.8641058, 2.3221637]]',2153,2),
('[[48.8627519, 2.3264154], [48.8629235, 2.3265472], [48.8630909, 2.3260438], [48.8629192, 2.325912], [48.8627519, 2.3264154]]',1336,2),
('[[48.8646767, 2.3251663], [48.864487, 2.3250278], [48.8643469, 2.3254715], [48.8645367, 2.3256099], [48.8646767, 2.3251663]]',1276,2),
('[[48.8635865, 2.3262692], [48.8633542, 2.3260972], [48.8631582, 2.3267089], [48.8633905, 2.326881], [48.8635865, 2.3262692]]',2166,2),
('[[48.8640729, 2.3247268], [48.8638374, 2.3245614], [48.8637045, 2.3249985], [48.8639329, 2.32518], [48.8640729, 2.3247268]]',1563,2),
('[[48.8641987, 2.3267166], [48.8640025, 2.3265712], [48.8638058, 2.3271899], [48.8640015, 2.3273366], [48.8641987, 2.3267166]]',1849,2),
('[[48.8644058, 2.3260533], [48.8642085, 2.3259062], [48.8641367, 2.3261288], [48.8643339, 2.3262759], [48.8644058, 2.3260533]]',671,2),
('[[48.8636719, 2.3287068], [48.8636082, 2.3286601], [48.863366, 2.3284827], [48.8632733, 2.3284147], [48.8632216, 2.3285782], [48.8631581, 2.3287792], [48.8631829, 2.3287988], [48.8631558, 2.328886], [48.8631934, 2.3289557], [48.8632251, 2.3290364], [48.8632507, 2.329147], [48.8632614, 2.3292519], [48.8632613, 2.3293146], [48.8632565, 2.3293754], [48.8632908, 2.3294007], [48.8632777, 2.3294424], [48.8633433, 2.32949], [48.8634072, 2.3295364], [48.86362, 2.3288692], [48.8636719, 2.3287068]]',3986,2),
('[[48.8630864, 2.3282792], [48.8626537, 2.3279621], [48.862602, 2.328124], [48.86239, 2.3287871], [48.8625552, 2.3289079], [48.8625693, 2.3288672], [48.8626028, 2.3288921], [48.8626343, 2.3288478], [48.8626775, 2.3287974], [48.8627333, 2.328752], [48.8627871, 2.328727], [48.8628345, 2.3287128], [48.8628865, 2.3287078], [48.8629172, 2.3287118], [48.8629452, 2.3286236], [48.8629713, 2.3286417], [48.8630351, 2.3284408], [48.8630864, 2.3282792]]',4410,2),
('[[48.8615352, 2.3294522], [48.8613616, 2.330023], [48.8622156, 2.3306407], [48.8622466, 2.3305349], [48.8622675, 2.3305503], [48.862304, 2.3305771], [48.8623384, 2.3306017], [48.8624881, 2.3301562], [48.8621499, 2.3299076], [48.8621431, 2.329918], [48.8621276, 2.3299424], [48.862106, 2.3299621], [48.8620887, 2.3299762], [48.8620565, 2.3299884], [48.8620306, 2.3299894], [48.8620028, 2.329979], [48.8619811, 2.3299659], [48.8619558, 2.3299424], [48.8619354, 2.3299104], [48.8619212, 2.3298785], [48.8619082, 2.3298287], [48.8619051, 2.3297836], [48.8619076, 2.3297301], [48.8616717, 2.3295539], [48.8616284, 2.3295219], [48.8615352, 2.3294522]]',7500,2),
('[[48.8635052, 2.3309058], [48.863334, 2.3314438], [48.8625947, 2.3309022], [48.8626224, 2.3308113], [48.8626066, 2.3307985], [48.8625921, 2.3307883], [48.862531, 2.3307441], [48.8626743, 2.3302928], [48.86298, 2.3305173], [48.8629763, 2.3305476], [48.8629759, 2.3305866], [48.8629814, 2.3306303], [48.8629918, 2.3306681], [48.8630078, 2.3307036], [48.8630272, 2.3307318], [48.8630492, 2.3307532], [48.8630713, 2.3307667], [48.8630946, 2.3307741], [48.8631248, 2.3307744], [48.8631528, 2.3307653], [48.8631765, 2.3307495], [48.8632004, 2.3307237], [48.8632183, 2.3306941], [48.8635052, 2.3309058]]',6295,2),
('[[48.8625949, 2.3279205], [48.8621915, 2.3276263], [48.8619298, 2.3284494], [48.8623286, 2.3287491], [48.8625949, 2.3279205]]',5047,2),
('[[48.863726, 2.3287458], [48.8641039, 2.3290245], [48.8638398, 2.3298563], [48.86346, 2.3295771], [48.8636737, 2.3289091], [48.863726, 2.3287458]]',4792,2),
('[[48.8629335, 2.3257835], [48.8627347, 2.3264007], [48.8627059, 2.3263793], [48.8629047, 2.3257621], [48.8629335, 2.3257835]]',271,2),
('[[48.8631263, 2.3259286], [48.8629528, 2.3258033], [48.8629335, 2.3258651], [48.863107, 2.3259903], [48.8631263, 2.3259286]]',161,2),
('[[48.8637981, 2.3255985], [48.8635717, 2.3254319], [48.8635004, 2.3256557], [48.8637268, 2.3258223], [48.8637981, 2.3255985]]',770,2),
('[[48.8625671, 2.3267905], [48.8627713, 2.3269395], [48.8626187, 2.3274227], [48.8624145, 2.3272736], [48.8625671, 2.3267905]]',1495,2),
('[[48.8610681, 2.3324598], [48.8610205, 2.3326111], [48.8611201, 2.3326835], [48.8611489, 2.3325921], [48.8611092, 2.3325633], [48.8611281, 2.3325034], [48.8610681, 2.3324598]]',192,2),
('[[48.8612042, 2.3324192], [48.8611602, 2.3323875], [48.8611407, 2.3324501], [48.8610834, 2.3324088], [48.8611312, 2.3322553], [48.8612325, 2.3323282], [48.8612042, 2.3324192]]',193,2),
('[[48.8612586, 2.3325326], [48.8612775, 2.3324723], [48.8612381, 2.3324436], [48.8612654, 2.3323568], [48.8613641, 2.3324285], [48.8613178, 2.3325757], [48.8612586, 2.3325326]]',183,2),
('[[48.8612417, 2.332585], [48.8612229, 2.3326452], [48.8611825, 2.332616], [48.8611545, 2.3327057], [48.8612537, 2.3327774], [48.8613006, 2.3326276], [48.8612417, 2.332585]]',187,2),
('[[48.8650118, 2.3239886], [48.8650853, 2.3239498], [48.8650871, 2.3239549], [48.8650911, 2.3239621], [48.865098, 2.3239699], [48.8651044, 2.3239741], [48.8651101, 2.3239767], [48.8651161, 2.3239783], [48.8651216, 2.3239779], [48.8651269, 2.3239753], [48.8651327, 2.3239704], [48.8651377, 2.3239638], [48.8651413, 2.3239576], [48.8651441, 2.3239502], [48.8651457, 2.3239428], [48.8651462, 2.3239339], [48.8651456, 2.3239237], [48.8651435, 2.3239144], [48.8651392, 2.3239053], [48.8651345, 2.3238997], [48.8651291, 2.3238974], [48.8651244, 2.323897], [48.8651193, 2.3238986], [48.8651153, 2.3239022], [48.865112, 2.3239079], [48.8651107, 2.3239139], [48.8651112, 2.3239204], [48.8651121, 2.3239255], [48.8651138, 2.3239292], [48.8651173, 2.3239329], [48.8651208, 2.3239346], [48.8651245, 2.3239353], [48.8651278, 2.3239352], [48.8651303, 2.3239346], [48.8651286, 2.3239394], [48.8651258, 2.3239421], [48.8651214, 2.3239434], [48.8651155, 2.3239424], [48.8651093, 2.3239388], [48.8651036, 2.3239337], [48.8650984, 2.3239262], [48.865095, 2.3239183], [48.8650931, 2.3239104], [48.8650929, 2.3239028], [48.8650937, 2.3238955], [48.8650955, 2.3238897], [48.8650993, 2.3238847], [48.8651901, 2.3237953], [48.8651768, 2.3237639], [48.8652054, 2.3237295], [48.8652222, 2.3237056], [48.8652369, 2.3236799], [48.8652862, 2.3241747], [48.8652332, 2.3243408], [48.8650341, 2.3241999], [48.8650491, 2.3241481], [48.8650118, 2.3239886]]',1225,2),
('[[48.861967, 2.3317466], [48.861881, 2.3316835], [48.8618144, 2.3316347], [48.8617122, 2.3315597], [48.8611084, 2.3311167], [48.8611272, 2.331039], [48.8611455, 2.3310507], [48.8612448, 2.3309463], [48.8613556, 2.3306034], [48.8621924, 2.3312137], [48.8620236, 2.3317434], [48.8620137, 2.331736], [48.8621323, 2.331365], [48.8620082, 2.3312861], [48.8619493, 2.3312508], [48.8618938, 2.3312193], [48.8618384, 2.3311895], [48.8617079, 2.3311264], [48.8617073, 2.3311307], [48.8617049, 2.3311297], [48.8617042, 2.3311345], [48.8617443, 2.3311531], [48.8618104, 2.3311847], [48.8618708, 2.3312156], [48.8619296, 2.3312487], [48.8620162, 2.3313002], [48.8621246, 2.3313696], [48.8619984, 2.3317645], [48.8619735, 2.3317461], [48.8620657, 2.3314036], [48.8620223, 2.3313731], [48.8619773, 2.3313424], [48.8618906, 2.3312892], [48.8618148, 2.331246], [48.8617188, 2.3311968], [48.8617181, 2.3312043], [48.8617673, 2.3312298], [48.86182, 2.3312582], [48.8618372, 2.331268], [48.8618834, 2.3312944], [48.8619216, 2.3313167], [48.8619543, 2.3313358], [48.8620219, 2.3313809], [48.8620588, 2.3314077], [48.861967, 2.3317466]]',7169,2),
('[[48.8619798, 2.3318246], [48.8619571, 2.3318078], [48.8618406, 2.3322404], [48.8618358, 2.3322374], [48.8619505, 2.3318098], [48.8619434, 2.3318052], [48.8619465, 2.331794], [48.8618734, 2.3317403], [48.8618126, 2.3316957], [48.8617154, 2.3316243], [48.8616394, 2.3315685], [48.8615121, 2.331475], [48.8614148, 2.3314036], [48.861095, 2.3311687], [48.8609777, 2.3316707], [48.8610003, 2.331683], [48.861045, 2.3314869], [48.8611507, 2.331549], [48.8610826, 2.331834], [48.8609758, 2.331777], [48.8609939, 2.3317073], [48.8609715, 2.3316961], [48.8609435, 2.3318173], [48.8609493, 2.3318208], [48.8609566, 2.3318275], [48.8609645, 2.3318378], [48.8609702, 2.331849], [48.8609739, 2.3318603], [48.860975, 2.3318693], [48.8609759, 2.3318776], [48.8615321, 2.3322846], [48.8615544, 2.3322108], [48.8615971, 2.3322418], [48.8615882, 2.3322044], [48.8615934, 2.3322064], [48.8616014, 2.3322094], [48.8616107, 2.332252], [48.861637, 2.332271], [48.8616317, 2.3322305], [48.8616374, 2.3322327], [48.8616447, 2.3322356], [48.861651, 2.3322809], [48.8616907, 2.332307], [48.8616779, 2.332132], [48.8616817, 2.332134], [48.8616895, 2.332138], [48.8616936, 2.3321974], [48.8617068, 2.332148], [48.8617208, 2.3321573], [48.8617193, 2.332114], [48.8617249, 2.3321163], [48.8617313, 2.3321191], [48.861732, 2.3321653], [48.8617762, 2.3321973], [48.8617783, 2.3321528], [48.8617838, 2.3321545], [48.8617894, 2.3321562], [48.8617874, 2.3321931], [48.8617946, 2.3321983], [48.8617974, 2.332196], [48.8618013, 2.3321937], [48.8618054, 2.3321927], [48.8618096, 2.3321925], [48.8618152, 2.3321931], [48.861817, 2.3321788], [48.8618228, 2.3321804], [48.8618282, 2.3321818], [48.8618232, 2.3322334], [48.8618447, 2.3322483], [48.8619798, 2.3318246]]',7375,2),
('[[48.861864, 2.3322624], [48.8618499, 2.332252], [48.8619743, 2.3318597], [48.8619884, 2.3318701], [48.861864, 2.3322624]]',84,2),
('[[48.8638663, 2.3283332], [48.863803, 2.328533], [48.8641496, 2.3287864], [48.8642128, 2.3285867], [48.8638663, 2.3283332]]',1050,2),
('[[48.862253894065134, 2.328988909721375], [48.86190804126785, 2.3287206888198857], [48.86173864310744, 2.3288065195083623], [48.86155512778662, 2.3293805122375493], [48.86190804126785, 2.32961654663086], [48.86204214773824, 2.3294985294342045], [48.8620880261851, 2.329514622688294]]',4790,2),
('[[48.862486813989996, 2.3291552066802983], [48.862324475975036, 2.3290532827377324], [48.86215507922407, 2.3295521736145024], [48.862211544871435, 2.329836487770081], [48.86251504663452, 2.3300778865814213], [48.86261033169214, 2.3297452926635747]]',3607,2),
('[[48.862818546557115, 2.333307266235352], [48.86214096280227, 2.332786917686463], [48.8619786236655, 2.3332643508911137], [48.862059793299686, 2.333307266235352], [48.862013914826974, 2.333430647850037], [48.86262091890956, 2.333886623382569]]',6012,2),
('[[48.8645901024019, 2.3259580135345463], [48.86439601069696, 2.326542735099793], [48.8647806644344, 2.326843142509461], [48.86498887026998, 2.326263785362244]]',3560,2),
('[[48.8646913, 2.3020434], [48.8641267, 2.3019898], [48.8642678, 2.3100793], [48.8648607, 2.3101115]]',57526,3),
('[[48.86308684251744, 2.302043437957764], [48.862550425676986, 2.302000522613526], [48.862621007168684, 2.310240268707276], [48.86310095867244, 2.310261726379395]]',51507,3),
('[[48.8630479348123, 2.3105031251907353], [48.86263503519599, 2.310487031936646], [48.862910301985366, 2.3117208480834965], [48.8630044393616, 2.3177611827850346], [48.86272917309, 2.318898439407349], [48.86293385841068, 2.319070100784302], [48.863230297735754, 2.3178577423095708]]',22651,3),
('[[48.864557195099316, 2.310433387756348], [48.8642466478059, 2.3105192184448247], [48.86439486379996, 2.3182332515716557], [48.864550137227695, 2.3185443878173833], [48.86474069941235, 2.3182332515716557]]',32116,3),
('[[48.8627620815946, 2.3194080591201787], [48.86265973868766, 2.319327592849732], [48.860051688476084, 2.327942848205567], [48.86013991972993, 2.328034043312073], [48.86078223857036, 2.326564192771912], [48.86276561065663, 2.319477796554566]]',24281,3),
('[[48.8635490562663, 2.321720123291016], [48.863845491947465, 2.320674061775208], [48.86377844117325, 2.3206418752670293], [48.860708125278656, 2.329986691474915], [48.86087046853638, 2.3299974203109746]]',16135,3),
('[[48.859425859739254, 2.330034971237183], [48.85840235303137, 2.333060503005982], [48.857894121234764, 2.3351633548736577], [48.858070591193375, 2.336225509643555]]',19384,3),
('[[48.86064812872408, 2.330732345581055], [48.860595190527945, 2.330485582351685], [48.86002698369713, 2.3325669765472417], [48.8591623087519, 2.3369336128234868], [48.85913054489806, 2.3377704620361333], [48.85919054327173, 2.3378187417984013], [48.86005874698211, 2.333382368087769]]',16044,3),
('[[48.85784938599065, 2.3373842239379887], [48.85767291525219, 2.3373895883560185], [48.85748585559017, 2.3381137847900395], [48.856222302206724, 2.3403668403625493], [48.85638466001384, 2.340543866157532], [48.85752114991953, 2.3384195566177373]]',7858,3),
('[[48.85919054327173, 2.338124513626099], [48.85902819456518, 2.3380601406097417], [48.858876433341564, 2.3387145996093754], [48.85874584773435, 2.339996695518494], [48.85831173637515, 2.342072725296021], [48.858484675497884, 2.3421531915664677], [48.85892584402302, 2.3400342464447026]]',9778,3),
('[[48.849676991129776, 2.3570394515991215], [48.84954991151808, 2.356749773025513], [48.85115956276866, 2.351363897323609], [48.85141371349892, 2.3515784740448002], [48.8505453598444, 2.3546898365020756]]',22010,3),
('[[48.855847024249215, 2.3510956764221196], [48.85579055142168, 2.3507952690124516], [48.854371650721866, 2.3536384105682377], [48.853108018731724, 2.3573613166809086], [48.85334804066962, 2.3576188087463383]]',31268,3),
('[[48.849364057026726, 2.3573184013366704], [48.84447828927594, 2.3646569252014165], [48.844591260387766, 2.3651719093322754], [48.8491240159892, 2.358798980712891], [48.84960409691351, 2.357704639434815]]',55287,3),
('[[48.8468364200829, 2.365021705627442], [48.84911333763399, 2.361486554145813], [48.85058533620148, 2.360917925834656], [48.85074418238085, 2.361234426498413], [48.849762857924055, 2.361395359039307], [48.84846733898859, 2.362951040267945], [48.847344764141134, 2.364673018455506]]',18470,3),
('[[48.85323508931278, 2.35782265663147], [48.85302330483182, 2.3576939105987553], [48.85194319004345, 2.360622882843018], [48.85078539406802, 2.3609125614166264], [48.85091247054407, 2.3612666130065922], [48.85178787750408, 2.361159324645996], [48.85223263485397, 2.3607087135314946]]',16935,3),
('[[48.85143956972279, 2.35133171081543], [48.851185419123766, 2.3511493206024174], [48.852343205848925, 2.3483490943908696], [48.85307739819241, 2.3468577861785893], [48.853197409378616, 2.346943616867066], [48.85223378202966, 2.348917722702027]]',10375,3),
('[[48.85320093911503, 2.3467504978179936], [48.8532221175283, 2.3465037345886235], [48.853786871910565, 2.3444491624832158], [48.85385393607025, 2.3444867134094243]]',1676,3),
('[[48.85624939130127, 2.340720891952515], [48.85609409212053, 2.340527772903443], [48.85480932587378, 2.342373132705689], [48.8538504063799, 2.344218492507935], [48.85394570793271, 2.344245314598084], [48.85482459147969, 2.342448234558106]]',5933,3),
('[[48.85843879374803, 2.3425126075744633], [48.85829056011499, 2.3424321413040166], [48.85740114909819, 2.345446944236756], [48.85710820470837, 2.3466968536376958], [48.85656466479314, 2.3486548662185673], [48.85589405546647, 2.35058069229126], [48.856070532476046, 2.35058605670929], [48.8566917266006, 2.3489713668823247], [48.85724938294156, 2.3468738794326787]]',20594,3),
('[[48.8435219, 2.3563383], [48.8435469, 2.3566588], [48.8435422, 2.3566832], [48.843537, 2.3566959], [48.8435161, 2.3567195], [48.8435045, 2.3567279], [48.8434012, 2.3567705], [48.8432313, 2.3568765], [48.8431971, 2.3568903], [48.8431891, 2.3568896], [48.8431816, 2.3568851], [48.8431779, 2.3568791], [48.8431747, 2.3568678], [48.8431749, 2.3568546], [48.8431796, 2.3568398], [48.8432863, 2.3566874], [48.843358, 2.3565152], [48.8434083, 2.3562794], [48.8434258, 2.3562432], [48.8434881, 2.3561639], [48.8434942, 2.3561608], [48.8435038, 2.3561627], [48.843508, 2.3561656], [48.8435128, 2.356171], [48.8435161, 2.3561774], [48.8435194, 2.3561949], [48.8435219, 2.3563383]]',1391,4),
('[[48.8434812, 2.3555652], [48.843536, 2.3556606], [48.8435444, 2.3556704], [48.843561, 2.3556985], [48.8435863, 2.3557744], [48.843596, 2.3558606], [48.8435895, 2.355948], [48.8435755, 2.3560026], [48.8435757, 2.3560106], [48.8435769, 2.3560166], [48.8435788, 2.3560211], [48.8435824, 2.3560245], [48.8435866, 2.3560268], [48.8435903, 2.3560271], [48.8435955, 2.3560255], [48.8436506, 2.3559908], [48.8437267, 2.3559148], [48.8437453, 2.3558739], [48.8437481, 2.3558595], [48.8437418, 2.3556052], [48.8437257, 2.3554991], [48.8437028, 2.3554315], [48.8436689, 2.3553748], [48.8436392, 2.3553435], [48.8435832, 2.3553059], [48.8435094, 2.3552837], [48.8434468, 2.3552886], [48.843371, 2.3553238], [48.8433622, 2.355335], [48.8433578, 2.3553481], [48.8433566, 2.3553606], [48.8433572, 2.355374], [48.8433597, 2.3553846], [48.8433633, 2.3553922], [48.8434812, 2.3555652]]',1845,4),
('[[48.8439489, 2.3573483], [48.8440272, 2.3574764], [48.8440633, 2.3575163], [48.8440788, 2.3575264], [48.8441057, 2.3575331], [48.8441233, 2.357531], [48.8441547, 2.3575148], [48.8441798, 2.3574847], [48.8441945, 2.3574517], [48.8442112, 2.3573938], [48.8442142, 2.3573576], [48.8442132, 2.3573297], [48.8442007, 2.3572782], [48.844055, 2.356972], [48.8440385, 2.3569516], [48.844024, 2.3569396], [48.8439884, 2.3569258], [48.8439732, 2.356926], [48.8439422, 2.3569404], [48.843828, 2.3570512], [48.8438219, 2.3570682], [48.8438207, 2.3570835], [48.8438224, 2.3571031], [48.8439489, 2.3573483]]',1716,4),
('[[48.8437527, 2.3551114], [48.8437501, 2.3551105], [48.8437181, 2.3552721], [48.8437138, 2.3552804], [48.8437003, 2.3552964], [48.8436904, 2.3553023], [48.8436724, 2.3553072], [48.8436578, 2.3553057], [48.8436277, 2.3552933], [48.843594, 2.355269], [48.8435224, 2.3552397], [48.8434252, 2.3552468], [48.8434201, 2.3552433], [48.8434165, 2.3552393], [48.8434142, 2.3552354], [48.8434131, 2.3552303], [48.8437212, 2.3551124], [48.8437444, 2.3551031], [48.8437534, 2.3551073], [48.8437527, 2.3551114]]',388,4),
('[[48.8433536, 2.355724], [48.8433614, 2.3557275], [48.8433676, 2.3557333], [48.843373, 2.355742], [48.8433776, 2.3557553], [48.8433942, 2.3558625], [48.8433914, 2.356013], [48.8433648, 2.3562189], [48.8433395, 2.3562941], [48.8432693, 2.3564194], [48.8432166, 2.3564692], [48.8431816, 2.3564854], [48.843144, 2.3564876], [48.8431339, 2.3564853], [48.8431215, 2.3564787], [48.843098, 2.3564583], [48.843089, 2.3564461], [48.8430719, 2.3564069], [48.8430658, 2.3563824], [48.8430604, 2.35633], [48.8430648, 2.3562587], [48.8430691, 2.3562456], [48.8430754, 2.3562363], [48.8430836, 2.3562291], [48.8430904, 2.3562259], [48.8431598, 2.3562281], [48.8432047, 2.3562076], [48.8432608, 2.3561466], [48.8433051, 2.3560557], [48.843317, 2.3560059], [48.84332, 2.3559789], [48.8433175, 2.3558941], [48.8432825, 2.355751], [48.8432818, 2.355741], [48.8432837, 2.3557325], [48.8432869, 2.3557259], [48.843291, 2.3557212], [48.8432965, 2.3557182], [48.8433536, 2.355724]]',1303,4),
('[[48.8438213, 2.3551431], [48.8437928, 2.3553683], [48.8437887, 2.3555431], [48.8437938, 2.3557322], [48.8438082, 2.3558292], [48.8438227, 2.3558685], [48.8438297, 2.3558793], [48.8438606, 2.3559052], [48.8438712, 2.3559091], [48.8438929, 2.3559085], [48.8439058, 2.3559015], [48.8439166, 2.355892], [48.8439263, 2.3558767], [48.8439337, 2.3558595], [48.8439395, 2.3558225], [48.8439342, 2.3557819], [48.8439231, 2.3557505], [48.843917, 2.3557569], [48.8438803, 2.3556815], [48.8438485, 2.3557134], [48.843813, 2.3556408], [48.8438159, 2.355638], [48.8438049, 2.3556118], [48.8438031, 2.3555978], [48.8438032, 2.3555789], [48.8438086, 2.3555516], [48.8438899, 2.3554716], [48.8438957, 2.3554614], [48.8438971, 2.355449], [48.8438961, 2.3554414], [48.8438939, 2.3554333], [48.8439431, 2.3553786], [48.8438279, 2.3551475], [48.8438213, 2.3551431]]',753,4),
('[[48.843533, 2.3557111], [48.8435403, 2.3557209], [48.8435545, 2.3557505], [48.8435661, 2.3557882], [48.8435721, 2.3558251], [48.8435692, 2.355899], [48.8435362, 2.3560552], [48.8435165, 2.3560871], [48.8434255, 2.3561806], [48.8434204, 2.3561821], [48.8434152, 2.3561798], [48.8434117, 2.3561754], [48.8434094, 2.3561696], [48.8434087, 2.3561628], [48.843416, 2.3558326], [48.8434349, 2.3557542], [48.8434534, 2.3557154], [48.8434634, 2.3557032], [48.8434742, 2.3556955], [48.8434853, 2.3556919], [48.8435045, 2.3556928], [48.843533, 2.3557111]]',713,4),
('[[48.8438042, 2.3561039], [48.8438152, 2.3562309], [48.8438519, 2.3563667], [48.8438641, 2.3563904], [48.8438947, 2.3564228], [48.84391, 2.3564311], [48.8439474, 2.3564374], [48.8439794, 2.3564249], [48.8439989, 2.3564091], [48.8440655, 2.356321], [48.844094, 2.3562606], [48.844103, 2.3562252], [48.844106, 2.3562006], [48.844106, 2.3561722], [48.8441032, 2.3561487], [48.8440898, 2.3561017], [48.8440642, 2.3560571], [48.8440234, 2.3560194], [48.8439322, 2.3559824], [48.84389, 2.3559796], [48.8438205, 2.3560019], [48.8438142, 2.3560117], [48.8438094, 2.3560229], [48.8438042, 2.3561039]]',1295,4),
('[[48.8435472, 2.3561988], [48.8435576, 2.356476], [48.8435804, 2.3566038], [48.8435922, 2.3566255], [48.8436011, 2.356634], [48.8436235, 2.3566469], [48.8436486, 2.3566489], [48.8436604, 2.3566457], [48.8436827, 2.3566283], [48.8436919, 2.3566167], [48.8437076, 2.3565768], [48.8437229, 2.3565121], [48.8437426, 2.3563051], [48.8437511, 2.3560546], [48.843747, 2.3560294], [48.8437424, 2.356019], [48.8437352, 2.3560086], [48.8437288, 2.3560034], [48.8437196, 2.3560004], [48.843714, 2.3560005], [48.8436794, 2.3560132], [48.8435825, 2.3560791], [48.8435687, 2.3560966], [48.8435575, 2.3561238], [48.8435472, 2.3561988]]',1292,4),
('[[48.8433614, 2.3554437], [48.8434076, 2.3555095], [48.8434202, 2.3555389], [48.8434229, 2.3555547], [48.8434229, 2.3555899], [48.8434168, 2.3556206], [48.8434022, 2.3556502], [48.8433919, 2.3556621], [48.8433554, 2.355683], [48.8432619, 2.3556836], [48.8431255, 2.3556696], [48.8430612, 2.3557012], [48.8430193, 2.3557389], [48.8429698, 2.35581], [48.8429652, 2.355812], [48.84296, 2.3558116], [48.8429544, 2.3558093], [48.84295, 2.3558042], [48.8429476, 2.3557971], [48.842947, 2.3557903], [48.8429506, 2.3557527], [48.8429621, 2.3557162], [48.8430581, 2.3555534], [48.843292, 2.35538], [48.8433614, 2.3554437]]',1126,4),
('[[48.8441121, 2.3558367], [48.8440822, 2.3558743], [48.844063, 2.3558994], [48.8440424, 2.3559254], [48.8440188, 2.3559553], [48.8440085, 2.3559686], [48.8440315, 2.3559773], [48.844048, 2.3559858], [48.8440666, 2.3560007], [48.8440827, 2.3560155], [48.8440945, 2.3560297], [48.8441086, 2.3560509], [48.8441235, 2.3560765], [48.8441335, 2.356099], [48.8441394, 2.3561195], [48.8441425, 2.3561319], [48.8441475, 2.3561369], [48.8441516, 2.3561386], [48.8441565, 2.3561383], [48.8441608, 2.3561348], [48.8442032, 2.3562434], [48.8442127, 2.3562578], [48.844223, 2.3562662], [48.8442328, 2.3562707], [48.8442456, 2.3562717], [48.8442569, 2.3562697], [48.8442651, 2.3562645], [48.8442738, 2.3562561], [48.8442825, 2.3562446], [48.8442413, 2.3561599], [48.8442463, 2.356154], [48.8442089, 2.3560801], [48.8442265, 2.3560591], [48.8442115, 2.3560298], [48.8441121, 2.3558367]]',487,4),
('[[48.8430068, 2.3612327], [48.8431037, 2.3616066], [48.8430856, 2.3616171], [48.8430172, 2.3616585], [48.8430503, 2.361784], [48.8427689, 2.3619517], [48.8426332, 2.3614238], [48.8426787, 2.361396], [48.842686, 2.3614248], [48.8430068, 2.3612327]]',2471,4),
('[[48.8431379, 2.3605821], [48.8431488, 2.3606235], [48.8430941, 2.3606555], [48.8431652, 2.3609338], [48.8431323, 2.3609536], [48.843129, 2.3609533], [48.8431264, 2.3609494], [48.8430489, 2.3606384], [48.843051, 2.3606293], [48.8430565, 2.3606222], [48.8431315, 2.3605771], [48.8431351, 2.3605781], [48.8431379, 2.3605821]]',205,4),
('[[48.843404, 2.3604768], [48.8433467, 2.3605092], [48.843334, 2.3604567], [48.8434224, 2.3604042], [48.8434255, 2.3604037], [48.8434285, 2.3604072], [48.8435107, 2.3607311], [48.8434736, 2.360755], [48.843404, 2.3604768]]',215,4),
('[[48.8418601, 2.3572645], [48.8419564, 2.3576341], [48.8419774, 2.3576194], [48.8419862, 2.3576208], [48.8419939, 2.3576255], [48.842001, 2.3576338], [48.8420095, 2.3576603], [48.8420088, 2.3576787], [48.8420061, 2.3576893], [48.8420021, 2.357698], [48.8419781, 2.3577132], [48.8421405, 2.3583421], [48.8421132, 2.3583552], [48.8420984, 2.3582916], [48.8420426, 2.3583254], [48.8417836, 2.3573123], [48.8418601, 2.3572645]]',1206,4),
('[[48.8422687, 2.3583231], [48.8423917, 2.35882], [48.8422932, 2.3588785], [48.8421671, 2.3583793], [48.8422687, 2.3583231]]',701,4),
('[[48.8419656, 2.3571943], [48.8422551, 2.3582696], [48.8422474, 2.3582739], [48.8422491, 2.3582898], [48.8421566, 2.3583343], [48.8420009, 2.3577253], [48.8420156, 2.3577032], [48.8420225, 2.357677], [48.8420228, 2.3576531], [48.8420182, 2.3576305], [48.8420094, 2.3576119], [48.8419944, 2.3575963], [48.8419799, 2.3575905], [48.8419676, 2.357591], [48.8418783, 2.3572504], [48.8419656, 2.3571943]]',1398,4),
('[[48.8431114, 2.3554679], [48.8432928, 2.3553574], [48.8432938, 2.3553516], [48.8432918, 2.3553461], [48.8432868, 2.3553468], [48.8431141, 2.3554298], [48.8431034, 2.3554676], [48.8431114, 2.3554679]]',57,4),
('[[48.8432579, 2.3614627], [48.843178, 2.3611471], [48.8431799, 2.3611377], [48.8431831, 2.3611307], [48.8432119, 2.3611128], [48.8432851, 2.3613926], [48.8433374, 2.3613634], [48.843348, 2.3614059], [48.843348, 2.3614113], [48.8433464, 2.3614151], [48.8432639, 2.3614636], [48.8432606, 2.3614646], [48.8432579, 2.3614627]]',215,4),
('[[48.8437665, 2.361903], [48.8437673, 2.3618984], [48.8437695, 2.3618948], [48.8437999, 2.3618783], [48.8438032, 2.3618788], [48.8438064, 2.3618819], [48.8439119, 2.362295], [48.8439104, 2.3623049], [48.8439061, 2.3623113], [48.8438257, 2.3623586], [48.8438208, 2.3623594], [48.8438163, 2.3623531], [48.8438046, 2.3623055], [48.8438609, 2.3622721], [48.8437665, 2.361903]]',285,4),
('[[48.8422694, 2.3575253], [48.8423201, 2.3574943], [48.842334, 2.3575231], [48.8423505, 2.3575466], [48.842367, 2.3575642], [48.8425086, 2.3581237], [48.8425092, 2.3581327], [48.8425056, 2.3581385], [48.8424298, 2.3581846], [48.8424225, 2.3581843], [48.8424175, 2.3581785], [48.8422633, 2.3575625], [48.8422617, 2.357543], [48.8422694, 2.3575253]]',820,4),
('[[48.842435, 2.3582451], [48.8424358, 2.3582361], [48.8424395, 2.3582282], [48.8424686, 2.3582119], [48.8425747, 2.358621], [48.8426244, 2.3585937], [48.8426276, 2.3585937], [48.84263, 2.3585964], [48.8426384, 2.3586275], [48.8426391, 2.3586391], [48.842638, 2.3586505], [48.8426339, 2.3586611], [48.8425627, 2.3587026], [48.8425582, 2.3587043], [48.8425535, 2.3587012], [48.8425498, 2.3586942], [48.842435, 2.3582451]]',297,4),
('[[48.8437359, 2.3630685], [48.8438467, 2.3634996], [48.8439674, 2.3634301], [48.8439752, 2.3634617], [48.8439544, 2.3634847], [48.8439452, 2.3635084], [48.8439396, 2.3635381], [48.8439395, 2.3635685], [48.8439441, 2.3635973], [48.8439415, 2.3636065], [48.8439357, 2.3636156], [48.8439296, 2.3636201], [48.8439229, 2.3636214], [48.8439175, 2.3636201], [48.8439129, 2.363617], [48.843874, 2.3636464], [48.8438269, 2.3636921], [48.8437498, 2.3634001], [48.843676, 2.3631053], [48.8437359, 2.3630685]]',671,4),
('[[48.8435194, 2.3609334], [48.8435574, 2.3609117], [48.8436373, 2.3612235], [48.8436373, 2.3612328], [48.8436345, 2.3612418], [48.8436287, 2.3612478], [48.8435544, 2.3612923], [48.8435499, 2.3612939], [48.8435469, 2.3612907], [48.8435367, 2.36125], [48.8435374, 2.3612452], [48.8435911, 2.361213], [48.8435194, 2.3609334]]',214,4),
('[[48.8432995, 2.3616362], [48.8433412, 2.361611], [48.8434483, 2.3620377], [48.8434081, 2.3620611], [48.8432995, 2.3616362]]',247,4),
('[[48.8437685, 2.3625266], [48.8439458, 2.3624236], [48.8439518, 2.3624337], [48.8440563, 2.3628506], [48.8439936, 2.3628869], [48.8438949, 2.3624926], [48.8437771, 2.3625607], [48.8437685, 2.3625266]]',435,4),
('[[48.8434592, 2.3620802], [48.8435554, 2.3624532], [48.8436094, 2.3624195], [48.8436196, 2.3624613], [48.8436199, 2.3624715], [48.8436166, 2.3624801], [48.843529, 2.3625301], [48.8434221, 2.3621097], [48.8434232, 2.3621038], [48.8434266, 2.3620986], [48.8434592, 2.3620802]]',280,4),
('[[48.8437383, 2.3625458], [48.8437462, 2.3625768], [48.8436264, 2.3626477], [48.8437265, 2.3630383], [48.8436677, 2.3630731], [48.8435597, 2.3626515], [48.8437383, 2.3625458]]',404,4),
('[[48.8427755, 2.3580304], [48.8428111, 2.3580083], [48.8429324, 2.3584821], [48.8428544, 2.3585317], [48.8428469, 2.3585324], [48.8428418, 2.3585286], [48.8428382, 2.3585226], [48.8428264, 2.3584774], [48.8428782, 2.358446], [48.8427755, 2.3580304]]',297,4),
('[[48.8425601, 2.3574456], [48.8425643, 2.3574112], [48.8425647, 2.3573817], [48.8425629, 2.3573583], [48.8426249, 2.3573149], [48.8427999, 2.3579622], [48.8427162, 2.3580154], [48.8427039, 2.3580094], [48.8425601, 2.3574456]]',812,4),
('[[48.8437536, 2.3618566], [48.843648, 2.3614324], [48.8436848, 2.3614098], [48.8437929, 2.3618332], [48.8437536, 2.3618566]]',228,4),
('[[48.8440019, 2.3629168], [48.844065, 2.36288], [48.8442114, 2.3634723], [48.8441677, 2.3634828], [48.8441263, 2.3634989], [48.8440848, 2.3635221], [48.8440772, 2.3634958], [48.8440638, 2.3634708], [48.84405, 2.3634555], [48.8440358, 2.3634461], [48.8440202, 2.3634413], [48.8440053, 2.3634415], [48.8439985, 2.3634122], [48.8441105, 2.3633473], [48.8440019, 2.3629168]]',669,4),
('[[48.8444296, 2.3574624], [48.8444661, 2.3574795], [48.8444975, 2.3575046], [48.8445212, 2.3575279], [48.8445418, 2.357555], [48.8445709, 2.3575977], [48.8445936, 2.3576441], [48.844607, 2.3576815], [48.8446241, 2.3577371], [48.844638, 2.3577939], [48.8446443, 2.357843], [48.8446466, 2.3578957], [48.8446461, 2.3579449], [48.8446367, 2.3579899], [48.8446237, 2.3580216], [48.8446086, 2.3580521], [48.8445888, 2.3580839], [48.8445594, 2.3581183], [48.8445287, 2.3581478], [48.8444784, 2.3581775], [48.8444604, 2.3581796], [48.844438, 2.358175], [48.8444175, 2.3581625], [48.8443909, 2.3581338], [48.8443525, 2.3580766], [48.8443259, 2.3580333], [48.8443077, 2.3580044], [48.8442493, 2.3578735], [48.8441727, 2.3577077], [48.8441621, 2.3576654], [48.8441897, 2.3576674], [48.8442028, 2.3576479], [48.8442058, 2.3576133], [48.8441932, 2.357577], [48.8442306, 2.3575323], [48.8442836, 2.35748], [48.8443187, 2.3574596], [48.8443595, 2.3574493], [48.8443867, 2.357449], [48.8444123, 2.3574541], [48.8444296, 2.3574624]]',2925,4),
('[[48.8432179, 2.3583087], [48.8430731, 2.358389], [48.8428258, 2.3574209], [48.8428728, 2.357393], [48.8428765, 2.3574068], [48.8429399, 2.3573715], [48.8429428, 2.3573848], [48.8429857, 2.3573606], [48.8432179, 2.3583087]]',2007,4),
('[[48.8431394, 2.3609986], [48.8431398, 2.3609934], [48.8431429, 2.3609893], [48.8431749, 2.3609695], [48.8432027, 2.3610788], [48.8431671, 2.3610986], [48.8431653, 2.3610988], [48.843164, 2.3610978], [48.8431394, 2.3609986]]',57,4),
('[[48.8436749, 2.3601599], [48.8438247, 2.360073], [48.8438324, 2.3601005], [48.8436826, 2.360191], [48.8436749, 2.3601599]]',62,4),
('[[48.8434037, 2.3591044], [48.8435522, 2.3590162], [48.8435624, 2.3590575], [48.8434194, 2.359145], [48.8434122, 2.3591475], [48.8434047, 2.359146], [48.8433985, 2.3591405], [48.8433953, 2.3591321], [48.8433953, 2.3591237], [48.8433985, 2.359113], [48.8434037, 2.3591044]]',94,4),
('[[48.8434304, 2.3586378], [48.8433259, 2.3586986], [48.8433227, 2.3587038], [48.8433223, 2.3587099], [48.8433239, 2.3587161], [48.8433278, 2.3587203], [48.843332, 2.3587203], [48.8434353, 2.35866], [48.8434384, 2.358656], [48.843439, 2.3586486], [48.8434375, 2.3586422], [48.8434348, 2.3586392], [48.8434304, 2.3586378]]',34,4),
('[[48.8433401, 2.3584349], [48.8433521, 2.3584255], [48.8433675, 2.3584466], [48.8433856, 2.358461], [48.8434021, 2.3584664], [48.8434189, 2.3584617], [48.8434019, 2.3584275], [48.8433887, 2.3584275], [48.8433748, 2.3584208], [48.8433646, 2.3584064], [48.8433589, 2.3583826], [48.8431075, 2.3585282], [48.843221, 2.3589727], [48.8432422, 2.3589596], [48.8431387, 2.3585475], [48.8433401, 2.3584349]]',272,4),
('[[48.8436807, 2.3593443], [48.8436764, 2.3593247], [48.8437293, 2.3592935], [48.8437405, 2.3592887], [48.843754, 2.3592853], [48.8437684, 2.3592838], [48.8437801, 2.3592861], [48.843795, 2.3592928], [48.843809, 2.3593016], [48.8438209, 2.3593145], [48.8438337, 2.3593304], [48.843842, 2.359345], [48.8438299, 2.3593512], [48.8438224, 2.3593383], [48.8438122, 2.3593252], [48.8438016, 2.3593161], [48.8437889, 2.3593074], [48.8437748, 2.3593012], [48.8437611, 2.3593009], [48.8437448, 2.3593052], [48.8437237, 2.3593175], [48.8436807, 2.3593443]]',38,4),
('[[48.8438466, 2.3593872], [48.8438359, 2.3593933], [48.8438363, 2.3594094], [48.8438353, 2.3594273], [48.8438315, 2.3594489], [48.8438273, 2.3594652], [48.8438198, 2.3594813], [48.8438124, 2.359494], [48.8437985, 2.3595061], [48.8437834, 2.3595163], [48.8437325, 2.3595426], [48.8437364, 2.3595627], [48.8437957, 2.359527], [48.8438066, 2.3595185], [48.8438189, 2.3595066], [48.8438291, 2.3594935], [48.8438365, 2.3594779], [48.8438408, 2.3594625], [48.8438449, 2.3594467], [48.8438474, 2.3594251], [48.8438479, 2.3594075], [48.8438466, 2.3593872]]',37,4),
('[[48.8437535, 2.3596278], [48.8438971, 2.3595433], [48.843872, 2.3594234], [48.843871, 2.3594487], [48.8438689, 2.3594722], [48.8438641, 2.3594918], [48.8438567, 2.3595079], [48.8438476, 2.359525], [48.8438352, 2.3595404], [48.8438224, 2.3595532], [48.8438086, 2.3595644], [48.8437883, 2.3595775], [48.8437462, 2.3595995], [48.8437535, 2.3596278]]',81,4),
('[[48.8437327, 2.359377], [48.8437587, 2.3593627], [48.8437691, 2.3593622], [48.8437785, 2.3593663], [48.8437867, 2.3593755], [48.8437993, 2.3593693], [48.8437956, 2.3593601], [48.8437894, 2.3593532], [48.8437817, 2.3593483], [48.8437711, 2.3593443], [48.8437626, 2.3593426], [48.8437496, 2.3593465], [48.843697, 2.3593802], [48.8437069, 2.3593909], [48.8437327, 2.359377]]',22,4),
('[[48.8437952, 2.3597923], [48.8437906, 2.3597741], [48.8438417, 2.3597436], [48.8438568, 2.3597391], [48.8438717, 2.3597369], [48.843883, 2.3597409], [48.8438944, 2.3597476], [48.8439029, 2.3597622], [48.843909, 2.3597827], [48.8439095, 2.3598115], [48.8439046, 2.3598341], [48.8438956, 2.3598514], [48.8438817, 2.3598635], [48.8438241, 2.3598967], [48.8438193, 2.3598782], [48.8438789, 2.3598464], [48.8438898, 2.3598335], [48.8438944, 2.3598249], [48.8438966, 2.3598159], [48.8438974, 2.3598025], [48.8438963, 2.3597862], [48.8438929, 2.3597735], [48.8438865, 2.3597609], [48.8438786, 2.3597533], [48.843869, 2.3597528], [48.8438562, 2.359756], [48.8437952, 2.3597923]]',55,4),
('[[48.8438351, 2.3599362], [48.8438384, 2.359952], [48.8439046, 2.3599154], [48.8439189, 2.359901], [48.8439291, 2.3598856], [48.8439374, 2.3598688], [48.843943, 2.3598497], [48.8439474, 2.3598226], [48.8439498, 2.3598005], [48.8439489, 2.359777], [48.8439449, 2.3597569], [48.8439377, 2.3597354], [48.8439279, 2.35972], [48.8439178, 2.3597066], [48.8439065, 2.3596948], [48.8438931, 2.3596855], [48.8438821, 2.3596818], [48.8438642, 2.3596791], [48.8438507, 2.3596808], [48.8438437, 2.3596834], [48.8438472, 2.3597009], [48.8438598, 2.3596972], [48.8438748, 2.3596938], [48.84389, 2.3596968], [48.8439019, 2.3597039], [48.8439158, 2.3597193], [48.8439268, 2.3597388], [48.8439352, 2.3597606], [48.8439392, 2.3597911], [48.8439372, 2.3598222], [48.8439297, 2.3598501], [48.8439211, 2.3598732], [48.8439061, 2.3598903], [48.8438913, 2.3599041], [48.8438351, 2.3599362]]',59,4),
('[[48.8437767, 2.3597175], [48.8437812, 2.3597356], [48.8438234, 2.3597118], [48.8438194, 2.3596945], [48.8437767, 2.3597175]]',10,4),
('[[48.8439741, 2.359797], [48.8439751, 2.3598249], [48.843971, 2.3598569], [48.8439614, 2.3598901], [48.8439513, 2.3599076], [48.8439378, 2.3599294], [48.8439125, 2.3599523], [48.8438581, 2.3599859], [48.8438621, 2.3600005], [48.8438689, 2.3599944], [48.8439945, 2.3599176], [48.8440065, 2.3599629], [48.8438809, 2.3600398], [48.8438745, 2.3600448], [48.8438794, 2.3600606], [48.843952, 2.3600187], [48.843965, 2.3600177], [48.8439851, 2.3600231], [48.844003, 2.3600318], [48.8440239, 2.3600475], [48.8440413, 2.3600652], [48.8439741, 2.359797]]',135,4),
('[[48.8437611, 2.3596542], [48.8437683, 2.3596786], [48.8438395, 2.3596375], [48.8438525, 2.3596335], [48.8438682, 2.3596318], [48.843886, 2.3596372], [48.8439096, 2.3596506], [48.8439276, 2.359665], [48.8439449, 2.3596917], [48.8439127, 2.3595661], [48.8437611, 2.3596542]]',88,4),
('[[48.844076, 2.3601954], [48.8440729, 2.3602273], [48.8440656, 2.3602628], [48.8440535, 2.3602967], [48.8440387, 2.3603179], [48.8440189, 2.3603397], [48.8439484, 2.3603801], [48.8439576, 2.3604222], [48.8441097, 2.3603322], [48.844076, 2.3601954]]',122,4),
('[[48.8440337, 2.3602164], [48.8440449, 2.3602189], [48.8440438, 2.3602294], [48.8440408, 2.3602398], [48.8440363, 2.3602516], [48.8440309, 2.3602636], [48.8440248, 2.3602742], [48.8440176, 2.3602859], [48.8440104, 2.3602941], [48.8440019, 2.3603015], [48.8439923, 2.3603074], [48.8439375, 2.3603407], [48.8439329, 2.360323], [48.8439935, 2.3602864], [48.8440029, 2.3602804], [48.8440107, 2.360273], [48.844017, 2.3602646], [48.844023, 2.3602534], [48.8440285, 2.3602395], [48.8440319, 2.3602269], [48.8440337, 2.3602164]]',29,4),
('[[48.8440474, 2.360204], [48.8440365, 2.3602008], [48.8440374, 2.3601867], [48.8440367, 2.3601738], [48.8440352, 2.3601625], [48.8440323, 2.3601501], [48.8440297, 2.3601403], [48.8440248, 2.360129], [48.8440195, 2.3601195], [48.844012, 2.3601081], [48.8440191, 2.3600945], [48.8440244, 2.3601009], [48.8440282, 2.3601076], [48.8440331, 2.3601158], [48.8440371, 2.3601252], [48.844041, 2.360138], [48.8440432, 2.3601486], [48.8440461, 2.3601646], [48.8440473, 2.3601798], [48.844048, 2.3601947], [48.8440474, 2.360204]]',15,4),
('[[48.8438815, 2.360121], [48.8438773, 2.3601054], [48.843934, 2.3600714], [48.843945, 2.3600667], [48.8439577, 2.3600657], [48.8439712, 2.3600673], [48.8439848, 2.3600698], [48.843996, 2.3600752], [48.844009, 2.3600856], [48.8440034, 2.3600988], [48.8439936, 2.3600898], [48.8439819, 2.3600836], [48.8439672, 2.3600807], [48.8439549, 2.3600802], [48.8439424, 2.3600844], [48.8438815, 2.360121]]',26,4),
('[[48.8439196, 2.3602673], [48.8439239, 2.3602849], [48.8439859, 2.3602457], [48.8439925, 2.3602397], [48.8439972, 2.3602338], [48.8440018, 2.3602231], [48.8440052, 2.3602118], [48.8440071, 2.3601988], [48.8440077, 2.3601859], [48.8440068, 2.3601713], [48.8440035, 2.3601579], [48.8439998, 2.3601485], [48.8439915, 2.3601357], [48.8439856, 2.360131], [48.8439779, 2.3601265], [48.8439689, 2.3601233], [48.8439604, 2.360124], [48.84395, 2.360127], [48.843891, 2.360161], [48.8438954, 2.3601775], [48.8439521, 2.3601424], [48.8439599, 2.3601389], [48.8439672, 2.3601381], [48.8439742, 2.3601397], [48.8439831, 2.3601468], [48.84399, 2.3601535], [48.8439946, 2.3601625], [48.8439975, 2.3601768], [48.8439987, 2.3601895], [48.8439969, 2.3602043], [48.8439922, 2.3602169], [48.843985, 2.3602271], [48.8439795, 2.360233], [48.8439196, 2.3602673]]',47,4),
('[[48.84355, 2.3587629], [48.8435537, 2.3587762], [48.8436832, 2.3586984], [48.8436612, 2.358607], [48.8436573, 2.3586134], [48.8436551, 2.3586345], [48.8436495, 2.3586575], [48.8436402, 2.3586815], [48.8436279, 2.3586992], [48.8436136, 2.3587163], [48.843596, 2.3587333], [48.84355, 2.3587629]]',56,4),
('[[48.843573, 2.3588493], [48.8435694, 2.3588305], [48.843697, 2.35875], [48.8437208, 2.3588387], [48.8437156, 2.358839], [48.8437017, 2.3588253], [48.84369, 2.3588179], [48.8436767, 2.3588139], [48.8436615, 2.3588112], [48.8436445, 2.3588111], [48.843631, 2.3588154], [48.843573, 2.3588493]]',62,4),
('[[48.8435811, 2.3589507], [48.8435852, 2.3589696], [48.8436475, 2.3589312], [48.8436554, 2.3589301], [48.8436629, 2.3589324], [48.8436723, 2.3589385], [48.8436777, 2.3589435], [48.8436823, 2.3589535], [48.843686, 2.3589653], [48.8436874, 2.3589812], [48.8436857, 2.3589963], [48.8436814, 2.3590072], [48.8436755, 2.3590151], [48.8436658, 2.3590228], [48.8436075, 2.359058], [48.8436115, 2.3590758], [48.8436767, 2.3590365], [48.8436827, 2.3590305], [48.8436876, 2.3590236], [48.8436932, 2.3590114], [48.8436971, 2.3589973], [48.8436989, 2.3589832], [48.8436988, 2.3589703], [48.8436969, 2.3589582], [48.8436924, 2.3589447], [48.8436892, 2.3589371], [48.8436821, 2.3589291], [48.8436714, 2.3589192], [48.8436646, 2.3589143], [48.8436573, 2.3589128], [48.8436458, 2.3589155], [48.8435811, 2.3589507]]',53,4),
('[[48.8437372, 2.3589532], [48.8437246, 2.3589604], [48.843726, 2.3589819], [48.843724, 2.3590012], [48.8437192, 2.3590228], [48.8437128, 2.3590421], [48.8437042, 2.3590558], [48.8436927, 2.3590704], [48.8436786, 2.3590804], [48.8436212, 2.3591135], [48.843626, 2.3591329], [48.8436983, 2.3590903], [48.8437058, 2.3590826], [48.8437146, 2.3590695], [48.8437222, 2.3590548], [48.843728, 2.3590422], [48.8437322, 2.35903], [48.8437357, 2.3590117], [48.8437382, 2.3589955], [48.8437395, 2.3589773], [48.8437387, 2.3589636], [48.8437372, 2.3589532]]',43,4),
('[[48.843765, 2.3590171], [48.8437608, 2.3590194], [48.8437599, 2.3590328], [48.843757, 2.359046], [48.8437516, 2.3590593], [48.8437382, 2.3590924], [48.843728, 2.3591074], [48.8437152, 2.3591203], [48.8437002, 2.3591318], [48.8436351, 2.3591703], [48.8436426, 2.3592038], [48.8437897, 2.3591175], [48.843765, 2.3590171]]',94,4),
('[[48.8435699, 2.3589156], [48.8435642, 2.358895], [48.8436339, 2.3588563], [48.8436439, 2.3588535], [48.8436537, 2.3588528], [48.8436642, 2.3588533], [48.8436736, 2.3588558], [48.843683, 2.3588607], [48.8436935, 2.3588664], [48.8437034, 2.3588748], [48.8437116, 2.3588828], [48.8437188, 2.3588959], [48.8437265, 2.3589131], [48.8437173, 2.3589227], [48.8437073, 2.3589069], [48.8436987, 2.3588947], [48.843692, 2.3588863], [48.8436815, 2.3588779], [48.8436713, 2.3588731], [48.843657, 2.3588721], [48.843646, 2.3588721], [48.8436354, 2.3588759], [48.8435699, 2.3589156]]',41,4),
('[[48.8435246, 2.3587333], [48.8435201, 2.3587138], [48.8435867, 2.3586756], [48.8435944, 2.3586694], [48.8436028, 2.3586578], [48.8436121, 2.3586372], [48.8436168, 2.3586188], [48.8436201, 2.3585945], [48.8436206, 2.358567], [48.8436338, 2.3585619], [48.8436354, 2.3585866], [48.8436322, 2.3586112], [48.8436267, 2.3586349], [48.8436196, 2.3586551], [48.8436077, 2.3586764], [48.843597, 2.3586878], [48.8435854, 2.3586959], [48.8435246, 2.3587333]]',39,4),
('[[48.8434678, 2.3585138], [48.8434631, 2.3584969], [48.8435258, 2.3584605], [48.8435354, 2.3584562], [48.843546, 2.3584545], [48.8435588, 2.3584558], [48.843573, 2.3584597], [48.8435912, 2.3584689], [48.8436022, 2.358479], [48.8436133, 2.3584939], [48.8436223, 2.3585138], [48.8436135, 2.3585229], [48.8436064, 2.358509], [48.8435987, 2.3584957], [48.8435898, 2.358485], [48.8435814, 2.3584806], [48.8435699, 2.3584749], [48.8435535, 2.3584712], [48.8435424, 2.3584719], [48.8435304, 2.3584754], [48.8434678, 2.3585138]]',35,4),
('[[48.8434775, 2.358552], [48.8434823, 2.3585702], [48.8435434, 2.3585329], [48.8435507, 2.3585313], [48.8435641, 2.358535], [48.8435724, 2.3585428], [48.8435781, 2.3585549], [48.8435821, 2.3585707], [48.8435819, 2.3585883], [48.8435791, 2.358603], [48.8435731, 2.3586159], [48.8435667, 2.3586225], [48.8435052, 2.3586605], [48.8435087, 2.3586751], [48.8435713, 2.3586384], [48.8435813, 2.3586282], [48.8435873, 2.3586181], [48.843593, 2.3586015], [48.8435951, 2.3585859], [48.8435952, 2.3585715], [48.8435931, 2.3585579], [48.8435885, 2.3585447], [48.8435836, 2.358536], [48.8435788, 2.3585294], [48.8435686, 2.358521], [48.8435581, 2.3585153], [48.8435447, 2.3585152], [48.8434775, 2.358552]]',52,4),
('[[48.8434039, 2.3591767], [48.8434079, 2.3591928], [48.8433987, 2.3591948], [48.8433886, 2.3591924], [48.843381, 2.3591864], [48.8433726, 2.359177], [48.8433647, 2.3591646], [48.8433609, 2.3591507], [48.8433581, 2.3591351], [48.8433593, 2.3591146], [48.8433621, 2.3590999], [48.8433663, 2.359088], [48.8433737, 2.3590793], [48.8433789, 2.3590747], [48.8433826, 2.3590887], [48.8433755, 2.3590944], [48.843372, 2.3591046], [48.8433696, 2.359117], [48.8433686, 2.3591324], [48.8433699, 2.3591441], [48.8433741, 2.3591553], [48.8433801, 2.3591638], [48.8433874, 2.3591713], [48.8433962, 2.3591761], [48.8434039, 2.3591767]]',20,4),
('[[48.8434432, 2.3598425], [48.8434652, 2.3598288], [48.8435555, 2.3601864], [48.8435344, 2.3601993], [48.8434432, 2.3598425]]',109,4),
('[[48.8433416, 2.3594448], [48.8433644, 2.3594311], [48.8434561, 2.359784], [48.8434318, 2.3597976], [48.8433416, 2.3594448]]',117,4),
('[[48.8432342, 2.3590245], [48.8432556, 2.3590136], [48.8433479, 2.3593721], [48.8433262, 2.3593844], [48.8432342, 2.3590245]]',108,4),
('[[48.843358, 2.359372], [48.8434405, 2.3593221], [48.8434321, 2.3592876], [48.8434216, 2.3592917], [48.8434105, 2.3592937], [48.8433966, 2.3592942], [48.8433827, 2.3592928], [48.8433709, 2.3592876], [48.8433554, 2.3592786], [48.8433408, 2.359265], [48.843325, 2.3592419], [48.843358, 2.359372]]',73,4),
('[[48.8433476, 2.3589545], [48.8433538, 2.3589773], [48.8433411, 2.3589882], [48.8433296, 2.3590012], [48.8433197, 2.359015], [48.8433107, 2.3590343], [48.8433032, 2.3590561], [48.8432941, 2.3590894], [48.8432717, 2.3590011], [48.8433476, 2.3589545]]',48,4),
('[[48.8432497, 2.3589532], [48.8433352, 2.3589045], [48.8433313, 2.3588893], [48.8433198, 2.3588944], [48.8433079, 2.3588956], [48.8432909, 2.3588962], [48.843276, 2.358894], [48.8432639, 2.358889], [48.8432514, 2.3588788], [48.843238, 2.3588635], [48.8432225, 2.3588434], [48.8432497, 2.3589532]]',51,4),
('[[48.8432611, 2.3586168], [48.8432649, 2.3586332], [48.8432529, 2.3586436], [48.843245, 2.358655], [48.8432378, 2.3586707], [48.8432311, 2.3586914], [48.8432275, 2.3587155], [48.8432278, 2.3587411], [48.8432319, 2.3587685], [48.8432391, 2.3587881], [48.8432488, 2.3588052], [48.8432606, 2.3588213], [48.8432737, 2.3588317], [48.8432865, 2.3588367], [48.8433038, 2.3588374], [48.8433169, 2.3588344], [48.8433214, 2.3588508], [48.84331, 2.3588545], [48.843295, 2.358855], [48.8432806, 2.3588509], [48.8432663, 2.3588451], [48.8432553, 2.3588357], [48.8432442, 2.3588226], [48.843234, 2.3588062], [48.843224, 2.3587831], [48.8432181, 2.3587562], [48.8432159, 2.3587301], [48.8432182, 2.3586984], [48.8432226, 2.3586778], [48.8432307, 2.358657], [48.84324, 2.3586389], [48.843251, 2.3586256], [48.8432611, 2.3586168]]',46,4),
('[[48.8432801, 2.3586888], [48.8432757, 2.3586709], [48.8432691, 2.358679], [48.8432632, 2.3586888], [48.8432593, 2.3586995], [48.8432563, 2.3587133], [48.8432553, 2.3587286], [48.8432561, 2.3587442], [48.8432593, 2.3587576], [48.8432636, 2.3587683], [48.8432699, 2.3587785], [48.8432754, 2.3587849], [48.8432829, 2.35879], [48.8432898, 2.3587929], [48.8433, 2.3587921], [48.8432973, 2.3587782], [48.843291, 2.3587781], [48.8432841, 2.3587758], [48.8432775, 2.3587681], [48.8432716, 2.3587579], [48.8432682, 2.3587446], [48.8432671, 2.3587286], [48.8432678, 2.3587163], [48.8432713, 2.3587038], [48.8432743, 2.3586961], [48.8432801, 2.3586888]]',20,4),
('[[48.8436651, 2.3600926], [48.8436687, 2.3601066], [48.8438026, 2.3600294], [48.8437989, 2.3600155], [48.8436651, 2.3600926]]',26,4),
('[[48.8437293, 2.3604457], [48.8437338, 2.3604611], [48.8437245, 2.3604635], [48.8437135, 2.3604651], [48.8437026, 2.3604653], [48.8436936, 2.3604631], [48.843681, 2.3604576], [48.8436699, 2.3604487], [48.8436602, 2.3604405], [48.8436486, 2.3604261], [48.8436391, 2.360408], [48.8436323, 2.3603832], [48.8436292, 2.3603575], [48.8436281, 2.360334], [48.8436297, 2.3603136], [48.8436325, 2.3602948], [48.8436382, 2.3602801], [48.8436452, 2.3602641], [48.8436527, 2.3602497], [48.8436603, 2.3602397], [48.8436712, 2.3602289], [48.8436761, 2.360244], [48.8436668, 2.3602522], [48.8436596, 2.3602628], [48.8436516, 2.3602779], [48.8436451, 2.3602985], [48.843641, 2.3603173], [48.8436386, 2.3603356], [48.8436386, 2.360354], [48.8436407, 2.3603667], [48.8436452, 2.3603835], [48.8436527, 2.3604018], [48.8436596, 2.3604142], [48.8436676, 2.3604262], [48.8436793, 2.3604363], [48.8436953, 2.3604454], [48.8437072, 2.3604479], [48.8437173, 2.3604487], [48.8437293, 2.3604457]]',48,4),
('[[48.8436661, 2.3605771], [48.8439057, 2.3604341], [48.8438993, 2.360406], [48.8437576, 2.3604928], [48.8437351, 2.3605059], [48.8437186, 2.3605112], [48.8436985, 2.3605107], [48.8436831, 2.3605044], [48.8436706, 2.3604967], [48.8436522, 2.3604796], [48.8436353, 2.3604608], [48.8436661, 2.3605771]]',121,4),
('[[48.843678, 2.3603362], [48.8436685, 2.3603273], [48.843667, 2.3603343], [48.8436667, 2.3603436], [48.8436676, 2.3603536], [48.8436701, 2.3603654], [48.8436739, 2.3603753], [48.8436789, 2.3603838], [48.8436851, 2.3603925], [48.8436903, 2.3603974], [48.8436967, 2.3604024], [48.8437027, 2.3604051], [48.8437076, 2.3604058], [48.8437124, 2.3604053], [48.8437165, 2.3604037], [48.8437128, 2.360388], [48.8437085, 2.3603884], [48.8437042, 2.3603877], [48.8436988, 2.3603847], [48.8436921, 2.3603789], [48.8436876, 2.3603733], [48.8436842, 2.3603677], [48.8436805, 2.3603604], [48.843679, 2.3603546], [48.8436781, 2.3603491], [48.8436778, 2.3603438], [48.843678, 2.3603362]]',14,4),
('[[48.8437108, 2.3602677], [48.8436963, 2.3602784], [48.8436842, 2.3602946], [48.843692, 2.360304], [48.8437014, 2.3602921], [48.8437145, 2.3602825], [48.8438483, 2.3602053], [48.8438446, 2.3601906], [48.8437108, 2.3602677]]',33,4),
('[[48.8436973, 2.3602114], [48.843701, 2.3602262], [48.8438349, 2.360149], [48.8438312, 2.3601342], [48.8436973, 2.3602114]]',27,4),
('[[48.8437528, 2.360431], [48.8437565, 2.3604458], [48.8438903, 2.3603686], [48.8438867, 2.3603538], [48.8437528, 2.360431]]',27,4),
('[[48.8437384, 2.360375], [48.8437421, 2.3603898], [48.8438759, 2.3603126], [48.8438722, 2.3602979], [48.8437384, 2.360375]]',27,4),
('[[48.843297, 2.3586591], [48.8433006, 2.3586739], [48.8434345, 2.3585967], [48.8434308, 2.3585819], [48.843297, 2.3586591]]',27,4),
('[[48.8432831, 2.3586029], [48.8432867, 2.3586177], [48.8434206, 2.3585405], [48.8434169, 2.3585258], [48.8432831, 2.3586029]]',27,4),
('[[48.8433277, 2.358765], [48.8433314, 2.3587798], [48.8434653, 2.3587026], [48.8434616, 2.3586879], [48.8433277, 2.358765]]',27,4),
('[[48.8434579, 2.3592763], [48.8434658, 2.3593079], [48.8435996, 2.3592307], [48.8435918, 2.3591992], [48.8434579, 2.3592763]]',59,4),
('[[48.8433737, 2.3589435], [48.8433781, 2.3589618], [48.8435094, 2.3588856], [48.8435047, 2.3588668], [48.8433737, 2.3589435]]',34,4),
('[[48.8433423, 2.35882], [48.843346, 2.3588348], [48.8434772, 2.3587585], [48.8434735, 2.3587437], [48.8433423, 2.35882]]',27,4),
('[[48.8434288, 2.3591657], [48.8434325, 2.3591805], [48.8435663, 2.3591033], [48.8435626, 2.3590885], [48.8434288, 2.3591657]]',27,4),
('[[48.8433559, 2.3588763], [48.8433596, 2.3588911], [48.8434914, 2.3588157], [48.8434877, 2.3588009], [48.8433559, 2.3588763]]',27,4),
('[[48.8434013, 2.3590588], [48.843405, 2.3590736], [48.8435388, 2.3589964], [48.8435351, 2.3589816], [48.8434013, 2.3590588]]',27,4),
('[[48.8434434, 2.3592203], [48.843447, 2.3592351], [48.8435809, 2.3591579], [48.8435772, 2.3591432], [48.8434434, 2.3592203]]',27,4),
('[[48.8433865, 2.3590042], [48.8433902, 2.359019], [48.8435241, 2.3589419], [48.8435204, 2.3589271], [48.8433865, 2.3590042]]',27,4),
('[[48.8435042, 2.3594912], [48.8435088, 2.3595078], [48.8436511, 2.3594237], [48.8436469, 2.3594075], [48.8435042, 2.3594912]]',33,4),
('[[48.8436105, 2.3592823], [48.8436188, 2.3593177], [48.8434889, 2.3593912], [48.8434806, 2.3593586], [48.8436105, 2.3592823]]',62,4),
('[[48.8435317, 2.3595997], [48.8435363, 2.3596163], [48.8436785, 2.3595322], [48.8436744, 2.359516], [48.8435317, 2.3595997]]',33,4),
('[[48.8434947, 2.3594965], [48.8434856, 2.3595049], [48.8434772, 2.3595179], [48.8434722, 2.3595336], [48.8434682, 2.3595516], [48.8434684, 2.3595705], [48.8434711, 2.3595881], [48.8434758, 2.3595998], [48.8434857, 2.3596142], [48.8434953, 2.3596235], [48.8435024, 2.3596268], [48.8435134, 2.3596271], [48.8435275, 2.3596228], [48.8435224, 2.3596037], [48.8435093, 2.359604], [48.843499, 2.3596021], [48.8434909, 2.3595958], [48.8434839, 2.3595844], [48.8434809, 2.3595733], [48.8434804, 2.3595611], [48.8434818, 2.3595451], [48.8434856, 2.3595317], [48.8434922, 2.3595217], [48.8434994, 2.3595157], [48.8434947, 2.3594965]]',28,4),
('[[48.843473, 2.3594477], [48.8434773, 2.3594645], [48.84347, 2.3594704], [48.8434612, 2.3594814], [48.8434542, 2.3594935], [48.8434475, 2.3595094], [48.8434425, 2.3595277], [48.8434401, 2.3595456], [48.8434398, 2.3595691], [48.8434424, 2.3595891], [48.8434486, 2.3596132], [48.8434548, 2.3596276], [48.8434645, 2.3596437], [48.8434768, 2.3596578], [48.8434881, 2.3596645], [48.8434981, 2.3596682], [48.8435111, 2.35967], [48.8435232, 2.3596672], [48.8435282, 2.3596667], [48.8435335, 2.3596836], [48.8435263, 2.3596868], [48.8435092, 2.3596875], [48.8434953, 2.3596846], [48.8434807, 2.3596774], [48.8434695, 2.35967], [48.8434601, 2.3596586], [48.8434487, 2.3596452], [48.8434402, 2.3596288], [48.843435, 2.3596117], [48.8434305, 2.3595907], [48.8434273, 2.3595616], [48.8434283, 2.3595366], [48.8434328, 2.3595151], [48.8434387, 2.359496], [48.8434476, 2.3594772], [48.8434564, 2.3594623], [48.8434654, 2.3594519], [48.843473, 2.3594477]]',49,4),
('[[48.843378, 2.3594171], [48.8434025, 2.359514], [48.8434114, 2.3594834], [48.843423, 2.359456], [48.8434342, 2.3594368], [48.8434464, 2.3594204], [48.8434634, 2.3594087], [48.8434544, 2.3593731], [48.843378, 2.3594171]]',59,4),
('[[48.8434394, 2.3596922], [48.8434599, 2.3597094], [48.8434801, 2.3597217], [48.8434976, 2.3597272], [48.8435159, 2.359729], [48.8435302, 2.3597269], [48.8435431, 2.359721], [48.8435467, 2.3597352], [48.8434624, 2.359784], [48.8434394, 2.3596922]]',47,4),
('[[48.8435595, 2.3597867], [48.8435622, 2.3597981], [48.8435485, 2.3598108], [48.8435361, 2.3598248], [48.8435247, 2.3598409], [48.8435168, 2.3598595], [48.8435098, 2.3598801], [48.8435047, 2.3599022], [48.8435001, 2.3599325], [48.8434753, 2.3598363], [48.8435595, 2.3597867]]',45,4),
('[[48.843567, 2.3601658], [48.8436441, 2.3601207], [48.8436423, 2.3601113], [48.8436309, 2.3601154], [48.8436115, 2.3601198], [48.8435942, 2.360119], [48.8435799, 2.360114], [48.8435697, 2.3601089], [48.8435601, 2.3601007], [48.8435546, 2.3600943], [48.8435484, 2.3600979], [48.843567, 2.3601658]]',33,4),
('[[48.8436276, 2.3600546], [48.8436319, 2.3600726], [48.8436225, 2.3600766], [48.8436112, 2.3600776], [48.8436015, 2.3600774], [48.8435928, 2.3600749], [48.8435824, 2.3600693], [48.8435732, 2.3600631], [48.843563, 2.3600545], [48.8435519, 2.3600399], [48.8435449, 2.3600284], [48.843539, 2.3600158], [48.8435336, 2.3599999], [48.8435293, 2.3599797], [48.843529, 2.3599657], [48.8435291, 2.3599349], [48.8435311, 2.3599185], [48.8435367, 2.3598947], [48.8435435, 2.3598756], [48.8435512, 2.3598624], [48.8435607, 2.3598499], [48.8435686, 2.3598434], [48.8435726, 2.359841], [48.843576, 2.3598563], [48.8435677, 2.3598635], [48.8435594, 2.3598736], [48.8435519, 2.3598886], [48.8435465, 2.3599032], [48.8435413, 2.3599243], [48.8435397, 2.3599429], [48.8435393, 2.3599621], [48.8435426, 2.3599843], [48.8435481, 2.3600012], [48.8435564, 2.3600198], [48.8435656, 2.3600358], [48.8435793, 2.3600489], [48.843596, 2.360057], [48.84361, 2.360059], [48.8436191, 2.3600584], [48.8436276, 2.3600546]]',48,4),
('[[48.843591, 2.3599135], [48.8435875, 2.3599003], [48.8435821, 2.3599046], [48.8435782, 2.3599103], [48.8435734, 2.3599194], [48.8435698, 2.3599315], [48.8435681, 2.3599428], [48.8435682, 2.3599573], [48.8435709, 2.3599746], [48.8435749, 2.3599873], [48.8435804, 2.3599973], [48.8435876, 2.3600049], [48.8435955, 2.3600116], [48.8436061, 2.360017], [48.843612, 2.3600177], [48.8436185, 2.3600168], [48.8436136, 2.3599992], [48.8436061, 2.3600002], [48.8436001, 2.359997], [48.8435918, 2.3599915], [48.8435858, 2.3599822], [48.8435819, 2.3599726], [48.8435788, 2.3599605], [48.8435782, 2.3599496], [48.8435792, 2.3599371], [48.8435819, 2.3599268], [48.8435858, 2.3599185], [48.843591, 2.3599135]]',19,4),
('[[48.8434981, 2.3594329], [48.8435018, 2.3594477], [48.8436356, 2.3593705], [48.8436319, 2.3593557], [48.8434981, 2.3594329]]',27,4),
('[[48.8436529, 2.3600431], [48.8436566, 2.3600579], [48.8437904, 2.3599807], [48.8437867, 2.3599659], [48.8436529, 2.3600431]]',27,4),
('[[48.843639, 2.3599877], [48.8436427, 2.3600025], [48.8437765, 2.3599253], [48.8437729, 2.3599105], [48.843639, 2.3599877]]',27,4),
('[[48.8436115, 2.3598805], [48.8436152, 2.3598953], [48.843749, 2.3598181], [48.8437453, 2.3598033], [48.8436115, 2.3598805]]',27,4),
('[[48.8435971, 2.3598238], [48.8436008, 2.3598386], [48.8437347, 2.3597614], [48.843731, 2.3597467], [48.8435971, 2.3598238]]',27,4),
('[[48.8435536, 2.3596508], [48.8435573, 2.3596656], [48.8436911, 2.3595884], [48.8436874, 2.3595737], [48.8435536, 2.3596508]]',27,4),
('[[48.8435832, 2.3597705], [48.8435869, 2.3597853], [48.8437208, 2.3597081], [48.8437171, 2.3596934], [48.8435832, 2.3597705]]',27,4),
('[[48.8435672, 2.3597061], [48.8435708, 2.3597209], [48.8437047, 2.3596437], [48.843701, 2.3596289], [48.8435672, 2.3597061]]',27,4),
('[[48.8439413, 2.3633305], [48.8439567, 2.3633921], [48.8438483, 2.3634545], [48.8438324, 2.3633927], [48.8439413, 2.3633305]]',94,4),
('[[48.8439106, 2.3632146], [48.8439256, 2.3632748], [48.8438196, 2.3633368], [48.8438038, 2.3632767], [48.8439106, 2.3632146]]',90,4),
('[[48.8438806, 2.3630996], [48.8438956, 2.3631598], [48.8437894, 2.3632215], [48.8437736, 2.3631613], [48.8438806, 2.3630996]]',90,4),
('[[48.8440139, 2.3630202], [48.8440289, 2.3630803], [48.8439275, 2.363139], [48.8439117, 2.3630788], [48.8440139, 2.3630202]]',86,4),
('[[48.844074, 2.3632537], [48.844089, 2.3633138], [48.8439876, 2.3633725], [48.8439723, 2.3633117], [48.844074, 2.3632537]]',86,4),
('[[48.8440443, 2.3631363], [48.8440594, 2.3631964], [48.843958, 2.3632551], [48.8439422, 2.3631949], [48.8440443, 2.3631363]]',86,4),
('[[48.8437488, 2.363065], [48.8437648, 2.3631272], [48.8438714, 2.3630634], [48.8438554, 2.3630012], [48.8437488, 2.363065]]',94,4),
('[[48.8438875, 2.3629813], [48.8439035, 2.3630435], [48.8440061, 2.3629824], [48.8439901, 2.3629202], [48.8438875, 2.3629813]]',90,4),
('[[48.8437265, 2.3629784], [48.8437383, 2.3630254], [48.843845, 2.3629639], [48.8438332, 2.3629169], [48.8437265, 2.3629784]]',70,4),
('[[48.8438659, 2.3628986], [48.8438777, 2.3629456], [48.8439805, 2.3628858], [48.8439686, 2.3628388], [48.8438659, 2.3628986]]',68,4),
('[[48.8437165, 2.3629415], [48.8437046, 2.3628933], [48.8438115, 2.3628332], [48.8438238, 2.3628811], [48.8437165, 2.3629415]]',72,4),
('[[48.8436914, 2.362842], [48.8436775, 2.3627886], [48.8437842, 2.3627274], [48.843797, 2.3627781], [48.8436914, 2.362842]]',78,4),
('[[48.8436631, 2.362733], [48.8436492, 2.3626796], [48.8437551, 2.3626169], [48.8437687, 2.3626706], [48.8436631, 2.362733]]',80,4),
('[[48.8438016, 2.3626511], [48.8437877, 2.3625977], [48.8438913, 2.3625387], [48.8439042, 2.3625894], [48.8438016, 2.3626511]]',76,4),
('[[48.843857, 2.3628662], [48.8438431, 2.3628128], [48.8439467, 2.3627538], [48.8439596, 2.3628045], [48.843857, 2.3628662]]',76,4),
('[[48.8438295, 2.3627598], [48.8438156, 2.3627064], [48.8439192, 2.3626474], [48.8439321, 2.3626981], [48.8438295, 2.3627598]]',76,4),
('[[48.843745, 2.3618631], [48.843706, 2.3618877], [48.8437031, 2.3618889], [48.8437006, 2.3618886], [48.8436987, 2.3618867], [48.8435913, 2.361465], [48.8436417, 2.361436], [48.843746, 2.3618527], [48.8437461, 2.3618592], [48.843745, 2.3618631]]',297,4),
('[[48.843501, 2.3619986], [48.8435016, 2.3620051], [48.8435006, 2.3620094], [48.8434983, 2.3620115], [48.843458, 2.3620334], [48.843455, 2.3620329], [48.8434528, 2.3620299], [48.8433463, 2.3616079], [48.8433927, 2.3615796], [48.843501, 2.3619986]]',289,4),
('[[48.8434663, 2.3620768], [48.8435579, 2.3624402], [48.8435679, 2.3624361], [48.8435988, 2.362418], [48.8436066, 2.3624117], [48.8435156, 2.3620558], [48.8435129, 2.3620523], [48.84351, 2.3620508], [48.8434663, 2.3620768]]',248,4),
('[[48.8438049, 2.3622948], [48.8438025, 2.3622952], [48.8437122, 2.3619386], [48.8437119, 2.3619352], [48.8437129, 2.3619325], [48.8437592, 2.3619024], [48.8438499, 2.3622598], [48.8438502, 2.3622635], [48.8438489, 2.3622671], [48.8438049, 2.3622948]]',251,4),
('[[48.8428651, 2.3584433], [48.8428247, 2.3584672], [48.8427226, 2.3580739], [48.8427223, 2.3580681], [48.8427234, 2.3580625], [48.8427271, 2.3580583], [48.8427601, 2.3580377], [48.842765, 2.3580381], [48.8427694, 2.3580431], [48.8428687, 2.3584346], [48.8428683, 2.3584386], [48.8428673, 2.3584412], [48.8428651, 2.3584433]]',266,4),
('[[48.8425109, 2.3581879], [48.8425157, 2.3581867], [48.8425198, 2.3581879], [48.8425232, 2.3581915], [48.8425274, 2.3581977], [48.8426259, 2.3585812], [48.8425818, 2.3586065], [48.8425798, 2.3586072], [48.8425778, 2.358606], [48.8424758, 2.3582164], [48.8424762, 2.3582105], [48.8424788, 2.3582057], [48.8425109, 2.3581879]]',272,4),
('[[48.8427898, 2.3572898], [48.8429456, 2.3572014], [48.8429683, 2.3572886], [48.8429257, 2.357314], [48.8429286, 2.3573256], [48.8428654, 2.3573623], [48.8428687, 2.3573762], [48.842821, 2.3574033], [48.8427898, 2.3572898]]',221,4),
('[[48.8429325, 2.3573405], [48.8429364, 2.3573563], [48.8428825, 2.3573872], [48.8428786, 2.3573714], [48.8429325, 2.3573405]]',11,4),
('[[48.8427081, 2.3582724], [48.842625, 2.3583214], [48.842688, 2.3585658], [48.8427715, 2.358518], [48.8427081, 2.3582724]]',289,4),
('[[48.8426403, 2.358011], [48.8426734, 2.358138], [48.8425908, 2.3581876], [48.8425577, 2.3580606], [48.8426403, 2.358011]]',149,4),
('[[48.8425544, 2.3576674], [48.8425433, 2.3576839], [48.842534, 2.3576954], [48.8425204, 2.3577087], [48.8425044, 2.3577169], [48.8424881, 2.3577189], [48.8424701, 2.3577185], [48.8425228, 2.3579266], [48.8426067, 2.3578778], [48.8425544, 2.3576674]]',235,4)
;

INSERT INTO stand (nom_stand, image_stand, description_stand, date_achat, prix, id_emplacement) VALUES
('Fédération MMA','mma-besancon.png','Venez découvrir la fédération française de MMA','2023-12-03',2500,1),
('Kebab du centre','kebab-semih.png','Les délices de la turquie pour vos papilles','2023-11-04',3000,2),
('Le clown','clown.png','Venez assiter au spectacle mélangeant humour et informatique ','2023-11-04',3000,80),
('Boulangerie de Paris','boulangerie-paris.png','Venez les gouter spécialitées les plus populaires de France','2024-01-04',3000,247),
('SNCF','train-promotion.png','Découvrez Paris et la France par le train','2023-11-04',3000,144),
('Judo Folie','judo-combat.png','Initation au judo','2023-11-04',3000,84),
('Saucisses de Paris','saucisses-de-paris.png','Venez vous régaler avec des saucisses des quatre coins de la France','2023-11-04',3000,101),
('Les Glace de la Seine','vendeur-glace-de-seine.png','La qualitée des glaces italiennes à Paris !','2023-11-04',3000,107),
('Tour Eiffel','tour-eiffel.png','Des frissons assurés!','2023-11-04',10000,33),
('Traiteur asiatique','traiteur-asiatique.png','les goûts de l''Asie dans votre vie!','2024-01-10',10000,83),
('Fanzone des tuileries','fanzone-tuileries.png','la fanzone au coeur de l''action!','2023-11-04',10,68),
('Billeterie des tuileries','billeterie-tuileries.png','la billeterie des jeux olympiques','2023-11-04',10,66)
;

INSERT INTO prestation (libelle, prix, image, id_type_prestation, id_stand,is_available) VALUES
('Kebab frites',12,'kebab_frites.png',1,2,true),
('Kebab simple',9,'kebab_simple.png',1,2,true),
('Dorum frites',15,'dorum_frites.png',1,2,true),
('Coca',3,'coca.png',2,2,true),
('Initiation au mma',120,'initiation_au_mma.png',3,1,true),
('Inscription au club',120,'inscription_au_club.png',3,1,true),
('Gants de boxe',40,'gantsDeBoxe.png',4,1,true),
('Poster chat boxeur',9,'chatDeBoxe.png',4,1,true),
('Spectacle de clown', 5, 'spectacle_de_clown.png', 3, 3,true),
('Boisson de clown', 2, 'boissonClown.png', 2, 3,true),
('Masque de clown', 20, 'masqueClown.png', 4, 3,true),
('Perruque de clown', 20, 'perruque.png', 4, 3,true),
('Baguette', 2, 'baguette.png', 1, 4,true),
('Croissant', 1.5, 'croissant.png', 1, 4,true),
('Pain au chocolat', 1.5, 'pain_au_chocolat.png', 1, 4,true),
('Billet de train',5,'billet-train.png',6,5,true),
('Billet de RER',3,'RER.png',6,5,true),
('Billet de metro',2,'metro.png',6,5,true),
('Ceinture de judoka blanche',15,'ceinture-blanche.png',4,6,true),
('Ceinture de judoka jaune',15,'ceinture-jaune.png',4,6,true),
('Ceinture de judoka orange',15,'ceinture-orange.jpg',4,6,true),
('Ceinture de judoka verte',15,'ceinture-verte.jpg',4,6,true),
('Ceinture de judoka bleue',15,'ceinture-bleue.jpg',4,6,true),
('Ceinture de judoka marron',15,'ceinture-marron.jpg',4,6,true),
('Ceinture de judoka noire',17,'ceinture-noire.jpg',4,6,true),
('Ceinture de judoka rouge',20,'ceinture-rouge.jpg',4,6,true),
('Saucisse de toulouse', 10, 'saucisse_toulouse.png',1, 7,true),
('Saucisse de strasbourg', 10, 'saucisse_strasbourg.jpg', 1, 7,true),
('Saucisse de morteau', 10, 'saucisse_morteau.jpg', 1, 7,true),
('Saucisse de montbeliard', 10, 'saucisse_montbeliard.jpg', 1, 7,true),
('Glace à la fraise', 3, 'glace_fraise.png', 1, 8,true),
('Glace à la vanille', 3, 'glace_vanille.jpg', 1, 8,true),
('Glace au chocolat', 3, 'glace_chocolat.jpg', 1, 8,true),
('Glace au citron', 3, 'glace_citron.jpg', 1, 8,true),
('Saut à l''élastique',60,'saut-elastique.jpg',3,9,true),
('Saut en parachute',100,'saut-parachute.jpg',3,9,true),
('Parapente',80,'parapente.png',3,9,true),
('Rouleaux de printemps thaïlandais',4,'rouleaux-printemps.jpg',1,10,true),
('Plateau de sushis',20,'sushis.png',1,10,true),
('Ramen',4,'ramen.png',1,10,true),
('Saké artisanal',4,'saké.png',2,10,true),
('Place fanzone tuileries',100,'fanzone-tuileries.jpg',5,11,true),
('Drapeau Français',12,'drapeau.png',4,11,true),
('Bière pression',9,'pression.png',2,11,true),
('HotDog',6,'hotdog.png',1,11,true),
('Billet match de rugby',250,'billet-rugby.jpg',7,12,true),
('Billet match de volley',225,'billet-volley.jpg',7,12,true),
('Billet match de badminton',260,'billet-badminton.jpg',7,12,true)
;


INSERT INTO utilisateur (email, password, nom, prenom,solde, code_postal, adresse, commune, id_stand, id_role) VALUES
('email1@example.com', 'password1', 'Nom1', 'Prenom1',1000.00, 75001, 'Adresse1', 'Commune1', null, 1),
('email2@example.com', 'password2', 'Nom2', 'Prenom2',1000, 75002, 'Adresse2', 'Commune2', 2, 2),
('email3@example.com', 'password3', 'Nom3', 'Prenom3',1000, 75003, 'Adresse3', 'Commune3', null, 3),
('email4@example.com', 'password4', 'Nom4', 'Prenom4',1000, 75004, 'Adresse4', 'Commune4', 3, 2),
('email5@example.com', 'password5', 'Nom5', 'Prenom5', 1000,75005, 'Adresse5', 'Commune5', 4, 2),
('email6@example.com', 'password4', 'Nom4', 'Prenom4', 1000,75004, 'Adresse4', 'Commune4', 5, 2),
('email7@example.com', 'password4', 'Nom4', 'Prenom4', 1000,75004, 'Adresse4', 'Commune4', 6, 2),
('email8@example.com', 'password5', 'Nom5', 'Prenom5', 1000,75005, 'Adresse5', 'Commune5', 7, 2),
('email9@example.com', 'password5', 'Nom5', 'Prenom5', 1000,75005, 'Adresse5', 'Commune5', 8, 2)
;

INSERT INTO avis_stand_utilisateur(id_stand, id_user, note, commentaire) VALUES
(1,1,5,'Super stand'),
(1,2,4,'Bien'),
(1,3,3,'Moyen'),
(1,4,2,'Pas terrible'),
(1,5,1,'Nul'),
(1,6,5,'Super stand'),
(1,7,4,'Bien'),
(1,8,3,'Moyen'),
(1,8,2,'Pas terrible'),
(1,8,1,'Nul'),
(2,1,5,'Super stand'),
(2,2,4,'Bien'),
(2,3,3,'Moyen'),
(2,4,2,'Pas terrible'),
(2,5,1,'Nul'),
(2,6,5,'Super stand'),
(2,7,4,'Bien'),
(2,8,3,'Moyen'),
(2,8,2,'Pas terrible'),
(2,8,1,'Nul'),
(3,1,5,'Super stand'),
(3,2,4,'Bien'),
(3,3,3,'Moyen'),
(3,4,2,'Pas terrible'),
(3,5,1,'Nul'),
(3,6,5,'Super stand'),
(3,7,4,'Bien'),
(3,8,3,'Moyen'),
(3,8,2,'Pas terrible'),
(3,8,1,'Nul'),
(4,1,5,'Super stand'),
(4,2,4,'Bien'),
(4,3,3,'Moyen'),
(4,4,2,'Pas terrible'),
(4,5,1,'Nul'),
(4,6,5,'Super stand'),
(4,7,4,'Bien'),
(4,8,3,'Moyen'),
(4,8,2,'Pas terrible'),
(4,8,1,'Nul'),
(5,1,5,'Super stand'),
(5,2,4,'Bien'),
(5,3,3,'Moyen'),
(5,4,2,'Pas terrible')
;

INSERT INTO etat_commande (libelle) VALUES
('En attente de validation'),
('Validée'),
('Annulée');

INSERT INTO commande(date_commande, id_user, id_etat_commande)
VALUES('2024-01-12 09:23:47.123456',2,1)
;

INSERT INTO ligne_commande(id_commande, id_user, id_prestation, id_creneau, quantite, prix, id_etat_commande)
VALUES(1,2,25,1,1,17,1),
(1,2,36,1,1,100,1),
(1,2,4,1,1,3,2),
(1,2,23,1,1,15,2)
;

INSERT INTO text_accueil (description) VALUES
('<p style="padding-left: 40px; text-align: justify;">Bienvenue sur le site officiel de la c&eacute;r&eacute;monie d''ouverture des <strong>Jeux Olympiques de 2024 &agrave; Paris&nbsp; se d&eacute;roulant le 26 juillet 2024</strong>, un &eacute;v&eacute;nement qui promet d''&ecirc;tre le point culminant de l''ann&eacute;e, sinon de la d&eacute;cennie ! Pr&eacute;parez-vous &agrave; vivre une exp&eacute;rience extraordinaire qui marquera l''histoire et vous laissera des <strong>souvenirs imp&eacute;rissables</strong>.</p>
<p style="padding-left: 40px; text-align: justify;">Imaginez-vous au c&oelig;ur de la <strong>Ville Lumi&egrave;re</strong>, entour&eacute; par l''&eacute;l&eacute;gance et le charme de Paris, alors que le monde entier se r&eacute;unit pour c&eacute;l&eacute;brer l''esprit olympique. La c&eacute;r&eacute;monie d''ouverture de Paris 2024 promet d''&eacute;blouir et d''&eacute;merveiller avec un spectacle grandiose, alliant l''art, la musique, la culture et le sport.</p>
<p style="padding-left: 40px; text-align: justify;">Vivez la magie de la procession des athl&egrave;tes, portant fi&egrave;rement les couleurs de leurs nations, tandis que la flamme olympique s''&eacute;l&egrave;ve majestueusement. Soyez t&eacute;moin de performances artistiques &agrave; couper le souffle, de danses envo&ucirc;tantes et de feux d''artifice &agrave; couper le souffle, illuminant le ciel de Paris.</p>
<p style="padding-left: 40px; text-align: justify;">Cette soir&eacute;e incroyable sera une c&eacute;l&eacute;bration de l''unit&eacute;, de la paix et de la diversit&eacute;, incarnant les valeurs profondes des Jeux Olympiques. C''est l''occasion de rejoindre 400 000 spectateurs venus du monde entier pour partager cet instant magique.</p>
<p style="padding-left: 40px; text-align: justify;">Que vous soyez un passionn&eacute; de sport, un amoureux de la culture ou simplement &agrave; la recherche d''une exp&eacute;rience inoubliable &agrave; Paris, la c&eacute;r&eacute;monie d''ouverture des JO 2024 est un &eacute;v&eacute;nement &agrave; ne pas manquer. Pr&eacute;parez-vous &agrave; &ecirc;tre inspir&eacute;, &eacute;mu et &eacute;merveill&eacute;. R&eacute;servez vos billets d&egrave;s maintenant et faites partie de l''histoire olympique &agrave; Paris en 2024 en r&eacute;servant votre place sur les quais, ou profitez-en <strong>gratuitement</strong> !</p>
<p style="padding-left: 40px; text-align: justify;">Rejoignez-nous pour une soir&eacute;e qui c&eacute;l&egrave;bre le meilleur de l''humanit&eacute;, o&ugrave; les fronti&egrave;res disparaissent, les r&ecirc;ves se r&eacute;alisent et l''espoir brille plus fort que jamais. Paris 2024, c''est bien plus qu''une c&eacute;r&eacute;monie d''ouverture, c''est une invitation &agrave; un voyage extraordinaire au c&oelig;ur de l''<strong>Olympisme</strong>. Vous retrouverez &eacute;galement un grand nombre d''activit&eacute;s et d''articles disponibles afin de vous garantir de ne jamais vous ennuyer.</p>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://localhost:3000/api/homePage/picture-description/description_home_page1704922284.jpeg" alt="" width="744" height="786" /></p>'),
('<p style="text-align: justify;">Lors de la c&eacute;r&eacute;monie d''ouverture des Jeux Olympiques de 2024 &agrave; Paris, l''exp&eacute;rience va bien au-del&agrave; de la c&eacute;l&eacute;bration sportive. D&eacute;couvrez un <strong>monde d''opportunit&eacute;s &agrave; travers notre site interactif</strong>. Que vous soyez un amateur de sport, un passionn&eacute; de culture, un gourmand ou tout simplement en qu&ecirc;te de divertissement, notre &eacute;v&eacute;nement a &eacute;t&eacute; con&ccedil;u pour satisfaire tous les go&ucirc;ts.</p>
<p style="text-align: justify;">Explorez la <strong>carte</strong> &agrave; droite pour d&eacute;couvrir une vari&eacute;t&eacute; de stands et d''attractions qui vous promettent une exp&eacute;rience inoubliable. Plongez-vous dans la culture fran&ccedil;aise &agrave; travers des expositions artistiques, des d&eacute;monstrations artisanales et des performances envo&ucirc;tantes. D&eacute;couvrez la cuisine fran&ccedil;aise et internationale dans nos stands gastronomiques, o&ugrave; <strong>des saveurs exquises vous attendent</strong>.</p>
<p style="text-align: justify;">Pour les amateurs de sport, des zones interactives vous permettront de vivre l''excitation des comp&eacute;titions olympiques. Testez vos comp&eacute;tences dans des simulations sportives, assistez &agrave; des d&eacute;monstrations d''athl&egrave;tes renomm&eacute;s et <strong>ressentez l''adr&eacute;naline de l''Olympisme.</strong></p>
<p style="text-align: justify;">La page "<strong>Informations</strong>" est votre source essentielle pour tout ce dont vous avez besoin pour profiter pleinement de l''&eacute;v&eacute;nement. .</p>
<p style="text-align: justify;">Au-del&agrave; de ces &eacute;l&eacute;ments, la c&eacute;r&eacute;monie d''ouverture r&eacute;serve bien d''autres surprises, des spectacles en direct aux divertissements pour tous les &acirc;ges. Cr&eacute;ez des souvenirs m&eacute;morables en explorant tout ce que notre &eacute;v&eacute;nement a &agrave; offrir.</p>
<p style="text-align: justify;">Rejoignez-nous pour c&eacute;l&eacute;brer l''unit&eacute;, la paix et la diversit&eacute; &agrave; travers le sport, la culture, la gastronomie et les arts. La c&eacute;r&eacute;monie d''ouverture des JO 2024 &agrave; Paris est bien plus qu''un &eacute;v&eacute;nement sportif, c''est une invitation &agrave; une aventure extraordinaire au c&oelig;ur de l''Olympisme. Venez nous rejoindre pour une soir&eacute;e qui &eacute;blouira vos sens et vous laissera des souvenirs durables.</p>');

INSERT INTO conversations(id_creator, titre, resolu) VALUES
             (2,'je me pose une question',false),
             (2,'il y a un soucis ',false)
;

INSERT INTO messages(id_sender, id_conversation, message, temps_emmission)
VALUES
    (1,1,'laquelle ?',now()),
        (2,1,'comment je peux réserver un stand','2024-01-10 12:30:40'),
        (1,1,'veuillez mieux décrire votre soucis','2024-01-10 12:30:45'),
    (1,2,'je pense que c est bon',now())
;   

INSERT INTO messages(id_sender, id_conversation, message, temps_emmission) VALUES
(1,1,'jdjdlqkjd',now())
;

SELECT d.libelle, d.id FROM droits d JOIN role_droits rd on d.id = rd.id_droit JOIN role r on r.id_role = rd.id_role WHERE r.libelle = 'prestataire';
SELECT * from droits;