import Missions from '../types/mission';
import db from '../index'; 
import { OkPacket, RowDataPacket } from "mysql2";

export const createMission = (mission: Missions, callback: Function) => {
  const queryString = "INSERT INTO Missions ( picture, status, price, title , description, creation_date, id_create ) VALUES ( ? , ? , ? , ? , ? , ? , ?)"
	const maDate: Date = new Date();
  db.query(
    queryString,
    [mission.picture, mission.status, mission.price, mission.title, mission.description, mission.creation_date, mission.id_create],
    (err, result) => {
      if (err) {callback(err)};

      const insertId = (<OkPacket> result).insertId;
      callback(null, insertId);
    }
  );
};

export const findAllMissions = (callback: Function) => {
  const queryString = `
    SELECT * from mission`
const maDate: Date = new Date();
  db.query(queryString, (err, result) => {
    if (err) {callback(err)}

    const rows = <RowDataPacket[]> result;
    const missions: Missions[] = [];

    rows.forEach(row => {
      const mission: Missions =  {
		  id: row.id,
		  status: '',
		  price: 0,
		  title: '',
		  description: '',
		  creation_date: maDate ,
		  id_create: 0
	  }
      missions.push(mission);
    });
    callback(null, missions);
  });
}

