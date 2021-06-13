-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 13, 2021 at 09:16 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `learnsten`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `schoolId` int(11) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `schoolId`, `description`, `last_updated`, `created_at`) VALUES
(50, 'maths is great', 23, 'this is the main thing to be done in the last few nights thank you', '2021-06-11 12:48:21', '2021-06-11 12:48:21'),
(51, 'test', 23, 'test', '2021-06-11 13:02:52', '2021-06-11 13:02:52'),
(52, 'ashiq - the love course', 21, 'Yo all the love course is here , join fast...', '2021-06-11 14:00:06', '2021-06-11 14:00:06'),
(53, 'amit jadu', 24, 'Magic tricks here', '2021-06-11 14:02:53', '2021-06-11 14:02:53'),
(54, 'kunal', 23, 'Kunal@123', '2021-06-11 14:06:23', '2021-06-11 14:06:23'),
(55, 'c++ part 1', 23, 'this is the first course of c++ , The so called \" Basics \" ....... Thank you and have a nice day ...', '2021-06-11 14:09:25', '2021-06-11 14:09:25'),
(56, 'test-redirection', 23, 'testing the redirection of the page after creating new course.', '2021-06-11 14:20:05', '2021-06-11 14:20:05'),
(57, 'test redirection', 24, 'testing the redirection', '2021-06-11 14:23:27', '2021-06-11 14:23:27'),
(58, 'testing', 24, 'testing', '2021-06-11 14:25:51', '2021-06-11 14:25:51'),
(59, 'test4', 23, 'testing the system', '2021-06-11 14:27:42', '2021-06-11 14:27:42'),
(60, 'test5', 23, 'test', '2021-06-11 14:33:15', '2021-06-11 14:33:15'),
(61, 'testy', 23, 'test', '2021-06-11 14:36:38', '2021-06-11 14:36:38'),
(62, 'testyd', 23, 'test', '2021-06-11 14:37:10', '2021-06-11 14:37:10'),
(63, 'test234', 23, 'test', '2021-06-11 14:40:35', '2021-06-11 14:40:35'),
(64, 'test09', 23, 'test', '2021-06-11 14:47:37', '2021-06-11 14:47:37'),
(65, 'test09sdf', 23, 'test', '2021-06-11 14:50:03', '2021-06-11 14:50:03'),
(66, 'test09sdfsf', 23, 'test', '2021-06-11 14:50:46', '2021-06-11 14:50:46'),
(67, 'tseetst', 23, 'tset', '2021-06-11 14:55:58', '2021-06-11 14:55:58'),
(68, 'tesdfs', 23, 'essfd', '2021-06-11 14:57:34', '2021-06-11 14:57:34'),
(69, 'tesdfss', 23, 'essfd', '2021-06-11 14:57:48', '2021-06-11 14:57:48'),
(70, 'sdfsdf', 23, 'fsdfsd', '2021-06-11 15:07:29', '2021-06-11 15:07:29'),
(71, 'sdfsdftest', 23, 'fsdfsd', '2021-06-11 15:07:42', '2021-06-11 15:07:42'),
(72, 'hello', 23, 'hello', '2021-06-11 15:11:58', '2021-06-11 15:11:58'),
(73, 'hello4', 22, 'hello', '2021-06-11 15:12:08', '2021-06-11 15:12:08'),
(74, 'sdkjfsdf', 23, 'test', '2021-06-11 15:13:19', '2021-06-11 15:13:19'),
(75, 'sdkjfsdfdfsdf', 23, 'test', '2021-06-11 15:13:52', '2021-06-11 15:13:52'),
(76, 'sdkjfsdfdfsdfd', 23, 'test', '2021-06-11 15:14:31', '2021-06-11 15:14:31'),
(77, 'sdkjfsdfdfdfsdfd', 23, 'test', '2021-06-11 15:16:06', '2021-06-11 15:16:06'),
(78, 'sdfsdfdsfsdf', 23, 'sdfsdf', '2021-06-11 15:16:27', '2021-06-11 15:16:27'),
(79, 'sdfsdfdsfsdfsd', 23, 'sdfsdf', '2021-06-11 15:18:02', '2021-06-11 15:18:02'),
(80, 'sdfsdfdsfsdfsdsdf', 23, 'sdfsdf', '2021-06-11 15:18:15', '2021-06-11 15:18:15'),
(81, 'sfsdf', 23, 'sdfsdfa', '2021-06-11 15:18:28', '2021-06-11 15:18:28'),
(82, 'sfsdfsd', 23, 'sdfsdfa', '2021-06-11 15:19:28', '2021-06-11 15:19:28'),
(83, 'sfsdfsdsdf', 23, 'sdfsdfa', '2021-06-11 15:19:38', '2021-06-11 15:19:38'),
(84, 'sdf', 23, 'sdfsdfa', '2021-06-11 15:25:09', '2021-06-11 15:25:09');

