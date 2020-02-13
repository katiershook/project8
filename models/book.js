'use strict';
const Sequelize = require('sequelize');
// title , author , genre , year 
 module.exports =(sequelize) => {
 class Book extends Sequelize.Model{}
Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
  },
    title:{
        type:  Sequelize.STRING,
        allowNull:false,
        validate: {
            notNull: {
                msg:" title is required"
            },
            notEmpty:{
                msg: "Whoops. Title is required"
            }
        },
     },
   author:{
        type:  Sequelize.STRING,
        allowNull:false,
        validate: {
            notNull: {
                msg:" Author is required"
            },
            notEmpty:{
                msg: "Whoops. Author is required"
            }
        },
     },
   
     genre:{
         type: Sequelize.STRING,
     },
     year:{
         type: Sequelize.INTEGER,
     }
   }, {sequelize});
  
   return Book;
 }
 