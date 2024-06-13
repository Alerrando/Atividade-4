# Passos para utilização 

## puxar o container do DockerHub

docker pull alerrando/atv4:latest

## criar o network e o banco

docker network create banco

docker run -d -p 3306:3306 --name mysql --net banco -e MYSQL_ROOT_PASSWORD=user -e MYSQL_USER=user -e MYSQL_PASSWORD=14725836 -e MYSQL_DATABASE=trabalho_4 mysql/mysql-server:latest

## Para criar o banco de dados, rode os scripts a baixo:

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

## Para inserir dados na tabela

INSERT INTO `users` (`id`, `name`, `email`) 
VALUES (1, 'John Doe', 'john@gmail.com'), (2, 'Jane Doe', 'jane@gmail.com');

# Para executar a aplicação, rode o comando abaixo:

docker run -p 3000:3000 --name atv4 --net banco -d alerrando/atv4:latest

#Acesse http://localhost:3000/consulta-dados

Repositório da aplicação: <br/>
https://github.com/Alerrando/Atividade-4

DockerHub da Aplicação: <br/>
https://hub.docker.com/repository/docker/alerrando/atv4/general

