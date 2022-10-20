import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

import { LocationInterface, UserStatusEnum } from "@types";

import { DailyBible } from "@user/database/entities/daily-bible.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ name: "app_id", unique: true })
  public appId: string;

  @Column({ name: "first_name", nullable: true })
  public firstName?: string;

  @Column({ name: "last_name", nullable: true })
  public lastName?: string;

  @Column({ name: "email", unique: true, nullable: true })
  public email?: string;

  @Column({ name: "password", nullable: true })
  public password?: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    precision: null,
    name: "created_date",
  })
  public createdDate: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
    precision: null,
    name: "updated_date",
  })
  public updatedDate: Date;

  @Column({ name: "user_status", type: "enum", enum: UserStatusEnum })
  public userStatus: UserStatusEnum;

  @Column({ name: "device_token", nullable: true })
  public deviceToken?: string;

  @Column({ name: "referred_by", nullable: true })
  public referredBy?: string;

  @Column({ name: "city", nullable: true })
  public city?: string;

  @Column({ name: "province", nullable: true })
  public province?: string;

  @Column("simple-json", { name: "location", nullable: true })
  public location: LocationInterface;

  // Relationship
  @OneToMany(() => DailyBible, (daily) => daily.user)
  public dailyBibles?: DailyBible[];
}
