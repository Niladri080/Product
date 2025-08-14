import { Router } from "express";
import { addProduct, deleteItem, editProduct, findProduct, getCustomers, getdash, getOrders, getProducts, getUser, profileUpdate } from "../Controllers/admindash.js";
import multer from "multer";
const storage=multer.memoryStorage();
const upload=multer({storage})
const router=Router();
router.get('/home',getdash);
router.post('/add-product',upload.single('image'),addProduct);
router.post('/user',getUser);
router.post('/get-products',getProducts);
router.post('/edit-product',upload.none(),editProduct);
router.post('/single-product',findProduct);
router.post('/delete-item',deleteItem);
router.post('/update-profile',profileUpdate);
router.post('/get-orders',getOrders);
router.post('/get-customers',getCustomers);
export default router;