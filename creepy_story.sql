-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2021 at 01:18 PM
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
(4, 'Al Lukman', 'lukman2@gmail.com', '087719182718', '$2b$10$/BHjjX/hkmRTQLGA/VfBcuXFKP4VsH6UedPbuIzGTKXc.tk1XYzE6', 1, '2021-02-16 13:18:47', '2021-02-16 13:18:47'),
(5, 'Al Lukman', 'lukman3@gmail.com', '087719182718', '$2b$10$QGiAYxW9jKYNvY/PeRGYf.TRmhhrn0jz1lhQYwg1sOmMFdnsCwJu6', 1, '2021-02-20 03:01:04', '2021-02-20 03:01:04');

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
(3, 'Riddle', '2021-02-15 02:25:52', '2021-02-17 14:10:00'),
(4, 'Urban Legend', '2021-02-17 14:10:17', '2021-02-17 14:10:17'),
(5, 'Real Story', '2021-02-17 14:10:42', '2021-02-17 14:10:42'),
(6, 'folklorea', '2021-02-20 03:02:56', '2021-02-20 03:02:56');

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
(9, 3, 27, '2021-02-20 03:19:09', '2021-02-20 03:19:09'),
(10, 3, 19, '2021-02-20 03:39:19', '2021-02-20 03:39:19'),
(11, 3, 19, '2021-02-20 03:39:20', '2021-02-20 03:39:20'),
(12, 3, 19, '2021-02-20 03:39:21', '2021-02-20 03:39:21'),
(13, 3, 21, '2021-02-20 03:43:44', '2021-02-20 03:43:44'),
(14, 3, 21, '2021-02-20 03:43:44', '2021-02-20 03:43:44'),
(15, 3, 21, '2021-02-20 03:43:45', '2021-02-20 03:43:45'),
(16, 3, 21, '2021-02-20 03:43:45', '2021-02-20 03:43:45'),
(17, 3, 21, '2021-02-20 03:43:46', '2021-02-20 03:43:46');

-- --------------------------------------------------------

--
-- Table structure for table `label`
--

CREATE TABLE `label` (
  `la_id` int(11) UNSIGNED NOT NULL,
  `st_id` int(11) UNSIGNED NOT NULL,
  `la_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(3, 4, 'jakarta', 'Hello its me', 'witch', '2020-10-10', 1, 'img_1613790147036.png', 'img_1613790157372.png'),
(4, 5, NULL, NULL, 'vilagger', NULL, 0, NULL, NULL);

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
(19, 3, 3, 'hantu', '', '', 3, '2021-02-20 03:06:09', '2021-02-20 03:39:53'),
(20, 6, 3, 'daw', 'awd', 'awd', 0, '2021-02-20 03:06:56', '2021-02-20 03:17:08'),
(21, 6, 3, 'hantu', '', '', 5, '2021-02-20 03:07:29', '2021-02-20 03:43:49'),
(22, 6, 3, 'hantu', '', '', 0, '2021-02-20 03:07:53', '2021-02-20 03:17:08'),
(23, 6, 3, 'hantu', '', '', 0, '2021-02-20 03:08:51', '2021-02-20 03:17:08'),
(24, 6, 3, 'hantu', '', '', 0, '2021-02-20 03:09:57', '2021-02-20 03:17:08'),
(25, 6, 3, 'hantu', 'img_1613790875671.png', 'awdawd', 0, '2021-02-20 03:14:35', '2021-02-20 03:14:35'),
(26, 6, 3, 'hantu', 'img_1613790893463.png', 'awdawd', 0, '2021-02-20 03:14:53', '2021-02-20 03:17:08'),
(27, 6, 3, 'Hantu panjang', 'img_1613790908602.png', 'Hantuuuuuuuu panjanggggg', 1, '2021-02-20 03:15:08', '2021-02-20 03:32:06');

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
  MODIFY `ac_Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ct_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `fa_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `label`
--
ALTER TABLE `label`
  MODIFY `la_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `me_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `story`
--
ALTER TABLE `story`
  MODIFY `st_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

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
