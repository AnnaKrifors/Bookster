import express from 'express';
import bookController from '../controller/bookController.js';

const router = express.Router();

router
  .get("/books", bookController.getAllBooks)
  .get("/books/search/:query", bookController.searchBook);
  


export default router;