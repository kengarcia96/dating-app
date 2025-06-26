import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/dtos/register.dto';
import { RegisterResponseDto } from 'src/dtos/register-response.dto';
import { UserProfile } from 'src/repositories/entity/user-profile.entity';
import { UserCredentials } from 'src/repositories/entity/user-credentials.entity';
import * as bcrypt from 'bcrypt';
import { UserProfileDto } from 'src/dtos/user-profile.dto';
import { UserProfileResponseDto } from 'src/dtos/user-profile-response.dto';
import { UserCredentialsRepository } from 'src/repositories/user-credentials.repository';
import { UserProfileRepository } from 'src/repositories/user-profile.repository';

@Injectable()
export class RegisterService {
constructor(
    private readonly userProfileRepository: UserProfileRepository,
    private readonly userCredentialsRepository: UserCredentialsRepository,
) {}

    async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
        if (!registerDto.email && !registerDto.phoneNumber) {
            throw new BadRequestException('Email or Phone number is required');
        }

        if (registerDto.email) {
            const existingCredentialsByEmail = await this.userCredentialsRepository.findByEmail(registerDto.email);
    
            if (existingCredentialsByEmail) {
            throw new ConflictException('User with this email already exists');
            }
        }

        if (registerDto.phoneNumber) {
            const existingCredentialsByPhone = await this.userCredentialsRepository.findByPhoneNumber(registerDto.phoneNumber);
        
            if (existingCredentialsByPhone) {
                throw new ConflictException('User with this phone number already exists');
            }
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

        const user = await this.userProfileRepository.create({
            isProfileComplete: false,
        });

        await this.userCredentialsRepository.create({
            email: registerDto.email,
            phoneNumber: registerDto.phoneNumber,
            password: hashedPassword,
            userId: user.id,
        });
        
        return {
            id: user.id,
            email: registerDto.email,
            phoneNumber: registerDto.phoneNumber,
            isProfileComplete: false,
            createdAt: user.createdAt,
        };
  }

  async completeProfile(userId: string, profileDto: UserProfileDto): Promise<UserProfileResponseDto> {
    const user = await this.userProfileRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userProfileRepository.update(userId, {
        ...profileDto,
        isProfileComplete: true,
    });

    return {
        id: updatedUser!.id,
        firstName: updatedUser?.firstName,
        lastName: updatedUser?.lastName,
        age: updatedUser?.age,
        bio: updatedUser?.bio,
        profilePicture: updatedUser?.profilePicture,
        isProfileComplete: updatedUser!.isProfileComplete,
        updatedAt: updatedUser?.updatedAt,
      };

    }
}