-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: blogdb
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `coverImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `authorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_65d9ccc1b02f4d904e90bd76a34` (`authorId`),
  CONSTRAINT `FK_65d9ccc1b02f4d904e90bd76a34` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'\"Meu artigo com imagem\"','\"Este ├® o conte├║do do artigo\"','9255ba5ad2355db913acf0967f6bac46','2025-05-20 15:53:49.066556','2025-05-20 15:53:49.066556',1),(2,'Teste','Teste123','dcfd5b5e295b3a7ba34d75fa53a72ea1','2025-05-22 14:00:16.218731','2025-05-22 14:00:16.218731',1),(3,'Teste','Teste123','c46405f9532dc96d451aff294036382e','2025-05-22 14:01:55.988777','2025-05-22 14:01:55.988777',1),(4,'Teste','Teste123','70af8446c1969451bf757df167c245dd','2025-05-22 14:01:58.824921','2025-05-22 14:01:58.824921',1),(5,'Teste 2','Estou testando novamente','94fa07bd4ac118579981d14548a55e08','2025-05-22 14:13:47.810380','2025-05-22 14:13:47.810380',1),(6,'teste novamente','teste novamente','cfc1d2627218918ef95f5f0726734470','2025-05-22 14:22:01.467408','2025-05-22 14:22:01.467408',1),(7,'teste3','teste3','e442a8aa8f757bde24baf75348b0859f','2025-05-22 15:10:01.690119','2025-05-22 15:10:01.690119',1),(8,'oi teste','teste sem foto',NULL,'2025-05-22 17:59:05.172328','2025-05-22 17:59:05.172328',1),(9,'teste4','teste4',NULL,'2025-05-22 18:25:59.427666','2025-05-22 18:25:59.427666',1),(11,'teste5','teste55',NULL,'2025-05-22 18:51:42.335318','2025-05-22 20:16:31.000000',2);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Gesley','gesley@email.com','$2b$10$oSWdLetqMqkadaswABG1AeY8m3wTCtQvsDhdMY7Qg3knpU0VRgOAy',NULL,NULL),(2,'Gesley','geeh.oliveira@hotmail.com','$2b$10$OWWDyZYbFx6oLq3mjVQMJuX64RyxJFjbCU2VRXrdgbI2ItY/OXLS6','Rosa','avatar-1747884413392-736172722.jpg'),(3,'Gesley','geeh@email.com','$2b$10$Bsd3F3vv8pcllV.ks5y7gOfw0RuYwxplhldWi165pfNiPaxGKNAl2',NULL,NULL),(4,'Gesley Rosa','teste@email.com','$2b$10$KmqrhMWG77PEOa9YO63LFuoE4gsVu.RSfvnoQoPGjcAh8Tmh9sBAu',NULL,NULL),(5,'Gesley','gesleyrosa@email.com','$2b$10$jMxyoRDlK9jItE0b/vwIGeAaYIXcQazUJfmKN0UJX6xo2lHN1bwmm','Rosa','avatar-1747937370261-326758377.jpg'),(6,'oi','oi@email.com','$2b$10$F9sNZoOl8wE2ILxSf8cRIeQC50u6.2j19fiK26M7haqpPVAEMvX/a',NULL,NULL),(7,'Gesley','gesleyrosa2@email.com','$2b$10$S0.DcSpLzDF5/AASz/fXYubLe7Q7BJmVau2ZvI0SgkXm.Ws9ZExWC','gesleyrosa@email.com','avatar-1747947571479-602965835.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-22 20:51:34
