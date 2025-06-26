import { 
  Controller, 
  Post, 
  Body, 
  Param, 
  HttpCode, 
  HttpStatus,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { RegisterResponseDto } from 'src/dtos/register-response.dto';
import { RegisterDto } from 'src/dtos/register.dto';
import { UserProfileResponseDto } from 'src/dtos/user-profile-response.dto';
import { UserProfileDto } from 'src/dtos/user-profile.dto';
import { RegisterService } from 'src/services/register.service';


@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponseDto> {
    try {
      return await this.registerService.register(registerDto);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Registration failed');
    }
  }

  @Post('complete-profile/:userId')
  @HttpCode(HttpStatus.OK)
  async completeProfile(
    @Param('userId') userId: string,
    @Body() profileDto: UserProfileDto,
  ): Promise<UserProfileResponseDto> {
    try {
      return await this.registerService.completeProfile(userId, profileDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Profile completion failed');
    }
  }
}
