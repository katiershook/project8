'use strict';
const Sequelize = require('sequelize');
// created models with id and validations 
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
        validate: {
           notEmpty:{
                msg: "Whoops. Title is required"
            }
        },
     },
   author:{
        type:  Sequelize.STRING,
           validate: {
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
 