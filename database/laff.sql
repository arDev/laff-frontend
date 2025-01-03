CREATE TABLE `Persona`(
    `Id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Apellido` BIGINT NOT NULL,
    `Nombre` VARCHAR(70) NOT NULL,
    `NroDoc` BIGINT NOT NULL,
    `FechaNacimiento` DATE NOT NULL,
    `Direccion` VARCHAR(70) NOT NULL,
    `Localidad` VARCHAR(70) NOT NULL,
    `Telefono` VARCHAR(70) NOT NULL,
    `Carnet` BIGINT NOT NULL,
    `Email` VARCHAR(70) NOT NULL,
    `Observaciones` TEXT NOT NULL
);