import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserModel } from './models/User';
import { ProductModel } from './models/Product';
import { OrderModel } from './models/Order';
import { ServiceModel, BookingModel } from './models/Service';
import bcrypt from 'bcryptjs';

dotenv.config();

const CONNECTION_URL = process.env.MONGO_URI || "mongodb://localhost:27017/mobile_shop";

const seed = async () => {
    try {
        await mongoose.connect(CONNECTION_URL);
        console.log('Connected to MongoDB');

        // Clear existing data
        await UserModel.deleteMany({});
        await ProductModel.deleteMany({});
        await OrderModel.deleteMany({});
        await ServiceModel.deleteMany({});
        await BookingModel.deleteMany({});

        console.log('Cleared existing data');

        // Create Users
        const hashedPassword = await bcrypt.hash('admin123', 12);
        const adminUser = await UserModel.create({
            name: 'Admin User',
            email: 'admin@mobileshop.com',
            password: hashedPassword,
            role: 'admin'
        });

        const userUser = await UserModel.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: hashedPassword,
            role: 'user'
        });

        console.log('Users created');

        // Create Products
        const products = await ProductModel.insertMany([
            {
                name: 'iPhone 15 Pro Max',
                description: 'The ultimate iPhone.',
                price: 1199,
                category: 'Smartphones',
                brand: 'Apple',
                stock: 50,
                images: ['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-natural-titanium-select-202309?wid=940&hei=1112&fmt=png-alpha&.v=1693510943929'],
                specs: { screen: '6.7"', storage: '256GB' }
            },
            {
                name: 'Samsung Galaxy S24 Ultra',
                description: 'Galaxy AI is here.',
                price: 1299,
                category: 'Smartphones',
                brand: 'Samsung',
                stock: 45,
                images: ['https://images.samsung.com/is/image/samsung/p6pim/in/sm-s928bztqins/gallery/in-galaxy-s24-s928-sm-s928bztqins-thumb-539572341'],
                specs: { screen: '6.8"', storage: '512GB' }
            },
            {
                name: 'AirPods Pro (2nd Gen)',
                description: 'Active Noise Cancellation.',
                price: 249,
                category: 'Accessories',
                brand: 'Apple',
                stock: 100,
                images: ['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361'],
                specs: { type: 'In-Ear', connectivity: 'Bluetooth' }
            }
        ]);

        console.log('Products created');

        // Create Orders
        await OrderModel.create([
            {
                userId: userUser._id,
                items: [
                    { productId: products[0]._id, quantity: 1, price: 1199 },
                    { productId: products[2]._id, quantity: 1, price: 249 }
                ],
                totalAmount: 1448,
                status: 'completed',
                shippingAddress: { street: '123 Main St', city: 'Tech City', zip: '12345' }
            },
            {
                userId: userUser._id,
                items: [
                    { productId: products[1]._id, quantity: 1, price: 1299 }
                ],
                totalAmount: 1299,
                status: 'processing',
                shippingAddress: { street: '123 Main St', city: 'Tech City', zip: '12345' }
            }
        ]);

        console.log('Orders created');

        // Create Services
        const services = await ServiceModel.insertMany([
            {
                name: 'Screen Replacement',
                description: 'Replace cracked or broken screens.',
                basePrice: 199,
                estimatedDuration: 60,
                category: 'repair'
            },
            {
                name: 'Battery Replacement',
                description: 'Replace old or degraded batteries.',
                basePrice: 89,
                estimatedDuration: 45,
                category: 'maintenance'
            },
            {
                name: 'Software Diagnostics',
                description: 'Identify and fix software issues.',
                basePrice: 49,
                estimatedDuration: 30,
                category: 'consultation'
            }
        ]);

        console.log('Services created');

        // Create Bookings
        await BookingModel.create([
            {
                serviceId: services[0]._id,
                userId: userUser._id,
                date: new Date(Date.now() + 86400000), // Tomorrow
                status: 'confirmed',
                deviceModel: 'iPhone 13 Pro',
                issueDescription: 'Cracked screen after drop.'
            },
            {
                serviceId: services[1]._id,
                userId: userUser._id,
                date: new Date(Date.now() + 172800000), // Day after tomorrow
                status: 'pending',
                deviceModel: 'Samsung S21',
                issueDescription: 'Battery drains very fast.'
            }
        ]);

        console.log('Bookings created');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seed();
