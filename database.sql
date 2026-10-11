-- ========================================================
-- FLIPKART CLONE - PRODUCTION DATABASE SCHEMA (MySQL)
-- Comprehensive Schema with Relational Constraints & Indices
-- ========================================================

CREATE DATABASE IF NOT EXISTS `flipkart_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `flipkart_db`;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(20) NOT NULL UNIQUE,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) DEFAULT 'assets/images/default_avatar.png',
  `supercoins` INT DEFAULT 50,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. ADMIN TABLE
CREATE TABLE IF NOT EXISTS `admin` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('superadmin', 'manager', 'support') DEFAULT 'superadmin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. SELLERS TABLE
CREATE TABLE IF NOT EXISTS `sellers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `business_name` VARCHAR(200) NOT NULL,
  `gst_no` VARCHAR(50) NOT NULL UNIQUE,
  `pan_no` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `phone` VARCHAR(20) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `bank_details` TEXT NOT NULL,
  `status` ENUM('pending', 'approved', 'suspended', 'rejected') DEFAULT 'pending',
  `rating` DECIMAL(3,2) DEFAULT 4.50,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. DELIVERY PARTNERS TABLE
CREATE TABLE IF NOT EXISTS `delivery_partners` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(20) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `vehicle_no` VARCHAR(50) NOT NULL,
  `vehicle_type` ENUM('bike', 'scooter', 'van') DEFAULT 'bike',
  `status` ENUM('active', 'inactive', 'on_delivery') DEFAULT 'active',
  `current_location` VARCHAR(255) DEFAULT '28.6139,77.2090',
  `rating` DECIMAL(3,2) DEFAULT 4.80,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `image` VARCHAR(255) NOT NULL,
  `commission_rate` DECIMAL(5,2) DEFAULT 8.00,
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `seller_id` INT NOT NULL,
  `cat_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `mrp` DECIMAL(10,2) NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `image` VARCHAR(255) NOT NULL,
  `gallery_images` TEXT NULL,
  `brand` VARCHAR(100) DEFAULT 'Generic',
  `rating` DECIMAL(3,2) DEFAULT 4.20,
  `reviews_count` INT DEFAULT 0,
  `is_assured` TINYINT(1) DEFAULT 1,
  `qc_status` ENUM('pending', 'approved', 'rejected') DEFAULT 'approved',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`seller_id`) REFERENCES `sellers`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`cat_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. WISHLIST TABLE
