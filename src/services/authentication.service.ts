/* Importing the UserRepository from the user.repository.ts file. */
import { UserRepository } from "./../repository/user.repository";
import { encodeSession } from "../middleware/token.middleware";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

const authenticationService = {
  findUser: async (email: string, password: string): Promise<any> => {
    if (email === "") {
      throw "There is an empty string";
    } else if (password === "") {
      throw "There is an empty string";
    }

    const connexion = await UserRepository.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (!user) {
          throw "User not found";
        }

        let passwordRecup: string = user.password;
        let comparePassword = bcrypt.compareSync(password, passwordRecup)
        
        if (!comparePassword) {
            throw "Error Login/Password";
        }

        const dateCreatedLocal = Date.now();
        const session = encodeSession(`${process.env.SECRET_KEY_JWT}`, {
          id: user.id,
          role: user.role,
          username: user.firstname,
          dateCreated: dateCreatedLocal,
        });
        return session;
      })
      
    return connexion;
  },
  inscription: async (user: User) => {
    if (user.firstname === "" || user.lastname === "" || user.email === "" || user.password === "") {
      throw "the field cannot be null 1";
    }
    if (user.birthday === undefined) {
      throw "the field cannot be null 2";
    }
    if (user.phone === undefined) {
      throw "the field cannot be null 3";
    }

    user.password = bcrypt.hashSync(user.password, 10);
    
    return await UserRepository.save(user);
  }
};

module.exports = authenticationService;
