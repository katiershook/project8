const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


console.log('start')
function asyncHandler(cb){
  
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
          console.log('error')
          print("coffee")
        res.status(500).send(error);
      }
    }
  }

  router.get('/', (req, res) => {
    res.redirect("/books")
  });
 
  // gets all of the books by year 
  router.get('/books', asyncHandler(async (req,res, next)=>{
    const books = await Book.findAll({ order: [['year', 'ASC']]})
    
    res.render("index", {books})
    
  })
  );

  //  new book form 
  router.get('/new',(req, res, next) =>{
      res.render("new-book", { book: { }})
  } );

// post new book

router.post('/books/new' , asyncHandler(async(req, res, next) => {
    await Book.create(req.body); 
    res.redirect("/books" );
    } 
    
 ));

/// shows book detail form 
router.get('/books/:id', asyncHandler(async (req, res, next) => {
    Book.findByPk(req.params.id)
    .then(function(book){
    if(book){
        res.render('update-book', { book, title: book.title })
    } 
    else {
        res.sendStatus(404);
     }
  })}))
 // delete
  
// keep
router.post('/books/:id', asyncHandler(async (req, res, next) => {
    let book;
    try {
      console.log("book");
       constbook = await Book.findByPk(req.params.id);
      if(book) {
      
        await book.update(req.body);
        res.redirect("/")
      } else {
        res.render('index')

        
      }
    } catch( error) {
    
      if(error.name === "SequelizeValidationError"){

       book = await  Book.build(req.body);
         book.id = req.params.id;
        res.render("update-book ", { book : book , title: "update book" , errors: error.errors})
   
      } 
    } 
}))


  

router.post('/books/:id/delete', asyncHandler(async(req, res, next) => {
    const book = await Book.findByPk(req.params.id)
    if(book){
        book.destroy();
        res.redirect("/")
    } else {
        res.sendStatus(404);
    }
}));


module.exports = router;