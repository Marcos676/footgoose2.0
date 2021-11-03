CREATE TABLE `products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `description` VARCHAR(255) NOT NULL,
   `price` DECIMAL(8,2) NOT NULL,
   `discount` TINYINT(100) DEFAULT 0,
   `expiration` DATETIME,
   `cuantity` INT NOT NULL,
   `labelId` INT NOT NULL,
   `subCategoryId` INT NOT NULL,
   `createdAt` DATETIME,
   `updatedAt` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `SubCategories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `categoryId` INT NOT NULL AUTO_INCREMENT,
   `createdAt` DATETIME,
   `updatedAt` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Categories` (
   `id` INT NOT NULL,
   `name` VARCHAR(255) NOT NULL,
   `animalId` INT NOT NULL,
   `createdAt` DATETIME,
   `updatedAt` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Animals` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   `createdAt` DATETIME,
   `updatedAt` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `ProductsImages` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL DEFAULT "undefinedProduct.png",
   `productId` INT NOT NULL AUTO_INCREMENT,
   `createdAt` DATETIME,
   `updatedAt` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Labels` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   `createdAt` DATETIME,
   `updatedAt` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `firsName` VARCHAR(255) NOT NULL,
   `lastName` VARCHAR(255) NOT NULL,
   `email` VARCHAR(255) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255) NOT NULL DEFAULT "undefined.PNG",
   `admin` TINYINT NOT NULL,
   `tel` INT AUTO_INCREMENT,
   `address` VARCHAR(255),
   `createdAt` DATETIME,
   `updatedAt` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Cart` (
   `id` INT NOT NULL,
   `productId` INT NOT NULL,
   `userId` INT NOT NULL,
   `createdAt` DATETIME,
   `updatedAt` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `Favorites` (
   `id` INT NOT NULL,
   `productId` INT NOT NULL,
   `userId` INT NOT NULL,
   `createdAt` DATETIME,
   `updatedAt` DATETIME,
   PRIMARY KEY (`id`)
);


ALTER TABLE `products` ADD CONSTRAINT `FK_2db296de-4ee4-411b-a62c-bf0c38b486e0` FOREIGN KEY (`subCategoryId`) REFERENCES `SubCategories`(`id`)  ;

ALTER TABLE `products` ADD CONSTRAINT `FK_b79d8f79-916a-4d8a-8091-2e39821ebb44` FOREIGN KEY (`labelId`) REFERENCES `Labels`(`id`)  ;

ALTER TABLE `SubCategories` ADD CONSTRAINT `FK_2a797762-a461-4a96-aede-b7d311e544ec` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`)  ;

ALTER TABLE `Categories` ADD CONSTRAINT `FK_d8e167d0-f8e5-4f53-ba40-49651bd130a9` FOREIGN KEY (`animalId`) REFERENCES `Animals`(`id`)  ;

ALTER TABLE `ProductsImages` ADD CONSTRAINT `FK_99102721-80c1-4350-8435-d96b4904110b` FOREIGN KEY (`productId`) REFERENCES `products`(`id`)  ;

ALTER TABLE `Cart` ADD CONSTRAINT `FK_747f8cc2-a88c-4b75-a0d6-24b7245a255d` FOREIGN KEY (`productId`) REFERENCES `products`(`id`)  ;

ALTER TABLE `Cart` ADD CONSTRAINT `FK_42c23e77-fb13-448b-9c50-e8ff4f978724` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`)  ;

ALTER TABLE `Favorites` ADD CONSTRAINT `FK_e61f4072-f607-4371-9a91-9aa0765ea369` FOREIGN KEY (`productId`) REFERENCES `products`(`id`)  ;

ALTER TABLE `Favorites` ADD CONSTRAINT `FK_dbc24f73-9301-4cd0-94a7-5ddc3071dcba` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`)  ;
