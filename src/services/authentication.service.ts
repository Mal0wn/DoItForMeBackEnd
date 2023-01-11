import { UserRepository } from "./../repository/user.repository";
import { Session } from "../models/authentication.model";
import { encodeSession } from "../middleware/token.middleware";
import bcrypt from "bcrypt";

const authenticationService = {
  findUser: async (email: string, password: string) => {
    if (email === "") {
      //Empty String
      throw "There is an empty string";
    } else if (password === "") {
      //Empty String
      throw "There is an empty string";
    }

    const connexion = await UserRepository.findOne({
      where: {
        email: email,
      },
    }).then((user) => {
      if (!user) {
        //User not found
      throw "User not found";
      } else {
        let passwordRecup: string = user.password;
        bcrypt.compare(password, passwordRecup).then((valid: any) => {
          if (!valid) {
            throw "Error Login/Password";
          }          
          const dateCreatedLocal = Date.now();
          const session = encodeSession(`${process.env.SECRET_KEY_JWT}`, {
            id: user.id,
            username: user.firstname,
            dateCreated: dateCreatedLocal,
          });
          console.log(session)
          return session;
        });
      }
    });

    return connexion;
  },
};

module.exports = authenticationService;
