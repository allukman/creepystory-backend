-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2021 at 01:51 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.3.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `creepy_story`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `ac_Id` int(11) UNSIGNED NOT NULL,
  `ac_name` varchar(50) NOT NULL,
  `ac_email` varchar(50) NOT NULL,
  `ac_phone` varchar(20) NOT NULL,
  `ac_password` varchar(100) NOT NULL,
  `ac_status` int(11) NOT NULL DEFAULT 1,
  `ac_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ac_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`ac_Id`, `ac_name`, `ac_email`, `ac_phone`, `ac_password`, `ac_status`, `ac_created_at`, `ac_updated_at`) VALUES
(1, 'Al Lukman', 'lukman18@gmail.com', '087719182718', '$2b$10$yg/HrRR8.mk9oCsLiXgnROx7HC5R62qz/qQxIUgwUyTxWzgpLcpHC', 1, '2021-04-12 11:21:59', '2021-04-12 11:21:59'),
(2, 'Dono Handoko', 'dono.handoko1@gmail.com', '087719182718', '$2b$10$Hd63wAKgH9VscKUxHO0Ydu9YcLuWrPr5/HTNUoUqsD/Fowz4POqji', 1, '2021-04-12 11:23:06', '2021-04-12 11:23:06'),
(3, 'Joko Susilo', 'joko112@gmail.com', '087719182718', '$2b$10$5Av7sQy8yVakyoQ37//ZO.0ZgEy7730XKxfugNZQST6jirSx/vnN2', 1, '2021-04-12 11:23:56', '2021-04-12 11:23:56'),
(4, 'Hendra Bambang', 'henda223@gmail.com', '087719182718', '$2b$10$AdL6oNaOQIIGVfTvN1DlfuYt5a08UPpGYY49ZU3VMio/ifVorF3hO', 1, '2021-04-12 11:24:19', '2021-04-12 11:24:19');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `ct_id` int(11) UNSIGNED NOT NULL,
  `ct_name` varchar(50) NOT NULL,
  `ct_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ct_udpated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ct_id`, `ct_name`, `ct_created_at`, `ct_udpated_at`) VALUES
(1, 'Creepy Pasta', '2021-04-12 11:30:53', '2021-04-12 11:30:53'),
(2, 'Riddle', '2021-04-12 11:31:05', '2021-04-12 11:31:05'),
(3, 'Urban Legend', '2021-04-12 11:31:12', '2021-04-12 11:31:12'),
(4, 'Real Experience', '2021-04-12 11:31:23', '2021-04-12 11:31:23');

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `fa_id` int(10) UNSIGNED NOT NULL,
  `me_id` int(10) UNSIGNED NOT NULL,
  `st_id` int(10) UNSIGNED NOT NULL,
  `fa_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `fa_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favorite`
--

INSERT INTO `favorite` (`fa_id`, `me_id`, `st_id`, `fa_created_at`, `fa_updated_at`) VALUES
(1, 1, 3, '2021-04-12 11:47:17', '2021-04-12 11:47:17'),
(2, 1, 5, '2021-04-12 11:47:34', '2021-04-12 11:47:34'),
(3, 2, 1, '2021-04-12 11:47:38', '2021-04-12 11:47:38'),
(4, 2, 8, '2021-04-12 11:47:45', '2021-04-12 11:47:45'),
(5, 3, 7, '2021-04-12 11:47:49', '2021-04-12 11:47:49'),
(6, 3, 6, '2021-04-12 11:47:53', '2021-04-12 11:47:53'),
(7, 3, 3, '2021-04-12 11:47:56', '2021-04-12 11:47:56'),
(8, 4, 8, '2021-04-12 11:48:00', '2021-04-12 11:48:00'),
(9, 4, 2, '2021-04-12 11:48:02', '2021-04-12 11:48:02'),
(10, 4, 3, '2021-04-12 11:48:05', '2021-04-12 11:48:05');

-- --------------------------------------------------------

--
-- Table structure for table `label`
--

