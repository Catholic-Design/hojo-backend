import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";

import { Stage } from "@game/database/entities/stage.entity";
import { EndGame } from "@game/database/entities/end-game.entity";

@Entity("current_game")
export class CurrentGame {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ name: "user_id" })
  public userId: string;

  @Column({ name: "stage_id" })
  public stageId: string;

  @Column({ name: "end_game_id", nullable: true })
  public endGameId: string;

  @Column("simple-json", { name: "help_used", nullable: true })
  public helpUsed?: string[];

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    precision: null,
    name: "start_date",
  })
  public startDate: Date;

  @Column({ name: "is_completed", nullable: true })
  public isCompleted: boolean;

  @Column({ type: "timestamp", name: "completed_date", nullable: true })
  public completedDate?: Date;

  @Column({ name: "is_passed", nullable: true })
  public isPassed: boolean;

  @Column({ type: "timestamp", name: "passed_date", nullable: true })
  public passedDate?: Date;

  // Relationship
  @ManyToOne(() => Stage)
  @JoinColumn({ name: "stage_id", referencedColumnName: "id" })
  readonly stage: Stage;

  // Relationship
  @OneToOne(() => EndGame, (end) => end.currentGame)
  @JoinColumn({ name: "end_game_id", referencedColumnName: "id" })
  readonly endGame: EndGame;
}
