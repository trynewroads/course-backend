import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column({ default: false })
  @ApiProperty({ default: false })
  status: boolean;
}

export class CreateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}

export class UpdateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}

export class UpdateTaskStatusDto {
  @ApiProperty()
  status: boolean;
}
