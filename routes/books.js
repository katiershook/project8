const express = require('express');
const router = express.Router();
const Book = require('../models').Book;



// asyncHander function 
function asyncHandler(cb){
  
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
      
        res.status(500).send(error);
      }
    }
  }

  // redirect to books 
  // router.get('/', (req, res) => {
  //   res.redirect("/books")
  // });
 
  // gets all of the books by year 
  router.get('/', asyncHandler(async (req,res)=>{
    const books = await Book.findAll({ order: [['year', 'ASC']]})
     res.render("index", {books})
    
  })
  );

  //  new book form 
  router.get('/new', asyncHandler(async (req, res) =>{
      res.render("new-book", { book: { } })
  })) ;

// post new book

router.post('/books/new' , asyncHandler(async(req, res) => { 
  let book;
 try {
   book = await Book.create(req.body); 
     res.redirect("/" );
    } catch(error){
      if(error.name === 'SequelizeValidationError'){
        book = await Book.build();
        res.render("new-book" , {book, errors: error.errors})
      } else {
      throw error;
      }
    }
  }
));

/// shows book detail form 
router.get('/books/:id', asyncHandler(async (req, res, next) => {
    Book.findByPk(req.params.id)
    .then(function(book){
    if(book){
        res.render("update-book", { book, title: book.title })
    } 
    else {
        // res.sendStatus(404);
        throw error;
     }
        })
            } 
                 ))


  // update book 
router.post('/books/:id', asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if(book) {
       await book.update(req.body);
        res.redirect("/") }

      } catch( error) {
          if(error.name === 'SequelizeValidationError'){
           book = await  Book.build(req.body);
             book.id = req.params.id;
        res.render("update-book", { book, errors:error.errors })
    } else {
      throw error;
    }
      } 
        })
          )


  
// delete book
router.post('/books/:id/delete', asyncHandler(async(req, res, next) => {
     book = await Book.findByPk(req.params.id)
    if(book){
        book.destroy();
        res.redirect("/")
    } else {
        res.sendStatus(404);
    }
      }
        ));


module.exports = router;