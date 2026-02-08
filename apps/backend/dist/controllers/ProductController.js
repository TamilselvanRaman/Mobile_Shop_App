"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProducts = void 0;
const Product_1 = require("../models/Product");
const getProducts = async (req, res) => {
    try {
        const products = await Product_1.ProductModel.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    const product = req.body;
    const newProduct = new Product_1.ProductModel(product);
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};
exports.createProduct = createProduct;
