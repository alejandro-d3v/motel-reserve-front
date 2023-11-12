import { TimestampDto } from './timestamp.dto';

export interface UserDto extends TimestampDto {
  id: number;
  roleId: number;
  isActive: number;
  names: string;
  lastNames: string;
  avatar: any;
  user: string;
  password: string;
}