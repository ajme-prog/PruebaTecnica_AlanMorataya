CREATE DATABASE IF NOT EXISTS alanprueb_flowin; 
CREATE TABLE IF NOT EXISTS Usuarios
 (
 Cui varchar(15)  primary key not null,
 Nombre varchar (100) not null,
 Correo Varchar (100) not null,
 Telefono varchar(100) not null,
 Password varchar(100) not null,
 Rol Varchar(1) not null,
 Puntos int
 );

 CREATE TABLE IF NOT EXISTS Premios(
 Id int AUTO_INCREMENT primary key not null, 
 Nombre varchar(100),
 Descripcion varchar(200),
 Estado varchar(1), 
 Valor int,
 Cui_propietario varchar(15),
 FOREIGN KEY (Cui_propietario) REFERENCES Usuarios(Cui)
 );

 CREATE TABLE IF NOT EXISTS Promocion (
 IdPromocion int AUTO_INCREMENT primary key not null, 
 Nombrepromocion varchar(100)  not null,
Descripcionpromocion varchar(150) not null,
Fechainicio date,
Fechafin date
 );

 
 select * from Usuarios;
  select * from Premios;
 select * from Promocion;
/*Se inserta un admin por defecto, los admin solo se crean insertando directamente en la BD*/
insert into Usuarios(Cui,Nombre,Correo,Telefono,Password,Rol,Puntos)
values('343222222','admin','adminprueba@gmail.com','2223333','admin','0',0);