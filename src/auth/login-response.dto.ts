import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ required: false })
  access_token?: string;

  @ApiProperty()
  success: boolean;
}
