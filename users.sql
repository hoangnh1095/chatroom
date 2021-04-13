-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2021 at 03:37 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `call`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `tennsd` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `tennsd`, `email`) VALUES
(1, 'admin', '123', 'Quan Tri Vien', 'admin@gmail.com'),
(2, 'phanthanh123', '123123', 'Duy', 'phan'),
(3, 'duyduy', '789789', 'phanthanhduy', 'đasadas'),
(4, 'abc', '123', 'Hiu', 'ygyuguyg'),
(5, '123', '123', 'duy', 'tygygy'),
(6, 'phanthanh123', '123', 'dá', 'dá'),
(7, 'minhanh', '123456789', 'dá', 'dá'),
(8, 'phanthanh123789', '123456789', '123', 'sd'),
(9, '789789789', '123', 'sad', 'dsad'),
(10, 'phanthanh123aa', '123456', 'duy', 'aaa'),
(11, 'phanthanh123aa', '12', '12', '12'),
(12, '', '', '', ''),
(13, '', '', '', ''),
(14, 'buiminhanh', '123', 'diu', 'nhocduy789789789@gmail.com'),
(15, 'nguyenthidieu789', '123', 'duy', 'aaa'),
(16, 'nguyenthidieu789789789', '123', 'duy', 'aaa'),
(17, 'phanthanhduy789789789', '123', '123', '123'),
(18, 'nhocac123', 'Admin_123', '123', 'dsa'),
(19, '123123', '123', 'dsa', 'dsa'),
(20, '123123', '123', 'dsa', 'dsa'),
(21, 'phanthanh123aa', '123', 'ádsad', 'dasa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