-- --------------------------------------------------------

--
-- Table structure for table `courseSubjectMap`
--

CREATE TABLE `courseSubjectMap` (
  `id` int(11) NOT NULL,
  `subjectId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courseSubjectMap`
--

INSERT INTO `courseSubjectMap` (`id`, `subjectId`, `courseId`, `last_updated`, `created_at`) VALUES
(30, 83, 50, '2021-06-11 12:48:21', '2021-06-11 12:48:21'),
(31, 84, 50, '2021-06-11 12:48:22', '2021-06-11 12:48:22'),
(32, 85, 50, '2021-06-11 12:48:22', '2021-06-11 12:48:22'),
(33, 86, 50, '2021-06-11 12:48:22', '2021-06-11 12:48:22'),
(34, 87, 51, '2021-06-11 13:02:53', '2021-06-11 13:02:53'),
(35, 88, 52, '2021-06-11 14:00:06', '2021-06-11 14:00:06'),
(36, 89, 52, '2021-06-11 14:00:06', '2021-06-11 14:00:06'),
(37, 90, 52, '2021-06-11 14:00:07', '2021-06-11 14:00:07'),
(38, 92, 53, '2021-06-11 14:02:53', '2021-06-11 14:02:53'),
(39, 93, 53, '2021-06-11 14:02:53', '2021-06-11 14:02:53'),
(40, 94, 53, '2021-06-11 14:02:53', '2021-06-11 14:02:53'),
(41, 95, 54, '2021-06-11 14:06:24', '2021-06-11 14:06:24'),
(42, 96, 55, '2021-06-11 14:09:26', '2021-06-11 14:09:26'),
(43, 97, 55, '2021-06-11 14:09:26', '2021-06-11 14:09:26'),
(44, 98, 62, '2021-06-11 14:37:10', '2021-06-11 14:37:10'),
(45, 99, 64, '2021-06-11 14:47:37', '2021-06-11 14:47:37'),
(46, 100, 65, '2021-06-11 14:50:03', '2021-06-11 14:50:03'),
(47, 101, 65, '2021-06-11 14:50:03', '2021-06-11 14:50:03'),
(48, 102, 66, '2021-06-11 14:50:46', '2021-06-11 14:50:46'),
(49, 103, 68, '2021-06-11 14:57:34', '2021-06-11 14:57:34'),
(50, 104, 70, '2021-06-11 15:07:29', '2021-06-11 15:07:29'),
(51, 67, 71, '2021-06-11 15:07:42', '2021-06-11 15:07:42'),
(52, 67, 72, '2021-06-11 15:11:58', '2021-06-11 15:11:58'),
(53, 67, 73, '2021-06-11 15:12:09', '2021-06-11 15:12:09'),
(54, 67, 74, '2021-06-11 15:13:19', '2021-06-11 15:13:19'),
(55, 67, 75, '2021-06-11 15:13:52', '2021-06-11 15:13:52'),
(56, 67, 76, '2021-06-11 15:14:31', '2021-06-11 15:14:31'),
(57, 67, 77, '2021-06-11 15:16:06', '2021-06-11 15:16:06'),
(58, 105, 78, '2021-06-11 15:16:28', '2021-06-11 15:16:28'),
(59, 105, 79, '2021-06-11 15:18:02', '2021-06-11 15:18:02'),
(60, 105, 80, '2021-06-11 15:18:16', '2021-06-11 15:18:16'),
(61, 106, 81, '2021-06-11 15:18:28', '2021-06-11 15:18:28'),
(62, 106, 82, '2021-06-11 15:19:28', '2021-06-11 15:19:28'),
(63, 106, 83, '2021-06-11 15:19:38', '2021-06-11 15:19:38'),
(64, 105, 83, '2021-06-11 15:19:38', '2021-06-11 15:19:38'),
(65, 107, 84, '2021-06-11 15:25:09', '2021-06-11 15:25:09'),
(66, 108, 84, '2021-06-11 15:25:09', '2021-06-11 15:25:09');

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `courses` int(4) DEFAULT NULL,
  `ownerId` int(11) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `school_profile_url` text DEFAULT NULL,
  `privacy` int(1) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school`
--

INSERT INTO `school` (`id`, `name`, `courses`, `ownerId`, `description`, `school_profile_url`, `privacy`, `last_updated`, `created_at`) VALUES
(1, 'test School', NULL, 1, 'this is a test', NULL, 0, '2021-05-31 17:43:14', '2021-05-31 17:43:14'),
(5, 'test 2', NULL, 1, 'this is the third test thank you and have a nice day', NULL, 0, '2021-05-31 18:01:19', '2021-05-31 18:01:19'),
(6, 'test 3', NULL, 1, 'this is the third test thank you and have a nice day', NULL, 0, '2021-05-31 18:03:03', '2021-05-31 18:03:03'),
(7, 'test 4', NULL, 1, 'this is the fourth test', NULL, 0, '2021-05-31 18:07:36', '2021-05-31 18:07:36'),
(8, 'test 5', NULL, 1, 'this is the fifth test', NULL, 0, '2021-05-31 18:08:22', '2021-05-31 18:08:22'),
(9, 'test 6', NULL, 1, 'this is the sixth test', NULL, 0, '2021-05-31 18:12:53', '2021-05-31 18:12:53'),
(10, 'test 7', NULL, 1, 'this is the 7th test', NULL, 0, '2021-05-31 18:14:34', '2021-05-31 18:14:34'),
(11, 'Indian High School', NULL, 1, 'this is possibly the last test of making the school. thank you and have a nice day.', NULL, 1, '2021-06-03 07:57:32', '2021-06-03 07:57:32'),
(12, 'aman high school', NULL, 21, 'I am proud that I am a owner of school, thank you very much', NULL, 0, '2021-06-03 08:16:28', '2021-06-03 08:16:28'),
(13, 'aman private school', NULL, 21, 'this is my second school but private', NULL, 1, '2021-06-03 08:19:01', '2021-06-03 08:19:01'),
(14, 'time school', NULL, 1, 'this school is made to test the time (last updated time of the school)', NULL, 0, '2021-06-03 08:40:18', '2021-06-03 08:40:18'),
(15, 'time check test 2', NULL, 1, 'this is the second time we are testing the time thank you', NULL, 0, '2021-06-03 08:42:33', '2021-06-03 08:42:33'),
(16, 'Satyam dongre tsd research', NULL, 1, 'In this school , I am making my reasearch and sharing with you.', NULL, 1, '2021-06-03 11:58:27', '2021-06-03 11:58:27'),
(17, 'fantastic popcorn', NULL, 1, 'this is an amazing school please join ,pls, request', NULL, 0, '2021-06-03 12:21:00', '2021-06-03 12:21:00'),
(18, 'Amit jadhav reasearch and mathematics', NULL, 1, 'In this school I will be teaching something amazing', NULL, 0, '2021-06-03 12:42:51', '2021-06-03 12:42:51'),
(19, 'testing school', NULL, 1, 'this is a test', NULL, 1, '2021-06-03 12:45:13', '2021-06-03 12:45:13'),
(20, 'science', NULL, 1, 'sdflkj sdflkjsl dkfjsldf', NULL, 0, '2021-06-04 09:27:49', '2021-06-04 09:27:49'),
(21, 'ashish zade international school', NULL, 1, 'All the sanatanis join here, ', NULL, 1, '2021-06-06 13:57:03', '2021-06-06 13:57:03'),
(22, 'Kunal', NULL, 1, '', NULL, 0, '2021-06-06 14:32:14', '2021-06-06 14:32:14'),
(23, 'felix popcorn', NULL, 1, 'Join to learn something about universe', NULL, 1, '2021-06-06 14:39:13', '2021-06-06 14:39:13'),
(24, 'amit', NULL, 1, 'THIS IS A TEST SCHOOL', NULL, 0, '2021-06-11 05:44:45', '2021-06-11 05:44:45');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `name`, `last_updated`, `created_at`) VALUES
(57, 'kunal', '2021-06-11 05:33:42', '2021-06-11 05:33:42'),
(58, 'google', '2021-06-11 05:34:06', '2021-06-11 05:34:06'),
(59, 'maths', '2021-06-11 05:34:06', '2021-06-11 05:34:06'),
(60, 'science', '2021-06-11 05:38:38', '2021-06-11 05:38:38'),
(61, 'hello', '2021-06-11 05:38:38', '2021-06-11 05:38:38'),
(62, 'testing123', '2021-06-11 05:38:38', '2021-06-11 05:38:38'),
(63, 'testing 1234', '2021-06-11 05:40:26', '2021-06-11 05:40:26'),
(64, 'hell', '2021-06-11 05:47:18', '2021-06-11 05:47:18'),
(65, 'testing123333', '2021-06-11 05:47:18', '2021-06-11 05:47:18'),
(66, 'chemiistry', '2021-06-11 05:47:18', '2021-06-11 05:47:18'),
(67, 'test', '2021-06-11 05:49:25', '2021-06-11 05:49:25'),
(68, 'pipe', '2021-06-11 05:49:25', '2021-06-11 05:49:25'),
(69, 'physics', '2021-06-11 05:49:25', '2021-06-11 05:49:25'),
(70, 'bio', '2021-06-11 05:49:25', '2021-06-11 05:49:25'),
(71, 'Kunal@123', '2021-06-11 05:55:42', '2021-06-11 05:55:42'),
(72, 'testing', '2021-06-11 05:55:42', '2021-06-11 05:55:42'),
(73, 'commerce', '2021-06-11 05:58:04', '2021-06-11 05:58:04'),
(74, 'art', '2021-06-11 05:58:04', '2021-06-11 05:58:04'),
(75, 'subject123', '2021-06-11 05:59:29', '2021-06-11 05:59:29'),
(76, 'satyam', '2021-06-11 06:02:57', '2021-06-11 06:02:57'),
(77, 'om', '2021-06-11 06:02:57', '2021-06-11 06:02:57'),
(78, 'geography', '2021-06-11 06:05:33', '2021-06-11 06:05:33'),
(79, 'history', '2021-06-11 06:05:33', '2021-06-11 06:05:33'),
(80, 'politics', '2021-06-11 06:18:54', '2021-06-11 06:18:54'),
(81, 'gynacology', '2021-06-11 06:18:54', '2021-06-11 06:18:54'),
(82, 'physiology', '2021-06-11 06:18:54', '2021-06-11 06:18:54'),
(83, 'amazing', '2021-06-11 12:48:21', '2021-06-11 12:48:21'),
(84, 'thank you', '2021-06-11 12:48:21', '2021-06-11 12:48:21'),
(85, 'this is greate', '2021-06-11 12:48:21', '2021-06-11 12:48:21'),
(86, 'you', '2021-06-11 12:48:21', '2021-06-11 12:48:21'),
(87, 'test2', '2021-06-11 13:02:52', '2021-06-11 13:02:52'),
(88, 'love', '2021-06-11 14:00:06', '2021-06-11 14:00:06'),
(89, 'ishq', '2021-06-11 14:00:06', '2021-06-11 14:00:06'),
(90, 'ashiq', '2021-06-11 14:00:06', '2021-06-11 14:00:06'),
(91, 'ashish zade', '2021-06-11 14:00:06', '2021-06-11 14:00:06'),
(92, 'jadu', '2021-06-11 14:02:53', '2021-06-11 14:02:53'),
(93, 'magic', '2021-06-11 14:02:53', '2021-06-11 14:02:53'),
(94, 'it\'s magic', '2021-06-11 14:02:53', '2021-06-11 14:02:53'),
(95, 'main', '2021-06-11 14:06:24', '2021-06-11 14:06:24'),
(96, 'c++', '2021-06-11 14:09:25', '2021-06-11 14:09:25'),
(97, 'computer science', '2021-06-11 14:09:25', '2021-06-11 14:09:25'),
(98, 'test o', '2021-06-11 14:37:10', '2021-06-11 14:37:10'),
(99, 'majro', '2021-06-11 14:47:37', '2021-06-11 14:47:37'),
(100, 'fantastic', '2021-06-11 14:50:03', '2021-06-11 14:50:03'),
(101, 'fabulous', '2021-06-11 14:50:03', '2021-06-11 14:50:03'),
(102, 'school', '2021-06-11 14:50:46', '2021-06-11 14:50:46'),
(103, 'sdfsfaf', '2021-06-11 14:57:34', '2021-06-11 14:57:34'),
(104, 'sdf', '2021-06-11 15:07:29', '2021-06-11 15:07:29'),
(105, 'sdfsdf', '2021-06-11 15:16:27', '2021-06-11 15:16:27'),
(106, 'erw', '2021-06-11 15:18:28', '2021-06-11 15:18:28'),
(107, 'sdfs fasdf', '2021-06-11 15:25:09', '2021-06-11 15:25:09'),
(108, 'fasfasf', '2021-06-11 15:25:09', '2021-06-11 15:25:09');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(512) NOT NULL,
  `bio` varchar(512) DEFAULT NULL,
  `email` varchar(256) NOT NULL,
  `location` varchar(128) DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `twitter` varchar(30) DEFAULT NULL,
  `institute` varchar(128) DEFAULT NULL,
  `profile_image_url` text DEFAULT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `bio`, `email`, `location`, `url`, `twitter`, `institute`, `profile_image_url`, `last_updated`, `created_at`) VALUES
(1, 'Kunal Dongre', 'kunal', '$2b$10$Ja4StNWYE5hkllCC3WzpuOBE/zMZtm64ymtc9LTNMMCSbDPJOVz5m', 'I am making this website and will be completed in some dayssf', 'dongrekunal16@gmail.com', 'Pawar Colonysfsdf', 'kunaldongre.io', 'kunaldongre245', 'kailashpat singhania high school.', NULL, '2021-05-18 16:20:34', '2021-05-18 16:20:34'),
(2, NULL, 'username', '$2b$10$2jFK96y80A70Zn9umIHiqOvt9RbKOnLCh64ftow3DsTSQskMmA5su', NULL, 'user@gmail', NULL, NULL, NULL, NULL, NULL, '2021-05-18 16:39:49', '2021-05-18 16:39:49'),
(3, NULL, 'test', '$2b$10$zHzkcNxEgWCQKayer7blSOo5SB.jXPB0kRpF1bAonu0pmjjWbiZ9C', NULL, 'test@gmail', NULL, NULL, NULL, NULL, NULL, '2021-05-18 16:54:26', '2021-05-18 16:54:26'),
(20, NULL, 'fsfd', '$2b$10$LT9nBAfvhiCeMNZgZevlSOVOjWxqJkvJICxR0mlnLp.1XfCmYXg.i', NULL, 'dsdf@gmail.com', NULL, NULL, NULL, NULL, NULL, '2021-05-21 17:20:59', '2021-05-21 17:20:59'),
(21, NULL, 'aman', '$2b$10$VR6JRG6JLA/QV2DZJHL51OOH/lvkhoGX5/6t2.i3ifncV7S.SeSBG', 'I Luvvv #BTS... BTS is my life.... Jimin is love', 'aman@gmail.com', 'BTS colony', 'amankasare.io', 'amanbts', 'Samrat Ashok Technical Institute', NULL, '2021-05-22 16:22:42', '2021-05-22 16:22:42'),
(23, NULL, 'amit', '$2b$10$o6Daq5.WSAk4afCLXYceCOVwMLNuhVd2eGgCY/g6Ik2jKdG1bpagq', NULL, 'amit@gmail.com', NULL, NULL, NULL, NULL, NULL, '2021-05-23 12:55:21', '2021-05-23 12:55:21'),
(32, NULL, 'satyam', '$2b$10$lZbB79IyKNco31IAxm25JutDmeJkBnzEBtdS/ofBtgDPHwLgkitsW', NULL, 's@g.com', NULL, NULL, NULL, NULL, NULL, '2021-05-24 17:02:52', '2021-05-24 17:02:52'),
(33, NULL, 'kunaldsdfsd', '$2b$10$P3iZc1WB.ZqV8RREP50kQuKLzfTjuiYrAos7WqXrs6zVZHvbyV0Ue', NULL, 'lkdsjfdlk@gmsdklj.com', NULL, NULL, NULL, NULL, NULL, '2021-05-26 11:00:27', '2021-05-26 11:00:27'),
(34, NULL, 'kunaldongre', '$2b$10$neWP.S9TzAlPxXGez3DPiu1hn5WqpZMO3v7yn7F0/G3A1te1A1kxK', NULL, 'dongrekunal@gmail.com', NULL, NULL, NULL, NULL, NULL, '2021-05-26 15:58:17', '2021-05-26 15:58:17'),
(35, NULL, 'kunaldongre24', '$2b$10$cxEURGQGsHOUgWmAHFQ8mOqJdywcfs25kTnSCWoYZbUN7lroqV1Bi', NULL, 'dongrekunal2@gmail.com', NULL, NULL, NULL, NULL, NULL, '2021-05-29 15:12:25', '2021-05-29 15:12:25'),
(36, 'Prince Mishra', 'prince', '$2b$10$O7r5L1KpVCZ29/.TKun6BeEEqHq2flDhBfIAPxeIJpWtMSvFjwBr.', '', 'prince@gmail.com', 'Borgaon', 'princemishra@gmail', 'princemishra', 'kailashpat singhania high school.', NULL, '2021-05-30 14:03:19', '2021-05-30 14:03:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courseSubjectMap`
--
ALTER TABLE `courseSubjectMap`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `courseSubjectMap`
--
ALTER TABLE `courseSubjectMap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
