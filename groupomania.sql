-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 29, 2022 at 12:36 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groupomania`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(255) NOT NULL,
  `comment` text NOT NULL,
  `date` date NOT NULL,
  `idPost` int(255) NOT NULL,
  `idUser` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `comment`, `date`, `idPost`, `idUser`, `firstName`) VALUES
(2, 'Hey IronMan...', '2022-03-29', 108, 109, 'Bruce'),
(3, 'Be nice boys ! Admin is watching !', '2022-03-29', 108, 101, 'Mister');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(255) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `text`, `image`, `date`, `idUser`) VALUES
(167, 'Welcome to GROUPOMANIA !', '/images/1648462255346_groupomania.png', '2022-03-28', 101),
(171, 'Hi everyone !', '/images/1648556440396_thumb-1920-282535.jpg', '2022-03-29', 108),
(172, 'Batman is here !', '/images/1648556527658_d97abaa3ecc0d3aeb48fe80bd0538557.jpg', '2022-03-29', 109);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `description` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `description`, `isAdmin`) VALUES
(101, 'Mister', 'Admin', 'admin123@gmail.com', '$2b$10$XNGVXldkviLOq3lDP5MSOep2cqp1L0.i9ulro2VQD35YsoJyofSFu', 'THE BOSS', 1),
(108, 'Tony', 'Stark', 'tony@gmail.com', '$2b$10$hkjfTd8OJ3zaWESswueInut/kXg9Tfg8r.csaGUDwxCi6PB1o35ha', 'Iron Man', 0),
(109, 'Bruce', 'Wayne', 'bruce@gmail.com', '$2b$10$.aAj1C3SCDgQVX354E2zWe7t44xDBD1oEtbXCu3LJBZH7eegvfKtW', 'Batman', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
