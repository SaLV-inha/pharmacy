CREATE TABLE `products` (
    `product_id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `price` double(6,2) NOT NULL,
    `type` enum('analg','antib','vitam') NOT NULL,
    `stock` int NOT NULL,
    `sellable` tinyint(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (`product_id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `clients` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `ci` varchar(20) NOT NULL,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `ci` (`ci`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `transactions` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `prescription` tinyint(1) DEFAULT '0',
  `quantity` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci:
