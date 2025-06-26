export class UserProfileResponseDto {
    id: string;
    firstName?: string;
    lastName?: string;
    age?: number;
    bio?: string;
    profilePicture?: string;
    isProfileComplete?: boolean;
    updatedAt?: Date;
}