CREATE TABLE `label` (
  `la_id` int(11) UNSIGNED NOT NULL,
  `st_id` int(11) UNSIGNED NOT NULL,
  `la_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `label`
--

INSERT INTO `label` (`la_id`, `st_id`, `la_name`) VALUES
(1, 1, 'murder'),
(2, 1, 'rituals'),
(3, 2, 'rituals'),
(4, 2, 'strange'),
(5, 3, 'deaths'),
(6, 4, 'Entities'),
(7, 5, 'Artifacts'),
(8, 6, 'Sites'),
(9, 7, 'Dreams'),
(10, 8, 'Objects');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `me_id` int(11) UNSIGNED NOT NULL,
  `ac_id` int(10) UNSIGNED NOT NULL,
  `me_domicile` varchar(50) DEFAULT NULL,
  `me_description` text DEFAULT NULL,
  `me_role` enum('vilagger','witch','guardian','angel','ghost','hunter','werewolf','wizard') NOT NULL DEFAULT 'vilagger',
  `me_dob` date DEFAULT NULL,
  `me_gender` int(11) NOT NULL DEFAULT 0,
  `me_photo_profile` text DEFAULT NULL,
  `me_photo_cover` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`me_id`, `ac_id`, `me_domicile`, `me_description`, `me_role`, `me_dob`, `me_gender`, `me_photo_profile`, `me_photo_cover`) VALUES
(1, 1, 'jakarta', 'Hello its me', 'witch', '2020-10-10', 1, 'img_1618226743678.jpeg', 'img_1618226917303.jpg'),
(2, 2, 'bandung', 'I will make you scare', 'guardian', '2020-10-10', 1, 'img_1618226805932.jpg', 'img_1618226927647.jpg'),
(3, 3, 'surabaya', 'i will haunt you', 'angel', '2020-10-10', 1, 'img_1618226853487.jpg', 'img_1618226946397.jpg'),
(4, 4, 'makasar', 'never stop', 'ghost', '2020-10-10', 1, 'img_1618226898819.png', 'img_1618226966622.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `story`
--

CREATE TABLE `story` (
  `st_id` int(10) UNSIGNED NOT NULL,
  `ct_id` int(11) UNSIGNED NOT NULL,
  `me_id` int(11) UNSIGNED NOT NULL,
  `st_title` varchar(50) NOT NULL,
  `st_photo_cover` text NOT NULL,
  `st_content` text NOT NULL,
  `st_favorited` int(11) DEFAULT NULL,
  `st_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `st_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `story`
--

INSERT INTO `story` (`st_id`, `ct_id`, `me_id`, `st_title`, `st_photo_cover`, `st_content`, `st_favorited`, `st_created_at`, `st_updated_at`) VALUES
(1, 1, 1, 'Jembatan Merah', 'img_1618227154388.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-04-12 11:32:34', '2021-04-12 11:49:59'),
(2, 3, 1, 'Kotak Merah', 'img_1618227208721.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-04-12 11:33:28', '2021-04-12 11:49:59'),
(3, 2, 2, 'Sebuah Rumah', 'img_1618227232680.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 3, '2021-04-12 11:33:52', '2021-04-12 11:49:59'),
(4, 4, 2, 'Kuntilanak Merah', 'img_1618227370933.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 0, '2021-04-12 11:36:10', '2021-04-12 11:44:02'),
(5, 2, 3, 'Dadu', 'img_1618227435621.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-04-12 11:37:15', '2021-04-12 11:49:59'),
(6, 1, 3, 'Boneka Anabele', 'img_1618227475031.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-04-12 11:37:55', '2021-04-12 11:49:59'),
(7, 1, 4, 'Mata merah', 'img_1618227501760.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2021-04-12 11:38:21', '2021-04-12 11:49:59'),
(8, 4, 4, 'Mata merah', 'img_1618227513387.jpeg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, '2021-04-12 11:38:33', '2021-04-12 11:49:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ac_Id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ct_id`);

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`fa_id`),
  ADD KEY `me_id` (`me_id`) USING BTREE,
  ADD KEY `st_id` (`st_id`) USING BTREE;

--
-- Indexes for table `label`
--
ALTER TABLE `label`
  ADD PRIMARY KEY (`la_id`),
  ADD KEY `st_id` (`st_id`) USING BTREE;

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`me_id`),
  ADD UNIQUE KEY `ac_id` (`ac_id`);

--
-- Indexes for table `story`
--
ALTER TABLE `story`
  ADD PRIMARY KEY (`st_id`),
  ADD KEY `ct_id` (`ct_id`) USING BTREE,
  ADD KEY `me_id` (`me_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `ac_Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ct_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `fa_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `label`
--
ALTER TABLE `label`
  MODIFY `la_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `me_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `story`
--
ALTER TABLE `story`
  MODIFY `st_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`me_id`) REFERENCES `member` (`me_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`st_id`) REFERENCES `story` (`st_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `label`
--
ALTER TABLE `label`
  ADD CONSTRAINT `label_ibfk_1` FOREIGN KEY (`st_id`) REFERENCES `story` (`st_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `member_ibfk_1` FOREIGN KEY (`ac_id`) REFERENCES `account` (`ac_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `story`
--
ALTER TABLE `story`
  ADD CONSTRAINT `story_ibfk_1` FOREIGN KEY (`ct_id`) REFERENCES `category` (`ct_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `story_ibfk_2` FOREIGN KEY (`me_id`) REFERENCES `member` (`me_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
