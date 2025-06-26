import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entity/user-profile.entity';

@Injectable()
export class UserProfileRepository {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userRepository: Repository<UserProfile>,
  ) {}

  async create(userData: Partial<UserProfile>): Promise<UserProfile> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async findById(id: string): Promise<UserProfile | null> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async save(user: UserProfile): Promise<UserProfile> {
    return await this.userRepository.save(user);
  }

  async update(id: string, updateData: Partial<UserProfile>): Promise<UserProfile | null> {
    await this.userRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
