"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProducts = void 0;
const Product_1 = require("../models/Product");
const getProducts = async (req, res) => {
    try {
        const { brand, minPrice, maxPrice, condition, search, category } = req.query;
        let query = {};
        if (brand) {
            const brands = brand.split(",");
            query.brand = { $in: brands };
        }
        if (category) {
            query.category = category;
        }
        if (condition) {
            const conditions = condition.split(",");
            query.condition = { $in: conditions };
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice)
                query.price.$gte = Number(minPrice);
            if (maxPrice)
                query.price.$lte = Number(maxPrice);
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }
        const products = await Product_1.ProductModel.find(query).sort({ createdAt: -1 });
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
