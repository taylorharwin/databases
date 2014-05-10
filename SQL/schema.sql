CREATE DATABASE chatterbot;

USE chatterbot;

CREATE TABLE `messages` (
  `messagetext` VARCHAR(140),
  `objectID` INT(5),
  `createdAt` INT(10)
);

CREATE TABLE `rooms` (
  `roomname` VARCHAR(15),
  `objectID` INT(5)
);

CREATE TABLE `users` (
  `username` VARCHAR(20),
  `objectID` INT(5)
);

