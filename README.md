#MunisysEquip - Système de Gestion des Demandes d'Équipement Informatique
Description du Projet
MunisysEquip est une application web conçue pour gérer les demandes d'équipement informatique au sein d'une organisation. L'application permet aux utilisateurs de soumettre des demandes d'équipement, qui sont ensuite examinées et validées par les supérieurs hiérarchiques selon les rôles définis dans l'organisation. Le système utilise une architecture Java Spring Boot pour le backend et React avec Ant designe pour le frontend.

Fonctionnalités principales
Authentification et gestion des utilisateurs avec JWT.
Gestion des rôles hiérarchiques pour la validation des demandes.
Base de données SQL Server pour stocker les utilisateurs, les demandes et les inventaires d’équipements.
Interface utilisateur moderne avec React et Ant designe.
Suivi de l'historique des demandes et des décisions prises.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Versions des technologies utilisées
Backend
Java : 17
Spring Boot : 3.3.2
Base de données : Microsoft SQL Server
JWT : 0.11.5 (via jjwt-impl, jjwt-api, et jjwt-jackson)
Maven : pour la gestion des dépendances
Frontend
React : 18.2.0
Ant Design : 5.18.0
Axios : 1.7.3
Vite : 5.2.0 (pour le bundling du frontend)
Lancement du Projet
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Prérequis
Avant de commencer, assurez-vous d’avoir installé les logiciels suivants :

Java 17
Maven (pour gérer les dépendances et compiler le projet)
Node.js et npm (pour le frontend)
SQL Server (comme base de données)
Git (pour la gestion du code source)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Installation
1. Clonez le projet depuis le dépôt GitHub :
bash
Copy code
git clone https://github.com/JENNAH-IMAD/Application-web-de-gestion-des-demandes-d-quipement-informatique.git
cd Application-web-de-gestion-des-demande-d-quipement-informatique
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
2. Configuration du Backend
A. Base de données
Créez une base de données nommée test1 dans votre SQL Server local. Assurez-vous que le fichier application.properties ou application.yml du projet contient les informations correctes de connexion :
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
properties
Copy code
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=test1;encrypt=false;
spring.datasource.username=imad
spring.datasource.password=imad
spring.jpa.hibernate.ddl-auto=update
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
B. Lancer le Backend
Naviguez vers le dossier backend/ :

bash
Copy code
cd backend
Utilisez Maven pour compiler et démarrer le backend :

bash
Copy code
mvn clean install
mvn spring-boot:run
Le serveur backend sera lancé sur le port 8081 (par défaut).
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
3. Configuration du Frontend
Naviguez vers le dossier frontend/ :

bash
Copy code
cd ../frontend
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Installez les dépendances :

bash
Copy code
npm install
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Démarrez le serveur de développement :

bash
Copy code
npm run dev
Le serveur frontend sera lancé sur le port 3000.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

1. Lancer le Backend
Assurez-vous que le serveur SQL est démarré et que la base de données est prête.

Depuis le dossier backend, exécutez :

bash
Copy code
mvn spring-boot:run
Le backend sera accessible via http://localhost:8081.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
2. Lancer le Frontend
Depuis le dossier frontend, exécutez :

bash
Copy code
npm run dev
Le frontend sera accessible via http://localhost:3000.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Contributeurs

Imad Jennah
Licence
Ce projet est sous licence ouverte, n'hésitez pas à contribuer et à proposer des améliorations.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Note
Le système utilise une structure de base hiérarchique, avec une gestion des droits basée sur les rôles.
Le projet est encore en phase de développement actif, et certaines fonctionnalités pourraient être sujettes à modification.
