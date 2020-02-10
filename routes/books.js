const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        res.status(500).send(error);
      }
    }
  }

  // gets all of the books by year 
  router.get('/', asyncHandler(async (req, res) => {
    const book = await Book.findAll({ order : [[ "year", "DESC" ]]});
    res.render("index", { book  });
  }));

  //  new book form 
  router.get('/new',(req, res) =>{
      res.render('books/new-book', {book: { }})
  } )

// post new book

router.post('/' , asyncHandler(async(req, res) => {
    let book;
    try{ book = await Book.create(req.body); 
    res.redirect("/books/" + book.id);
    } catch (error){
        if(error.name === "SequelizeValidationError"){
            book = await Book.build(req.body);
            res.render("books/new", {book , errors:
            error.errors, title: "New Book"})
        }else {
            throw error;
        }
    }
} ))

/// shows book detail form 
router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book){
        res.render('books/show', { book, title: book.title })
    } else {
        res.sendStatus(404);
    }
}))



router.post('/:id', asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if(book) {
        await book.update(req.body);
        res.redirect("/books/" + book.id); 
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      if(error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        book.id = req.params.id; // make sure correct book  gets updated
        res.render("books/edit", { book, errors: error.errors, title: "Edit Book" })
      } else {
        throw error;
      }
    }
  }));
  

router.get('/:id/delete', asynchHandler(async(req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book){
        res.render('books/delete', { book, title: "Delete a book"});
    } else {
        res.sendStatus(404);
    }
}));


module.exports = router;