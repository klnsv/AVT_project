// THis file will connect the project to the sql database, which is locally present

import dotenv  from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'mysql',
//     logging: false
// });


const sequelize = new Sequelize("testing_avt", "root", "MySQL@1538", {
    host: "localhost",
    port: "3306",
    dialect: 'mysql',
    logging: false
});
sequelize.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

export default sequelize;