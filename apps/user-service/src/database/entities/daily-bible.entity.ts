import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { User } from "./user.entity";

@Entity()
export class DailyBible {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Column({ name: "user_id" })
  public userId: string;

  @Column({ name: "book_abbreviation" })
  public bookAbbreviation: string;

  @Column({ name: "chapter_sequence" })
  public chapterSequence: number;

  @Column({ name: "sentence_sequence" })
  public sequence: number;

  @Column({ name: "sentence" })
  public sentence: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    precision: null,
    name: "receive_date",
  })
  public receiveDate: Date;

  // Relationship
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  readonly user: User;
}
