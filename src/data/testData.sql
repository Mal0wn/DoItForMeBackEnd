SET SQL_SAFE_UPDATES=0;
SET foreign_key_checks = 0;
DELETE FROM user;
DELETE FROM mission;
DELETE FROM message;
DELETE FROM address;
SET SQL_SAFE_UPDATES=1;
SET foreign_key_checks = 1;

INSERT INTO user 
( firstname, lastname, email, password, role, birthday, phone)
VALUES
('alphonse', 'brown', 'alphonse@brown.fr', '$2a$10$uNgn1t2Hpj9gmg36hJyN8uDaIekKyVdto9apFL0tWduRzUd91HL/e', 'ambianceur', '2000-09-24', '0123456789'),
('Eva', 'Jolie', 'eva@jolie.fr', '$2a$10$uNgn1t2Hpj9gmg36hJyN8uDaIekKyVdto9apFL0tWduRzUd91HL/e', 'jsaispas', '1918-09-24', '0123456789'),
('domi', 'neur', 'domi@neur.fr', '$2a$10$uNgn1t2Hpj9gmg36hJyN8uDaIekKyVdto9apFL0tWduRzUd91HL/e', 'TMTC', '1234-09-24', '0123456789');
SET @id1 = LAST_INSERT_ID();
SET @id2 = @id1 + 1;
SET @id3 = @id2 + 1;

SET foreign_key_checks = 0;
INSERT INTO doit4me.mission ( status, title, description, id_create, price)
VALUES ('ongoing', 'mission1', 'test mission 1', @id1, '10'),
('ongoing', 'mission2', 'test mission 2', @id2, '10'),
('ongoing', 'mission3', 'test mission 3', @id1, '10');
SET foreign_key_checks = 1;
SET @mi1 = LAST_INSERT_ID();
SET SQL_SAFE_UPDATES=0;
UPDATE doit4me.mission  SET id_make = @id3 WHERE mission.id = @mi1 +1;
SET SQL_SAFE_UPDATES=1;
SET foreign_key_checks = 0;

INSERT INTO doit4me.message 
( time, id_mission, message, id_send, id_receive)
VALUES 
('2023-02-18 00:59:59', @mi1, 'bonjour', @id3, @id1),
('2023-02-18 01:04:36', @mi1, "j'aimerai effectuer votre mission", @id3, @id1),
('2023-02-18 01:25:01', @mi1, 'bonjour; oui sans problemes !', @id1, @id3),
('2023-02-18 00:58:58', @mi1, 'Bonjour', @id3, @id2);
SET foreign_key_checks = 1;

INSERT INTO doit4me.address 
( number, street, zip_code, city, country, complement, latitude, longitude)
VALUES 
(123, 'rue du test', 12345, 'testCity', 'France', 'appartement A', 100.000001, 100.000001),
(456, 'rue du test', 12345, 'testCity', 'France', 'dans le placard sous l escalier', 100.000201, 100.000201),
(789, 'rue du test', 12345, 'testCity', 'France', NULL, 100.000401, 100.000401);
SET SQL_SAFE_UPDATES=0;
UPDATE doit4me.address  SET id_user = @id1 WHERE address.number = 123;
UPDATE doit4me.address  SET id_user = @id2 WHERE address.number = 456;
UPDATE doit4me.address  SET id_user = @id3 WHERE address.number = 789;
SET SQL_SAFE_UPDATES=1;