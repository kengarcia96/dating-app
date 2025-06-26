export class RegisterResponseDto {
    id: string;
    email?: string;
    phoneNumber?: string;
    isProfileComplete: boolean;
    createdAt: Date;
}