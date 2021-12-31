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


/*LAS SIGUIENTES CONSULTAS NO TIENEN PARAMETROS YA QUE FUERON IMPLEMENTADAS DESDE EL
BACKEND POR LO QUE AQUI SOLO SE MUESTRA LA ESTRUCTURA DE LA CONSULTA SIN SUS PARAMETROS"*/

/*Login correo--*/
 SELECT * from Usuarios where Correo=? and Password=?;
 
 /*Login telefono*/
 SELECT * from Usuarios where Telefono=? and Password=?;
 
 /*Nuevo usuario*/
 INSERT INTO Usuarios (Cui,Nombre,Correo,Telefono,Password,Rol,Puntos)
VALUES  (?, ?, ?, ?, ?,?,?);

/*Actualizar puntos del usuario*/
UPDATE  Usuarios SET Puntos = ? where CUI = ?;


/*Obtener todos los usuario*/
 SELECT * from Usuarios;
 
 /*Registrar premio*/
 INSERT INTO Premios (Nombre,Descripcion,Estado,Valor) VALUES (?, ?, ? ,?);
 
 /*Actualizar propietario de un premio*/
 UPDATE  Premios SET Cui_propietario = ? where Id = ?;
 
 /*Obtener todos los premios*/
 SELECT * from Premios;
 
 /*Obtener un usuario en particular*/
 SELECT * from Usuarios where Cui = ?;
 
 /*Cambiar el estado de premio cuando lo canjea un usuario*/
 UPDATE  Premios SET Estado = '0' where Id = ?;
 
 
 /*Obtener premios disponibles que tiene un usuario para canjear */
 
 SELECT * from Premios where Cui_propietario = ? and Estado ='1';
 
 /*Obtener premios que un usuarios ya canjeo*/
 SELECT * from Premios where Cui_propietario = ? and Estado ='0';
 
 /*registrar una promoción*/
 INSERT INTO Promocion (Nombrepromocion,Descripcionpromocion,Fechainicio,Fechafin) 
 VALUES (?, ?, ?,?);
 
 /*Obtener todas las promociones*/
 SELECT * from Promocion;