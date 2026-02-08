import { Request, Response } from "express";
import { ProductModel } from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { brand, minPrice, maxPrice, condition, search, category } = req.query;

    let query: any = {};

    if (brand) {
      const brands = (brand as string).split(",");
      query.brand = { $in: brands };
    }

    if (category) {
      query.category = category;
    }

    if (condition) {
      const conditions = (condition as string).split(",");
      query.condition = { $in: conditions };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await ProductModel.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const product = req.body;
  const newProduct = new ProductModel(product);
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};
