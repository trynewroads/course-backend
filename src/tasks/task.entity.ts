import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  completed: boolean;
}
