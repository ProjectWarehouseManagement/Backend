-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 30. 15:29
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `warehouse`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `street` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `state` varchar(191) NOT NULL,
  `postalCode` varchar(191) NOT NULL,
  `country` varchar(191) NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `address`
--

INSERT INTO `address` (`id`, `street`, `city`, `state`, `postalCode`, `country`, `userId`) VALUES
(1, '78136 S 1st Avenue', 'Henderson', 'Arkansas', '42353-8569', 'Panama', 3),
(2, '4066 Kihn Plain', 'New Lonny', 'Iowa', '66553', 'Cape Verde', 8),
(3, '7022 Jaylin Drives', 'West Francesco', 'New York', '34157-3094', 'Palau', 4),
(4, '9287 Mertz Unions', 'Norvalstad', 'California', '38895-5278', 'Faroe Islands', 5),
(5, '3484 Narciso Greens', 'Logan', 'North Dakota', '52870', 'Anguilla', 4),
(6, '600 Batz Meadow', 'Adeliaworth', 'New Jersey', '14064', 'Mexico', 10),
(7, '74078 Mann Courts', 'Biloxi', 'Oklahoma', '74387-3546', 'Ireland', 2),
(8, '832 Seamus Parks', 'Bruenberg', 'Oregon', '00630-0864', 'Chad', 6),
(9, '446 Grover Dam', 'West Lisandro', 'Massachusetts', '88920-0896', 'Uganda', 8),
(10, '74486 Highfield Road', 'Schummport', 'Illinois', '00216-8711', 'Grenada', 2),
(11, '7031 Honeysuckle Close', 'Volkmanside', 'Arkansas', '46892', 'Cameroon', 6),
(12, '92232 Johnston River', 'Bernitaside', 'Maine', '15106-5251', 'Montserrat', 7),
(13, '6827 Miller Islands', 'Moreno Valley', 'Texas', '20017-5938', 'Burundi', 4),
(14, '669 Osinski Ports', 'Lake Buddyfield', 'Arkansas', '90662', 'North Macedonia', 6),
(15, '6778 Yazmin Brooks', 'North Wilburn', 'Iowa', '30406', 'Monaco', 1),
(16, '386 North Road', 'Maudehaven', 'Missouri', '98616', 'Tonga', 9),
(17, '549 Brandyn Crossroad', 'New Zellastad', 'Tennessee', '46137-0138', 'Bouvet Island', 9),
(18, '9003 Kshlerin River', 'Namechester', 'Idaho', '96040', 'South Africa', 7),
(19, '1030 Theo Extension', 'Arlington Heights', 'Hawaii', '60404', 'Yemen', 5),
(20, '3316 Carolyne Via', 'Enochberg', 'Vermont', '33898-0275', 'Canada', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `delivery`
--

CREATE TABLE `delivery` (
  `id` int(11) NOT NULL,
  `orderDate` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `delivery`
--

INSERT INTO `delivery` (`id`, `orderDate`) VALUES
(2, '2025-03-13 02:34:28.457'),
(3, '2025-03-25 06:10:39.431'),
(4, '2024-12-05 11:32:56.130'),
(5, '2024-06-06 12:21:42.237'),
(6, '2024-06-12 06:58:02.656'),
(7, '2024-11-07 17:06:01.784'),
(8, '2024-11-02 19:15:20.710'),
(9, '2024-10-21 19:26:34.080'),
(10, '2025-04-02 12:40:23.670'),
(16, '2025-04-28 00:00:00.000');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `deliverydetails`
--

CREATE TABLE `deliverydetails` (
  `id` int(11) NOT NULL,
  `price` double NOT NULL,
  `shippingCost` double NOT NULL,
  `OrderQuantity` int(11) NOT NULL,
  `ExpectedDate` datetime(3) NOT NULL,
  `productId` int(11) NOT NULL,
  `deliveryId` int(11) NOT NULL,
  `warehouseId` int(11) NOT NULL,
  `addressId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `deliverydetails`
--

INSERT INTO `deliverydetails` (`id`, `price`, `shippingCost`, `OrderQuantity`, `ExpectedDate`, `productId`, `deliveryId`, `warehouseId`, `addressId`) VALUES
(1, 988.09, 199.25, 42, '2025-10-01 05:30:25.032', 4, 7, 2, 12),
(2, 980.3, 23.49, 29, '2025-06-08 08:01:18.143', 13, 7, 2, 13),
(3, 156.89, 557.09, 74, '2025-11-21 17:00:45.015', 6, 8, 4, 10),
(4, 512.19, 899.25, 51, '2026-01-25 00:45:35.950', 8, 6, 5, 7),
(5, 206.4, 365.9, 54, '2025-08-29 05:39:09.903', 9, 3, 5, 12),
(6, 126.59, 848.74, 18, '2026-03-11 22:24:46.786', 3, 6, 1, 14),
(7, 147.45, 709.19, 61, '2025-09-02 15:57:18.246', 12, 7, 2, 6),
(8, 494.79, 597.79, 67, '2025-10-15 16:42:22.586', 8, 9, 1, 16),
(9, 859.57, 113.19, 93, '2026-04-02 11:24:42.094', 15, 10, 5, 6),
(10, 458.35, 214.59, 7222, '2025-11-19 00:00:00.000', 2, 2, 2, 17),
(11, 326.89, 897.2, 3, '2025-07-28 06:22:01.438', 8, 5, 5, 2),
(12, 156.65, 147.1, 95, '2026-04-07 05:21:54.266', 4, 10, 4, 17),
(13, 774.59, 658.59, 58, '2025-12-17 18:25:18.514', 9, 3, 4, 10),
(14, 130.89, 120.09, 21, '2025-09-30 23:18:43.738', 8, 3, 2, 11),
(15, 790.99, 695.49, 5, '2025-09-11 11:05:35.138', 9, 3, 5, 20),
(16, 572.25, 185.39, 14, '2025-06-21 10:31:46.448', 3, 5, 5, 6),
(17, 479.45, 965.05, 31, '2025-09-21 17:20:51.928', 13, 9, 5, 18),
(18, 309.05, 458.59, 97, '2025-11-04 21:55:29.183', 15, 10, 4, 16),
(19, 626.1, 222.25, 97, '2026-01-30 02:54:55.035', 14, 3, 4, 13),
(20, 816.85, 89.99, 14, '2025-05-26 14:40:56.309', 4, 4, 1, 7),
(21, 80.09, 1, 12, '2025-04-30 00:00:00.000', 7, 16, 1, 1),
(22, 330.95, 1, 122, '2025-04-30 00:00:00.000', 9, 16, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL,
  `reorderPoint` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `warehouseId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `inventory`
--

INSERT INTO `inventory` (`id`, `quantity`, `available`, `reorderPoint`, `productId`, `warehouseId`) VALUES
(1, 78, 0, 90, 5, 3),
(2, 530, 0, 13, 10, 4),
(3, 673, 1, 92, 7, 1),
(4, 911, 0, 13, 1, 2),
(5, 71, 0, 73, 15, 3),
(6, 569, 1, 80, 2, 4),
(7, 811, 1, 48, 8, 5),
(8, 242, 1, 79, 14, 2),
(9, 722, 1, 100, 4, 4),
(10, 742, 1, 64, 14, 4),
(11, 494, 0, 28, 10, 3),
(12, 468, 0, 37, 8, 4),
(13, 550, 0, 45, 7, 4),
(14, 56, 0, 29, 8, 2),
(15, 234, 0, 31, 3, 3),
(16, 877, 0, 17, 14, 2),
(17, 126, 1, 75, 5, 4),
(18, 253, 0, 63, 9, 3),
(19, 252, 1, 95, 9, 1),
(20, 867, 1, 56, 15, 2),
(21, 262, 0, 99, 5, 3),
(22, 366, 0, 23, 9, 3),
(23, 891, 0, 90, 11, 2),
(24, 361, 1, 21, 11, 5),
(25, 172, 1, 62, 9, 2),
(26, 918, 0, 21, 8, 5),
(27, 88, 1, 52, 11, 3),
(28, 965, 1, 45, 11, 4),
(29, 937, 1, 21, 11, 4),
(30, 624, 1, 100, 7, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `orderDate` datetime(3) NOT NULL,
  `providerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `order`
--

INSERT INTO `order` (`id`, `orderDate`, `providerId`) VALUES
(1, '2024-12-13 01:32:40.616', 5),
(2, '2024-08-02 21:22:22.114', 2),
(3, '2024-12-24 11:16:55.226', 1),
(4, '2025-04-19 16:48:48.132', 4),
(5, '2024-11-01 17:53:11.016', 5),
(6, '2025-04-01 22:41:39.153', 5),
(7, '2024-06-05 14:05:48.794', 2),
(8, '2024-10-12 07:38:52.226', 2),
(9, '2024-10-26 03:55:34.620', 3),
(10, '2025-04-21 17:07:35.361', 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `price` double NOT NULL,
  `shippingCost` double NOT NULL,
  `OrderQuantity` int(11) NOT NULL,
  `ExpectedDate` datetime(3) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) NOT NULL,
  `addressId` int(11) NOT NULL,
  `warehouseId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `price`, `shippingCost`, `OrderQuantity`, `ExpectedDate`, `orderId`, `productId`, `addressId`, `warehouseId`) VALUES
(1, 559.75, 296.69, 13, '2025-06-21 19:58:12.734', 9, 12, 6, 4),
(2, 802.3, 650.49, 89, '2025-07-19 04:56:27.307', 7, 2, 1, 3),
(3, 410.19, 105.8, 79, '2025-07-07 12:19:19.567', 3, 1, 17, 5),
(4, 364.85, 883.79, 49, '2025-10-13 15:51:19.220', 2, 15, 19, 1),
(5, 198.89, 14.25, 28, '2025-09-18 07:57:33.936', 10, 10, 12, 1),
(6, 390.69, 140.29, 49, '2025-11-12 12:16:02.171', 6, 9, 17, 5),
(7, 733.29, 964.4, 19, '2025-12-14 19:27:11.521', 3, 5, 14, 2),
(8, 503.59, 384.69, 26, '2025-11-25 13:39:56.714', 8, 6, 8, 2),
(9, 447.39, 877.75, 23, '2026-01-29 09:25:29.735', 10, 6, 17, 3),
(10, 239.39, 525.75, 33, '2026-02-18 22:33:50.930', 4, 8, 3, 2),
(11, 648.2, 292.05, 8, '2026-01-23 17:00:42.612', 10, 13, 18, 5),
(12, 881.35, 337.89, 96, '2025-09-03 17:39:56.162', 8, 11, 11, 4),
(13, 4.22, 208.89, 41, '2025-07-15 15:11:37.359', 5, 9, 10, 2),
(14, 664.2, 271.19, 7, '2025-06-08 10:18:03.314', 10, 7, 2, 4),
(15, 888.65, 264.39, 55, '2025-05-26 06:57:55.081', 2, 6, 7, 3),
(16, 628.85, 274.79, 16, '2025-10-05 23:52:26.028', 1, 11, 15, 5),
(17, 775.95, 920.45, 52, '2025-12-11 00:54:35.265', 4, 10, 12, 1),
(18, 450.59, 384.29, 62, '2025-08-20 14:15:51.378', 5, 13, 2, 1),
(19, 222.09, 970.65, 94, '2026-02-27 05:35:54.800', 2, 8, 7, 4),
(20, 969.3, 475.15, 5, '2026-03-30 03:52:22.433', 7, 3, 2, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `barcode` varchar(191) NOT NULL,
  `unitPrice` double NOT NULL,
  `width` double NOT NULL,
  `height` double NOT NULL,
  `depth` double NOT NULL,
  `Weight` double NOT NULL,
  `Expiration` tinyint(1) NOT NULL,
  `ExpirationDate` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `product`
--

INSERT INTO `product` (`id`, `name`, `barcode`, `unitPrice`, `width`, `height`, `depth`, `Weight`, `Expiration`, `ExpirationDate`) VALUES
(1, 'Licensed Metal Shoes', '0abf1736-c344-42c1-872e-7853b08bae21', 502.7, 59.52723961909926, 68.82719189068376, 11.81834415190604, 51.93216643345432, 0, '2026-02-11 09:19:03.239'),
(2, 'Fresh Plastic Computer', '56ed3293-57d7-4b5d-97be-a212b16e187f', 737.79, 11.60903560032743, 71.18605506709217, 8.545370624360764, 6.577714222395774, 1, '2026-04-13 12:57:12.799'),
(3, 'Soft Bamboo Cheese', 'f90e85ec-8b22-4142-877c-6e36603c8548', 644, 44.59771608789724, 94.57208032696386, 14.29538204660059, 17.60346847398141, 0, '2026-03-29 16:47:32.045'),
(4, 'Generic Marble Gloves', 'cc159cde-7f57-489b-a7bd-e771011b008f', 172.69, 57.5929676999456, 51.93205032036375, 34.35609297843931, 75.02477960239207, 0, '2025-04-28 21:21:05.836'),
(5, 'Tasty Gold Shoes', '4c6d25cf-935b-4591-bfa8-89b338d16791', 918.55, 28.54878647205567, 50.60371050671588, 34.89273726403308, 22.74297889800918, 1, '2025-09-20 16:18:29.676'),
(6, 'Soft Wooden Gloves', '9413037e-f265-4cc2-bd95-664c16ba9bb7', 673.45, 84.99362892113346, 22.75870925082709, 21.07179568323175, 23.26905110790156, 1, '2026-04-16 04:19:03.112'),
(7, 'Refined Plastic Chips', '1183b977-c804-41b0-a06b-7b3640ab3050', 80.09, 32.67535549685039, 1.257784366074175, 87.46518469833167, 87.8628397834785, 0, '2025-06-05 21:02:57.124'),
(8, 'Handmade Gold Hat', 'a5721657-e361-4342-8eb7-2d2bb525f5e1', 767.95, 46.44015095665938, 86.02012828922018, 45.53127742280521, 47.13449935627255, 1, '2025-05-10 01:10:02.435'),
(9, 'Gorgeous Marble Keyboard', '0e8bf36b-5b36-41a7-bf12-a83b758b321e', 330.95, 86.8508247481717, 20.47102255125253, 6.585652018717941, 93.18044744140012, 1, '2025-08-31 17:36:53.269'),
(10, 'Gorgeous Gold Hat', 'b5234e98-1821-4d95-a864-39f6eae0309b', 619.79, 82.39678379050702, 57.09830640561987, 70.01597056490442, 8.922736263748305, 1, '2025-05-29 01:57:55.327'),
(11, 'Awesome Plastic Towels', '60fc11f2-32c0-4918-a10e-dc255bb746e7', 566.09, 55.5589271899325, 24.50524746130376, 7.970932457100456, 53.30263822215152, 1, '2025-12-08 00:16:37.527'),
(12, 'Tasty Bamboo Sausages', 'd6224a04-e91f-4feb-9cbb-dd227b40ef12', 205.39, 86.04004295019074, 16.41169284490361, 70.60285251432829, 84.50244150555771, 0, '2026-02-17 04:35:56.570'),
(13, 'Gorgeous Aluminum Car', 'e1af1ba7-d2f3-4f29-a474-753f344b7fa4', 557.15, 92.63025612848287, 4.202101925989099, 53.63142098721481, 3.933370835028187, 1, '2025-06-30 13:32:50.280'),
(14, 'Tasty Cotton Pants', '6f3008c6-4c33-499b-8d38-f764fb95f07c', 820.59, 15.6156851154953, 57.14795287695461, 33.83104177560033, 30.50662469460324, 1, '2026-03-27 09:20:32.371'),
(15, 'Fresh Gold Car', '421978ae-a70a-49de-8931-12fd7aee5a7e', 108.2, 80.46555584482276, 4.12128761466416, 14.94724837501713, 99.1609532337565, 0, '2025-07-07 18:54:24.211');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `provider`
--

CREATE TABLE `provider` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `provider`
--

INSERT INTO `provider` (`id`, `name`, `email`, `phone`) VALUES
(1, 'Kilback, Kutch and Gutmann', 'Damien82@yahoo.com', '1-730-541-8046 x896'),
(2, 'McGlynn, Kessler and Sauer', 'Lemuel39@gmail.com', '346.684.9796 x4649'),
(3, 'Murazik - Upton', 'Lucius_Frami19@gmail.com', '1-797-935-7174 x8824'),
(4, 'Pouros and Sons', 'Fleta17@hotmail.com', '(701) 289-0062 x298'),
(5, 'Rodriguez, VonRueden and Gutmann', 'Cecil.Green2@yahoo.com', '(546) 808-9488 x576');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL DEFAULT 'USER',
  `firstName` varchar(191) DEFAULT NULL,
  `lastName` varchar(191) DEFAULT NULL,
  `phoneNumber` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`, `firstName`, `lastName`, `phoneNumber`, `createdAt`, `updatedAt`) VALUES
(1, 'Easter21@yahoo.com', '$argon2id$v=19$m=65536,t=3,p=4$cTJhf8tJSitm/iRTUKfK2Q$0LbRLcmXPjiXIQfbW7rX7nF8DxYOzARTDB1C1HNdZ/Y', 'USER', 'Tyrell', 'Klein', '1-219-358-2196 x0131', '2025-04-28 12:19:54.109', '2025-04-30 13:22:46.281'),
(2, 'Colin13@hotmail.com', '$argon2id$v=19$m=65536,t=3,p=4$HB4IiYb3v4vgUWnV2Z+RXg$tyb8cutGBnOh6zW48gB0FRsAYB12/mdqjVyP2HPiogs', 'USER', 'Esta', 'Lemke', '1-756-490-6313 x791', '2025-04-28 12:19:54.148', '2025-04-30 13:24:41.245'),
(3, 'Santos30@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$dH2l6AFKpNoUHQFG3UqXQw$XJ4Nq6wIFL/zzfEW9hcmNxAm1TNnFgFUC+ZdXnXPKWo', 'USER', 'Vito', 'Waters', '1-484-491-9875', '2025-04-28 12:19:54.181', '2025-04-28 12:19:54.181'),
(4, 'Carmine_Deckow@yahoo.com', '$argon2id$v=19$m=65536,t=3,p=4$2UdnmDwy9qBltcvQncv4Zg$3PxyKJHH0NLGtUgLDu0ZFnCe3FUqB/2Xsp6LLdwFn0c', 'ADMIN', 'Madisyn', 'Kshlerin', '(472) 308-8662 x80424', '2025-04-28 12:19:54.213', '2025-04-28 12:19:54.213'),
(5, 'Yadira.Buckridge34@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$n2MGu7lTQPb3XlrJWuqbCQ$6Dum8J920ijhSgh//VfcP0ScHQTORYmIJydYGhS7kCw', 'USER', 'Claire', 'Heller', '1-219-239-8152 x720', '2025-04-28 12:19:54.246', '2025-04-28 12:19:54.246'),
(6, 'Olen.Mohr@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$71kiSKY5ctdcsQgEjo5Slw$YlDZt0Du33/GeIsWy8hGMcx9ouEaIN1Uytv2xCD9QbU', 'USER', 'Beau', 'Berge', '214.327.9441 x856', '2025-04-28 12:19:54.280', '2025-04-28 12:19:54.280'),
(7, 'Claud.Grady@yahoo.com', '$argon2id$v=19$m=65536,t=3,p=4$zZjxKjbwB01QF8NWHMHcaQ$K0J9lDzCSM49eZ/cPJRmfQOeUQAfayxZU82KFz8Ioj8', 'ADMIN', 'Darius', 'Dach', '687.318.2004', '2025-04-28 12:19:54.312', '2025-04-28 12:19:54.312'),
(8, 'Jermain_Lesch-Connelly50@hotmail.com', '$argon2id$v=19$m=65536,t=3,p=4$MwscaPnkThifuIGNtAqjLg$Jml/YD4hVuyY7CtuorHaTnHrU1cNgIPLIWHEHoUeihs', 'ADMIN', 'Thea', 'Boyle', '674.425.1998 x5825', '2025-04-28 12:19:54.344', '2025-04-28 12:19:54.344'),
(9, 'Herta30@yahoo.com', '$argon2id$v=19$m=65536,t=3,p=4$W3RlC2yDgH4bsdYX42/unQ$oQKfOYkaHc21lm3GSCsnQlOIMYRc4hdOiB/QK6GDyzA', 'ADMIN', 'Stephanie', 'Wehner', '457.585.8068 x91074', '2025-04-28 12:19:54.381', '2025-04-28 12:19:54.381'),
(10, 'Mabel.Volkman83@hotmail.com', '$argon2id$v=19$m=65536,t=3,p=4$4fSMdMe5NA3Z9ntKS/Sldg$4KJU84tl3cvmPhMw6DvVvijIy6EBNLP2+ul/B9qV9CU', 'ADMIN', 'Brown', 'Hamill', '216-934-3424', '2025-04-28 12:19:54.420', '2025-04-28 12:19:54.420'),
(11, 'admin@admin.com', '$argon2id$v=19$m=65536,t=3,p=4$rZ0eMwwzs04gAhoQUrqQlw$4taDTpQPN2cwvNOJCw06CH6J1HPHmVpUkeSNXVIVRJk', 'ADMIN', NULL, NULL, NULL, '2025-04-28 12:19:54.456', '2025-04-28 12:19:54.456'),
(12, 'kaitoujap@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$K261MzzieGVbm4RZLrfR6g$O3BfXgTBTr7q+7w/PKnOF1XmvZ4CU12fFvZtbf/vmgo', 'ADMIN', '', '', '', '2025-04-30 13:20:24.682', '2025-04-30 13:27:15.014');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `warehouse`
--

CREATE TABLE `warehouse` (
  `id` int(11) NOT NULL,
  `capacity` tinyint(1) NOT NULL,
  `name` varchar(191) NOT NULL,
  `addressId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `warehouse`
--

INSERT INTO `warehouse` (`id`, `capacity`, `name`, `addressId`) VALUES
(1, 1, 'l', 10),
(2, 0, 'd', 18),
(3, 1, 'i', 10),
(4, 0, 'k', 6),
(5, 0, 'o', 19);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `warehouseonadmin`
--

CREATE TABLE `warehouseonadmin` (
  `warehouseId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `warehouseonadmin`
--

INSERT INTO `warehouseonadmin` (`warehouseId`, `userId`) VALUES
(1, 8),
(1, 9),
(1, 10),
(2, 1),
(2, 5),
(2, 10),
(3, 5),
(3, 6),
(3, 8),
(5, 4);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `address_userId_fkey` (`userId`);

--
-- A tábla indexei `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `deliverydetails`
--
ALTER TABLE `deliverydetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deliveryDetails_productId_fkey` (`productId`),
  ADD KEY `deliveryDetails_deliveryId_fkey` (`deliveryId`),
  ADD KEY `deliveryDetails_warehouseId_fkey` (`warehouseId`),
  ADD KEY `deliveryDetails_addressId_fkey` (`addressId`);

--
-- A tábla indexei `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventory_productId_fkey` (`productId`),
  ADD KEY `inventory_warehouseId_fkey` (`warehouseId`);

--
-- A tábla indexei `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_providerId_fkey` (`providerId`);

--
-- A tábla indexei `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderDetails_orderId_fkey` (`orderId`),
  ADD KEY `orderDetails_productId_fkey` (`productId`),
  ADD KEY `orderDetails_addressId_fkey` (`addressId`),
  ADD KEY `orderDetails_warehouseId_fkey` (`warehouseId`);

--
-- A tábla indexei `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_barcode_key` (`barcode`);

--
-- A tábla indexei `provider`
--
ALTER TABLE `provider`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `provider_name_key` (`name`),
  ADD UNIQUE KEY `provider_email_key` (`email`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_email_key` (`email`);

--
-- A tábla indexei `warehouse`
--
ALTER TABLE `warehouse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `warehouse_addressId_fkey` (`addressId`);

--
-- A tábla indexei `warehouseonadmin`
--
ALTER TABLE `warehouseonadmin`
  ADD PRIMARY KEY (`warehouseId`,`userId`),
  ADD KEY `warehouseOnAdmin_userId_fkey` (`userId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `delivery`
--
ALTER TABLE `delivery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `deliverydetails`
--
ALTER TABLE `deliverydetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT a táblához `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `provider`
--
ALTER TABLE `provider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `warehouse`
--
ALTER TABLE `warehouse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `deliverydetails`
--
ALTER TABLE `deliverydetails`
  ADD CONSTRAINT `deliveryDetails_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `deliveryDetails_deliveryId_fkey` FOREIGN KEY (`deliveryId`) REFERENCES `delivery` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `deliveryDetails_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `deliveryDetails_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `warehouse` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `warehouse` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `provider` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderDetails_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orderDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderDetails_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orderDetails_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `warehouse` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `warehouse`
--
ALTER TABLE `warehouse`
  ADD CONSTRAINT `warehouse_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `warehouseonadmin`
--
ALTER TABLE `warehouseonadmin`
  ADD CONSTRAINT `warehouseOnAdmin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `warehouseOnAdmin_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `warehouse` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
