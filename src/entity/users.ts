import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Users extends BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 80, nullable: false, unique: true })
  uuid!: string;

  @Column({ type: "varchar", length: 120, nullable: false, unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column("boolean", { default: false })
  active!: boolean;

  @Column()
  accountCode!: string;

  @Column()
  address!: string;

  @Column({ type: "varchar", length: 10, nullable: false, default: "user" })
  type!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: string;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: string;
}
