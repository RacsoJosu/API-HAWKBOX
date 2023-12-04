use hawk_box_db;



/*
SIRVE PARA SABER DONDE VIVE EL CLIENTE EN CASO QUE QUIERA QUE SE LE MANDE A LA CASA
*/
Create table UbicacionCliente (
idUbicacionCliente integer Primary Key auto_increment not null,
Departamento varchar (50),
Ciudad varchar (50),
Telefono varchar (25),
Direccion varchar (100),
idUsuario int not null,
foreign key (idUsuario) references Usuarios(idUsuario)
);


# POR MEDIO DE ESTA TABLA TRANSITO, SE PODRA SABER EL ESTADO DEL PAQUETE SI FUE RECIBIDO, ENVIADO O ENTREGADO
#ASI COMO POSIBLES ERRORES O PROBLEMAS CON SU ENTREGA, TAMBIEN SABER DE QUIEN ES EL PAQUETE Y PARA DONDE VA

CREATE table Transito (
idTransito Integer Primary Key not null auto_increment,
fechaEnvio  datetime DEFAULT NULL,
fechaRecibido datetime DEFAULT NULL,
fechaEntregado datetime DEFAULT NULL,
Observaciones varchar (100) null,
idPaquete integer not null,
idUbicacion integer not null,
idUsuario integer not null,
Destinofinal integer null,
foreign key (idPaquete) references Paquetes(idPaquete),
foreign key (Ubicaciones) references Ubicaciones(idUbicacion),
foreign key (idUsuario) references Usuarios(idUsuario),
foreign key (Destinofinal) references UbicacionCliente(idUbicacionCliente)
);

#CASILLERO
-- ESTA TABLA LO QUE HACE ES PARA QUE CADA CLIENTE AL MOMENTO DE PEDIR TENGA UN idCasillero Unico
-- AUNQUE EL CASILLERO SEA SIEMPRE LA MISMA DIRECCION SERA 1 PARA CADA CLIENTE 
-- EJEMPLO
/*
	IdCasillero: EM0405
    PAIS: USA
    ESTADO: FLORIDA
    CIUDAD: MIAMI
    TELEFONO: 12345670
    IdUsario: 1
    
    * Quiere decir que ese casillero pertenece al usario 1, ejemplo Jesus
	y se repite lo mismo 
    
    IdCasillero: EM0500
    PAIS: USA
    ESTADO: FLORIDA
    CIUDAD: MIAMI
    TELEFONO: 12345670
    IdUsario: 2
    
    
    El casillero se usa para fines de que ese espacio en el extranjero pertenece a un cliente en especifico
*/ 

CREATE TABLE Casillero (
idCasillero Varchar (10) Primary Key not null unique,
Pais Varchar (50) not null,
Estado varchar (50) not null,
Ciudad varchar (50) not null,
Telefono varchar (50) not null,
codigoPostal varchar(50) not null,
idUsuario int not null,
foreign key (idUsuario) references Usuarios(idUsuario)
);



CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `tipo` enum('admin','user') DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `correo` (`correo`)
);
#UBICACIONES EN CASO QUE 1 EMPRESA TENGA VARIOS PUNTOS DE DISTRIBUCION
CREATE TABLE `ubicaciones` (
  `idUbicacion` int NOT NULL AUTO_INCREMENT,
  `latitud` float DEFAULT NULL,
  `longitud` float DEFAULT NULL,
  `fechaHora` datetime DEFAULT NULL,
  `idPaquete` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idUbicacion`),
  KEY `idPaquete` (`idPaquete`),
  CONSTRAINT `ubicaciones_ibfk_1` FOREIGN KEY (`idPaquete`) REFERENCES `paquetes` (`idPaquete`) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE TABLE `paquetes` (
  `idPaquete` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `peso` float DEFAULT NULL,
  `volumen`  float DEFAULT NULL,
  `estado` enum('en camino','en espera','entregado','confirmado', 'recibido') DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `idUsuario` int DEFAULT NULL,
  `paquetePadreId` int DEFAULT NULL,
  PRIMARY KEY (`idPaquete`),
  KEY `idUsuario` (`idUsuario`),
  KEY `paquetePadreId` (`paquetePadreId`),
  CONSTRAINT `paquetes_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paquetes_ibfk_2` FOREIGN KEY (`paquetePadreId`) REFERENCES `paquetes` (`idPaquete`) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE TABLE `cobros_envio` (
  `idCobro` int NOT NULL AUTO_INCREMENT,
  `idPaquete` int NOT NULL,
  `peso` float DEFAULT NULL,
  `volumen` float DEFAULT NULL,
  `monto` float DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idCobro`),
  KEY `idPaquete` (`idPaquete`),
  CONSTRAINT `cobros_envio_ibfk_1` FOREIGN KEY (`idPaquete`) REFERENCES `paquetes` (`idPaquete`) ON DELETE CASCADE ON UPDATE CASCADE
);



DELIMITER //

CREATE TRIGGER calcular_cobro_despues_insertar
AFTER INSERT ON paquetes
FOR EACH ROW
BEGIN
    DECLARE peso_volumetrico FLOAT;
    DECLARE monto FLOAT;

    #Calcula el peso volumetrico 
    SET peso_volumetrico = GREATEST(NEW.peso, NEW.volumen);

    # Verificar si el peso volumétrico supera las 5 libras // tarifa
    IF peso_volumetrico > 5 THEN
        # Calcula el monto del cobro con tarifa por libra
        SET monto = peso_volumetrico * 150;
    ELSE
        # Utilizar un precio fijo de 224 LPS // es para cosas pequenias, paquetes pequenios
        SET monto = 225;
    END IF;

    # Insertar el cobro en la tabla cobros_envio
    INSERT INTO cobros_envio (idPaquete, peso, volumen, monto, createdAt, updatedAt)
    VALUES (NEW.idPaquete, NEW.peso, NEW.volumen, monto, NOW(), NOW());
END;
//

DELIMITER ;

