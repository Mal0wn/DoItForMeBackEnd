
#------------------------------------------------------------
#    	Script MySQL.
#------------------------------------------------------------

#------------------------------------------------------------
# Table: user
#------------------------------------------------------------
CREATE TABLE user(
    	id INT  AUTO_INCREMENT  NOT NULL ,
    	firstname VARCHAR (50) NOT NULL ,
    	lastname VARCHAR (50) NOT NULL ,
    	email VARCHAR (250) NOT NULL ,
    	password VARCHAR (250) NOT NULL ,
    	picture VARCHAR (250) ,
    	birthday DATETIME NOT NULL ,
    	role VARCHAR (20) NOT NULL ,
    	phone INT NOT NULL
    ,CONSTRAINT user_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: mission
#------------------------------------------------------------
CREATE TABLE mission(
    	id INT AUTO_INCREMENT NOT NULL ,
    	picture VARCHAR (250) ,
    	status VARCHAR (50) NOT NULL ,
    	price FLOAT NOT NULL ,
    	title VARCHAR (50) NOT NULL ,
    	description VARCHAR (250) NOT NULL ,
    	creation_date DATETIME NOT NULL ,
    	id_create INT NOT NULL ,
    	id_make INT
    ,CONSTRAINT mission_PK PRIMARY KEY (id)
    ,CONSTRAINT mission_create_FK FOREIGN KEY (id_create) REFERENCES user(id)
    ,CONSTRAINT mission_make_FK FOREIGN KEY (id_make) REFERENCES user(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: address
#------------------------------------------------------------
CREATE TABLE address(
    	id INT NOT NULL ,
    	number VARCHAR (20) NOT NULL ,
    	street VARCHAR (250) NOT NULL ,
    	zip_code VARCHAR (10) NOT NULL ,
    	city VARCHAR (60) NOT NULL ,
    	country	VARCHAR (60) NOT NULL ,
    	complement VARCHAR (250) ,
    	id_user	INT ,
    	id_mission INT
    ,CONSTRAINT address_PK PRIMARY KEY (id)
    ,CONSTRAINT address_user_FK FOREIGN KEY (id_user) REFERENCES user(id)
    ,CONSTRAINT address_mission_FK FOREIGN KEY (id_mission) REFERENCES mission(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: ban
#------------------------------------------------------------
CREATE TABLE ban(
    	id INT AUTO_INCREMENT NOT NULL ,
    	reason VARCHAR (250) NOT NULL ,
    	start_date DATETIME NOT NULL ,
    	end_date DATETIME NOT NULL ,
    	id_suffer INT NOT NULL ,
    	id_apply INT NOT NULL
    ,CONSTRAINT ban_PK PRIMARY KEY (id)
    ,CONSTRAINT ban_suffer_FK FOREIGN KEY (id_suffer) REFERENCES user(id)
    ,CONSTRAINT ban_apply_FK FOREIGN KEY (id_apply) REFERENCES user(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: message
#------------------------------------------------------------
CREATE TABLE message(
    	id INT AUTO_INCREMENT NOT NULL ,
    	time DATETIME NOT NULL ,
    	message VARCHAR (50) NOT NULL ,
    	id_send INT NOT NULL ,
    	id_receive INT NOT NULL ,
    	id_mission INT NOT NULL
    ,CONSTRAINT message_PK PRIMARY KEY (id)
    ,CONSTRAINT message_send_FK FOREIGN KEY (id_send) REFERENCES user(id)
    ,CONSTRAINT message_receive_FK FOREIGN KEY (id_receive) REFERENCES user(id)
    ,CONSTRAINT message_mission_FK FOREIGN KEY (id_mission) REFERENCES mission(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: favorite
#------------------------------------------------------------
CREATE TABLE favorite(
    	id INT AUTO_INCREMENT NOT NULL ,
    	id_add INT NOT NULL ,
    	id_target INT NOT NULL
    ,CONSTRAINT favorite_PK PRIMARY KEY (id)
    ,CONSTRAINT favorite_add_FK FOREIGN KEY (id_add) REFERENCES user(id)
    ,CONSTRAINT favorite_target_FK FOREIGN KEY (id_target) REFERENCES user(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: rating
#------------------------------------------------------------
CREATE TABLE rating(
    	id INT AUTO_INCREMENT NOT NULL ,
    	rating TINYINT NOT NULL ,
    	description VARCHAR (250) NOT NULL ,
    	id_give INT NOT NULL ,
    	id_take INT NOT NULL
    ,CONSTRAINT rating_PK PRIMARY KEY (id)
    ,CONSTRAINT rating_give_FK FOREIGN KEY (id_give) REFERENCES user(id)
    ,CONSTRAINT rating_take_FK FOREIGN KEY (id_take) REFERENCES user(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: report
#------------------------------------------------------------
CREATE TABLE report(
    	id INT AUTO_INCREMENT NOT NULL ,
    	date DATETIME NOT NULL ,
    	reason VARCHAR (250) NOT NULL ,
    	id_endure INT NOT NULL ,
    	id_apply INT NOT NULL ,
    	id_mission INT
    ,CONSTRAINT report_PK PRIMARY KEY (id)
    ,CONSTRAINT report_endure_FK FOREIGN KEY (id_endure) REFERENCES user(id)
    ,CONSTRAINT report_apply_FK FOREIGN KEY (id_apply) REFERENCES user(id)
    ,CONSTRAINT report_mission_FK FOREIGN KEY (id_mission) REFERENCES mission(id)
)ENGINE=InnoDB;


-- Création de la table
CREATE TABLE forbiddenWord (
  id INT AUTO_INCREMENT PRIMARY KEY,
  word VARCHAR(50) NOT NULL
);

-- Insertion de plusieurs insultes
INSERT INTO forbiddenWord (word)
VALUES 
  ('merde'),('connard'),('salope'),('putain'),('enculé'),('chiasse'),('cul'),('bite'),('nique'),('trouduc'),('pétasse'),('enfoiré'),('bordel'),('crétin'),
  ('pouffiasse'),('taré'),('salaud'),('gueule'),('crotte'),('imbécile'),('pénis'),('fion'),('clito'),('couillon'),('fdp'),('merdique');

#------------------------------------------------------------
# PROCEDURES Stockées 
#------------------------------------------------------------

--------------------------------------------------------------------------------------
-- Delete une mission après 1 an 
CREATE PROCEDURE deleteMissionAfterOneYear ()
AS
BEGIN
    DECLARE @date_actuelle DATETIME
    SET @date_actuelle = GETDATE()

    DELETE FROM mission WHERE DATEDIFF(YEAR, creation_date, @date_actuelle) >= 1
END

--------------------------------------------------------------------------------------
-- Appliquer un rabais sur les missions d'un user donné
CREATE PROCEDURE applyDiscountPrice (
    IN p_user_id INT,
    IN p_rabais INT
)
AS
BEGIN
    UPDATE mission 
    SET price = price * (1 - p_rabais/100) 
    WHERE id_create = p_user_id ;
END
--------------------------------------------------------------------------------------
-- Delete les messages en rapport avec une mission qui a été supprimée
CREATE PROCEDURE deleteMessageWithoutMission (
    IN p_user1_id INT,
    IN p_user2_id INT
)
AS
BEGIN
    DECLARE mission_exists INT;
    DECLARE message_count INT;

    -- Vérifier si une mission existe entre deux users
    SELECT COUNT(*) INTO mission_exists
    FROM mission
    WHERE (id_create = p_user1_id AND id_make = p_user2_id)
        OR (id_create = p_user2_id AND id_make = p_user1_id);
    
    -- Supprimer les messages si aucune mission n'existe
    IF mission_exists = 0 THEN
        DELETE FROM message 
        WHERE (id_send = p_user1_id AND id_receive = p_user2_id)
            OR (id_send = p_user2_id AND id_receive = p_user1_id);
    END IF;
    
    -- Compter le nombre de messages supprimés
    SELECT ROW_COUNT() INTO message_count;
    
    -- Afficher le résultat
    SELECT CONCAT(message_count, ' messages ont été supprimés.') AS result;
END

--------------------------------------------------------------------------------------
-- Filtre les messages envoyés si il contient un mot interdit 
DELIMITER $$
CREATE PROCEDURE check_message(IN message_content VARCHAR(250), IN sender_id INT, IN receiver_id INT, IN mission_id INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE word VARCHAR(50);
    DECLARE words_cursor CURSOR FOR SELECT word FROM forbiddenWord;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN words_cursor;
    
    read_loop: LOOP
        FETCH words_cursor INTO word;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        IF LOCATE(word, message_content) > 0 THEN
            INSERT INTO report (date, reason, id_endure, id_apply, id_mission)
            VALUES (NOW(), 'Mot interdit envoyé', sender_id, receiver_id, mission_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Le message contient un mot interdit.';
        END IF;
    END LOOP;
    
    CLOSE words_cursor;
    
END $$
DELIMITER ;


--------------------------------------------------------------------------------------
-- Applique un ban automatique si un user a au moins 5 report
CREATE PROCEDURE apply_ban()
BEGIN
    DECLARE user_id INT;
    DECLARE report_count INT;

    -- Check for users with 5 or more reports
    DECLARE users_to_ban CURSOR FOR
    SELECT id, COUNT(*) as report_count
    FROM report
    WHERE id_mission IS NULL
    GROUP BY id
    HAVING COUNT(*) >= 5;

    OPEN users_to_ban;
    FETCH users_to_ban INTO user_id, report_count;
    WHILE (NOT (user_id IS NULL)) DO
        -- Add user to ban table
        INSERT INTO ban (reason, start_date, end_date, id_suffer, id_apply)
        VALUES ('Multiple reports received', NOW(), NOW() + INTERVAL 1 MONTH, user_id, 1);

        FETCH users_to_ban INTO user_id, report_count;
    END WHILE;

    CLOSE users_to_ban;

    -- Add robot admin user
    INSERT INTO user (firstname, lastname, email, password, role, phone)
    VALUES ('Admin', 'Robot', 'admin@robot.com', SHA2('admin123'), 'admin', 123456789);

    -- Grant admin privileges to robot user
    UPDATE user
    SET role = 'admin'
    WHERE id = 1;

END;







