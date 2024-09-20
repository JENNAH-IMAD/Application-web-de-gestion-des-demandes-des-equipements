# Application web de gestion des demandes d'équipement informatique

## MunisysEquip - Système de Gestion des Demandes d'Équipement Informatique

### Description du Projet

**MunisysEquip** est une application web conçue pour gérer les demandes d'équipement informatique au sein d'une organisation. L'application permet aux utilisateurs de soumettre des demandes d'équipement, qui sont ensuite examinées et validées par les supérieurs hiérarchiques selon les rôles définis dans l'organisation. Le système utilise une architecture **Java Spring Boot** pour le backend et **React avec Ant Design** pour le frontend.

### Fonctionnalités principales

- **Authentification** et gestion des utilisateurs avec **JWT**.
- **Gestion des rôles hiérarchiques** pour la validation des demandes.
- **Base de données** Microsoft SQL Server pour stocker les utilisateurs, les demandes et les inventaires d’équipements.
- **Interface utilisateur moderne** avec React et Ant Design.
- Suivi de l'historique des demandes et des décisions prises.

---

### Versions des technologies utilisées

#### Backend

- **Java** : 17
- **Spring Boot** : 3.3.2
- **Base de données** : Microsoft SQL Server
- **JWT** : 0.11.5 (via jjwt-impl, jjwt-api, et jjwt-jackson)
- **Maven** : pour la gestion des dépendances

#### Frontend

- **React** : 18.2.0
- **Ant Design** : 5.18.0
- **Axios** : 1.7.3
- **Vite** : 5.2.0 (pour le bundling du frontend)

---

### Lancement du Projet

#### Prérequis

Avant de commencer, assurez-vous d’avoir installé les logiciels suivants :

- **Java 17**
- **Maven** (pour gérer les dépendances et compiler le projet)
- **Node.js et npm** (pour le frontend)
- **SQL Server** (comme base de données)
- **Git** (pour la gestion du code source)

---

### Installation

1. **Clonez le projet depuis le dépôt GitHub :**

   ```bash
   git clone https://github.com/JENNAH-IMAD/Application-web-de-gestion-des-demandes-des-equipements.git
   cd Application-web-de-gestion-des-demande-d-quipement-informatique

### Configuration
1.**Configuration backend :**
- **file application.properties**
- spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=test1;encrypt=false;
- spring.datasource.username=your username datasource
- spring.datasource.password=password your datasource
- spring.jpa.hibernate.ddl-auto=update

- **Lancer le Backend**

-**cd backend**
-**run the backend projet now**

2.**Configuration du Frontend :**

-**cd ../frontend**

-**npm install**

-**npm run dev**

---

### Contributeurs
- **JENNAH IMAD**.

---

### Note
- **Le système utilise une structure de base hiérarchique, avec une gestion des droits basée sur les rôles. Le projet est encore en phase de développement actif, et certaines fonctionnalités pourraient être sujettes à modification.**.
