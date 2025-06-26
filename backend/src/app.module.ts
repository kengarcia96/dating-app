import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterController } from './controllers/register.controller';
import { UserCredentialsRepository } from './repositories/user-credentials.repository';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { RegisterService } from './services/register.service';
import { UserProfile } from './repositories/entity/user-profile.entity';
import { UserCredentials } from './repositories/entity/user-credentials.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserProfile, UserCredentials]),
  ],
  controllers: [AppController, RegisterController],
  providers: [AppService, RegisterService, UserProfileRepository, UserCredentialsRepository],
})
export class AppModule {}