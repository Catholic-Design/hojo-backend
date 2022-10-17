import { Body, Controller, Post, Logger } from "@nestjs/common";

import { UserAuthenService } from "@user/user/user.authen.service";
import { UserBibleService } from "@user/user/user.bible.service";

@Controller("user")
export class UserController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly userAuthenService: UserAuthenService,
    private readonly userBibleService: UserBibleService
  ) {}

  @Post("login")
  async login(@Body() payload) {
    const { email, password } = payload;
    return this.userAuthenService.authenticateUserPassword(email, password);
  }

  @Post("guest")
  async guest() {
    return this.userAuthenService.loginGuest();
  }

  @Post("daily-bible")
  async dailyBible(@Body() payload) {
    this.logger.log(`daily-bible: ${JSON.stringify(payload)}`);

    const { userId } = payload;
    return this.userBibleService.dailyBible(userId);
  }
}
