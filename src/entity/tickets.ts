import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Tickets extends BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 80, nullable: false, unique: true })
  uuid!: string;

  @Column("int")
  service_id!: number;

  @Column()
  user_id!: number;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}