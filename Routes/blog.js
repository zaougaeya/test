import express from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../Controllers/blog.js';


const router = express.Router();

// Create a new blog post
router.post('/', createBlog);

// Get all 
router.get('/', getBlogs);

// Get  by ID
router.get('/:id', getBlogById);

// Update  by ID
router.put('/:id', updateBlog);

// Delete  by ID
router.delete('/:id', deleteBlog);




export default router;