CREATE TABLE IF NOT EXISTS `wishlist` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `user_product` (`user_id`, `product_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. ORDERS TABLE
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(50) NOT NULL UNIQUE,
  `user_id` INT NOT NULL,
  `seller_id` INT NOT NULL,
  `delivery_id` INT NULL,
  `total_amount` DECIMAL(10,2) NOT NULL,
  `discount_amount` DECIMAL(10,2) DEFAULT 0.00,
  `supercoins_used` INT DEFAULT 0,
  `payment_method` ENUM('upi', 'card', 'netbanking', 'cod', 'wallet', 'emi') NOT NULL,
  `payment_status` ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  `status` ENUM('placed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned') DEFAULT 'placed',
  `address` TEXT NOT NULL,
  `pincode` VARCHAR(10) NOT NULL,
  `otp_code` VARCHAR(6) NOT NULL,
  `pod_signature` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`seller_id`) REFERENCES `sellers`(`id`),
  FOREIGN KEY (`delivery_id`) REFERENCES `delivery_partners`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `price` DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. SELLER ADS TABLE
CREATE TABLE IF NOT EXISTS `seller_ads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `seller_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `bid_amount` DECIMAL(6,2) NOT NULL DEFAULT 5.00,
  `impressions` INT DEFAULT 0,
  `clicks` INT DEFAULT 0,
  `status` ENUM('active', 'paused', 'ended') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`seller_id`) REFERENCES `sellers`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- SEED DATA
INSERT INTO `admin` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'superadmin')
ON DUPLICATE KEY UPDATE `username`=VALUES(`username`);

INSERT INTO `users` (`id`, `name`, `phone`, `email`, `password`, `supercoins`) VALUES
(1, 'Rahul Sharma', '9876543210', 'rahul.sharma@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 120),
(2, 'Priya Patel', '9812345678', 'priya.patel@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 45);

INSERT INTO `sellers` (`id`, `name`, `business_name`, `gst_no`, `pan_no`, `email`, `phone`, `password`, `bank_details`, `status`, `rating`) VALUES
(1, 'Ankit Verma', 'TechGizmo Retailers Pvt Ltd', '07AAAAA0000A1Z5', 'ABCDE1234F', 'ankit@techgizmo.in', '9988776655', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'HDFC Bank, Acc: 5010023456789, IFSC: HDFC0001234', 'approved', 4.70),
(2, 'Kavita Roy', 'Urban Trends Fashion Hub', '27BBBBB1111B2Z6', 'FGHIJ5678K', 'kavita@urbantrends.in', '9877112233', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ICICI Bank, Acc: 001105009876, IFSC: ICIC0000011', 'approved', 4.40);

INSERT INTO `delivery_partners` (`id`, `name`, `phone`, `password`, `vehicle_no`, `vehicle_type`, `status`, `current_location`, `rating`) VALUES
(1, 'Vikram Singh', '9123456780', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'DL 4S CZ 9021', 'bike', 'active', '28.5355,77.3910', 4.90),
(2, 'Amit Kumar', '9198765432', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'DL 3C AB 4455', 'scooter', 'on_delivery', '28.4595,77.0266', 4.75);

INSERT INTO `categories` (`id`, `name`, `slug`, `image`, `commission_rate`) VALUES
(1, 'Mobiles & Tablets', 'mobiles', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80', 6.50),
(2, 'Electronics', 'electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80', 8.00),
(3, 'Fashion', 'fashion', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&q=80', 12.00),
(4, 'Appliances', 'appliances', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=80', 7.50),
(5, 'Home & Furniture', 'home-furniture', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80', 10.00),
(6, 'Grocery', 'grocery', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80', 5.00);

INSERT INTO `products` (`id`, `seller_id`, `cat_id`, `name`, `description`, `price`, `mrp`, `stock`, `image`, `brand`, `rating`, `reviews_count`, `is_assured`, `qc_status`) VALUES
(1, 1, 1, 'Nothing Phone (2a) 5G (Black, 128 GB)', 'Dimensity 7200 Pro Processor, 50 MP OIS Primary Camera, 120 Hz AMOLED Display, 45W Fast Charging.', 23999.00, 25999.00, 45, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', 'Nothing', 4.40, 1420, 1, 'approved'),
(2, 1, 1, 'Apple iPhone 15 (Blue, 128 GB)', 'A16 Bionic chip, Dynamic Island, 48MP main camera with 2x Telephoto, USB-C connectivity and aerospace-grade aluminum.', 65999.00, 79900.00, 30, 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80', 'Apple', 4.70, 8950, 1, 'approved'),
(3, 1, 2, 'Sony WH-1000XM5 Active Noise Cancelling Headphones', 'Industry Leading Wireless Over-Ear Headphones with 2 Processors, 8 Microphones, and 30-hour battery life.', 26990.00, 34990.00, 18, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', 'Sony', 4.60, 2410, 1, 'approved'),
(4, 2, 3, 'Men Slim Fit Solid Cutaway Collar Casual Shirt', '100% Breathable cotton fabric, tailored slim silhouette with structured collar. Ideal for smart casual wear.', 899.00, 2499.00, 120, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', 'Highlander', 4.10, 840, 1, 'approved'),
(5, 1, 4, 'LG 8 Kg 5 Star Smart Inverter Front Load Washing Machine', 'AI Direct Drive with Steam allergy care, 6 Motion DD for delicate fabrics, Wi-Fi ThinQ enabled.', 34990.00, 48990.00, 12, 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80', 'LG', 4.50, 620, 1, 'approved'),
(6, 2, 5, 'Ergonomic High Back Mesh Executive Office Chair', 'Adjustable lumbar support, 3D armrests, heavy duty metal base, and 135-degree tilt reclining lock.', 7499.00, 14999.00, 25, 'https://images.unsplash.com/photo-1580481077113-e4d3db2694ec?w=600&q=80', 'Green Soul', 4.30, 1150, 1, 'approved');

INSERT INTO `orders` (`id`, `order_number`, `user_id`, `seller_id`, `delivery_id`, `total_amount`, `discount_amount`, `supercoins_used`, `payment_method`, `payment_status`, `status`, `address`, `pincode`, `otp_code`) VALUES
(1, 'OD4298174201', 1, 1, 1, 23999.00, 500.00, 50, 'upi', 'paid', 'out_for_delivery', 'Flat 402, Lotus Heights, Sector 62, Noida, Uttar Pradesh', '201301', '4921'),
(2, 'OD4298174202', 2, 2, 2, 899.00, 100.00, 0, 'cod', 'pending', 'shipped', 'B-12, Green Park Extension, New Delhi', '110016', '7734');

INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 1, 23999.00),
(2, 4, 1, 899.00);

INSERT INTO `seller_ads` (`seller_id`, `product_id`, `bid_amount`, `impressions`, `clicks`, `status`) VALUES
(1, 1, 8.50, 14200, 980, 'active'),
(2, 4, 3.20, 8900, 430, 'active');
