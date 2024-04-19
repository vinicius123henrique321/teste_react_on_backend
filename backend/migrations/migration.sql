CREATE DATABASE OnCarDB;

USE OnCarDB;

CREATE TABLE Simulacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_nome VARCHAR(50),
    cliente_email varchar(30),
    cliente_cpf varchar(11),
    creditScore int,
    approvalStatus varchar(20),
    creditLimit varchar(4),
    selected_car varchar(20)
);

CREATE TABLE Veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(20),
    ano VARCHAR(4),
    modelo VARCHAR(10),
    cor varchar(10)
);