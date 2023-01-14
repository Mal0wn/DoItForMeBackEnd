INSERT INTO doit4me.user 
( firstname, lastname, email, password, role, birthday, phone)
VALUES
('alphonse', 'brown', 'alphonse@brown.fr', 'password', 'ambianceur', '2000-09-24', '0123456789'),
('Eva', 'Jolie', 'eva@jolie.fr', 'password', 'jsaispas', '1918-09-24', '0123456789'),
('domi', 'nique', 'domi@nique.fr', 'password', 'TMTC', '1234-09-24', '0123456789');

INSERT INTO doit4me.mission ( status, title, description, creation_date, id_create, price)
VALUES ('dsfg', 'test1', 'test', '2018-09-24', '1', '10');

INSERT INTO doit4me.message 
( time, id_mission, message, id_sender, id_receiver)
VALUES 
('2018-09-24 00:59:59', 1, 'bonjour', 3, 1),
('2018-09-25 00:59:59', 1, 'salut', 2, 1);