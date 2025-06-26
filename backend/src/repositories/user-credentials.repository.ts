import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCredentials } from './entity/user-credentials.entity';


@Injectable()
export class UserCredentialsRepository {
  constructor(
    @InjectRepository(UserCredentials)
    private readonly userCredentialsRepository: Repository<UserCredentials>,
  ) {}

  async create(credentialsData: Partial<UserCredentials>): Promise<UserCredentials> {
    const credentials = this.userCredentialsRepository.create(credentialsData);
    return await this.userCredentialsRepository.save(credentials);
  }

  async findByEmail(email: string): Promise<UserCredentials | null> {
    return await this.userCredentialsRepository.findOne({
      where: { email },
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<UserCredentials | null> {
    return await this.userCredentialsRepository.findOne({
      where: { phoneNumber },
    });
  }

  async findByUserId(userId: string): Promise<UserCredentials | null> {
    return await this.userCredentialsRepository.findOne({
      where: { userId },
    });
  }

  async save(credentials: UserCredentials): Promise<UserCredentials> {
    return await this.userCredentialsRepository.save(credentials);
  }

  async update(userId: string, updateData: Partial<UserCredentials>): Promise<UserCredentials | null> {
    await this.userCredentialsRepository.update({ userId }, updateData);
    return await this.findByUserId(userId);
  }

  async delete(userId: string): Promise<void> {
    await this.userCredentialsRepository.delete({ userId });
  }
}
