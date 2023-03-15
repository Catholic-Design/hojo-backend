import { Injectable, InternalServerErrorException } from "@nestjs/common";

import * as admin from "firebase-admin";
import * as jwt from "jwt-simple";
import { CountryCode, parsePhoneNumber } from "libphonenumber-js";

@Injectable()
export class UsersHelperService {
  encodeToken(data: any) {
    const payload = { ...data };

    let token: string;
    try {
      token = jwt.encode(payload, process.env.SECRET);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return token;
  }

  decodeToken(token: string) {
    const decodedToken = jwt.decode(token, process.env.SECRET);
    return decodedToken;
  }

  convertToE164(phoneNumber: string, countryCode: CountryCode): string {
    const phoneNumberUtil = parsePhoneNumber(phoneNumber, countryCode);
    return phoneNumberUtil.format('E.164');
  }

  async checkPhoneNumberExists(phoneNumber: string) {
    try {
      await admin.auth().getUserByPhoneNumber(phoneNumber);
      return true;
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return false;
      } else {
        throw error;
      }
    }
  }

  async checkEmailExists(email: string) {
    try {
      await admin.auth().getUserByEmail(email);
      return true;
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return false;
      } else {
        throw error;
      }
    }
  }
}
