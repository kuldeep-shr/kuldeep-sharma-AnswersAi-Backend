# 🌟 AnswersAi Backend 🌟

Welcome to AnswersAI! 🎉

    Below, you'll find everything you need to know to set it up and start contributing. Let's dive in! 💻

## 🚀 Running Instructions

1.  git clone https://github.com/kuldeep-shr/kuldeep-sharma-AnswersAi-Backend.git

2.  Commans to run

    - npm install
    - npm run create-tables
    - npm start

    <br />

## 📦 Set up the database

### Using SQLite3 in Memory

1. **Install SQLite3:**

   - If you don't have SQLite3 installed, you can skip this step as SQLite comes pre-installed with Node.js.

2. **Initialize Tables (Optional):**

   - If you have SQL scripts to initialize tables, you can execute them using Node.js. For example:

     ```javascript
     const sqlite3 = require("sqlite3").verbose();

     // Open a database connection
     const db = new sqlite3.Database(":memory:");

     // Run SQL to create tables
     db.serialize(() => {
       db.run(`CREATE TABLE users (
         id INTEGER PRIMARY KEY,
         name TEXT NOT NULL,
         email TEXT NOT NULL UNIQUE
       )`);
     });

     // Close the database connection
     db.close();
     ```

### Using Package.json Scripts

1. **Install SQLite3:**

   - Install SQLite3 package as a development dependency:
     ```
     npm install sqlite3 --save-dev
     ```

2. **Define Package.json Scripts:**

   - Add scripts in your `package.json` file to initialize and interact with the SQLite3 database. For example What I use in my project:

     ```json
        "scripts": {
            "create-tables": "node ./config/CreateTables.js"
        }
     ,
     ```

3. **Create Initialization Script:**

   - Create a script (`CreateTables.js`) to initialize tables or perform any other database setup:

     ```javascript
     const sequelize = new Sequelize({
       dialect: "sqlite",
       storage: "<your-preferred-database-name>",
     });
     ```

4. **Create Query Script:**
   - Create a script (`CreateTables.js`) to interact with the database OR use ORMs

## About Environment Variables Structure

     - PORT <number>
     - AI_KEY <string>
     - AI_MODEL  <string>
     - AI_MAX_TOKEN <number>
     - SECRET_KEY   <string>

## 🛠️ Dependencies

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Sequelize**: Multi-dialect ORM for Node.js. Supports PostgreSQL, MySQL, MariaDB, SQLite, and more.
- **sqlite3**: Asynchronous, non-blocking SQLite3 bindings for Node.js.
- **jsonwebtoken**: JSON Web Token implementation for generating and verifying JWTs.
- **dotenv**: Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
- **bcryptjs**: Library for hashing and salting user passwords.
- **nodemon**: Tool for automatically restarting the server when changes are made to the code.
- **anthropic-sdk**: A SDK for AI to integrate with project.
- **mocha,chai**: Testing libraries.
- **joi**: For API payload validation

## API ENDPOINTS, Hit this Button and Fork it

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/30468072-ead4b074-82fe-4cbf-a176-63f754fd486f?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D30468072-ead4b074-82fe-4cbf-a176-63f754fd486f%26entityType%3Dcollection%26workspaceId%3D08c65748-baab-4986-9e1a-0d9be4d8e82d)
