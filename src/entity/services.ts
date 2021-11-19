import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Services extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column("int")
  duration!: number;

  @Column({ type: "int", default: 1 })
  category!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  price!: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @Column()
  createdBy!: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: string;

  @Column()
  updatedBy!: string;
}
