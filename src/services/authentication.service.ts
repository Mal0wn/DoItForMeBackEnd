/* Importing the UserRepository from the user.repository.ts file. */
import { UserRepository } from "./../repository/user.repository";
import { encodeSession } from "../middleware/token.middleware";
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
};

module.exports = authenticationService;
