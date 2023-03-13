import { EntityRepository, Repository } from "typeorm";

import * as admin from "firebase-admin";
import * as shortid from "short-uuid";
import { v4 as uuidv4 } from "uuid";

import { User } from "@user/database/entities";
import { UserStatusEnum } from "@type";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(fullName: string, email: string, phoneNumber: string, password: string): Promise<User> {
    const listOfName = fullName.split(" ");
    const userRecord = await admin.auth().createUser({
      email: email,
      emailVerified: false,
      phoneNumber: phoneNumber,
      password: password,
    });
    const createdUser = this.create({
      id: userRecord.uid,
      appId: shortid.generate(),
      firstName: listOfName.pop(),
      lastName: listOfName.join(" "),
      userStatus: UserStatusEnum.INACTIVE,
    });
    await this.save(createdUser);
    return createdUser;
  }

  async findUserById(userId: string) {
    const user = await this.findOne({ where: { id: userId } });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.findOne({ where: { email } });
    return user;
  }

  async createUserGuest() {
    const newUser = this.create({
      id: uuidv4(),
      appId: shortid.generate(),
      userStatus: UserStatusEnum.ACTIVE,
    });

    await this.insert(newUser);
    return { id: newUser.id, appId: newUser.appId };
  }
}
