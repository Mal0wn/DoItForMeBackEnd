
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




