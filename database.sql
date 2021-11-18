create database agencia;
use agencia;
create table marca(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(60) NOT NULL
);

create table autos(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(60) NOT NULL,
	matricula CHAR(7) NOT NULL,
	anio_verificacion CHAR(4) NOT NULL,
	fecha_registro DATETIME NOT NULL, 
	fecha_actualizacion DATETIME NOT NULL,
	estado TINYINT NOT NULL CHECK (estado in (1,0)),
	marca INT NOT NULL,
	FOREIGN KEY (marca) REFERENCES marca(id)
);