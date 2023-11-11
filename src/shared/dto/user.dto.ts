import { TimestampDto } from './timestamp.dto';

export interface UserDto extends TimestampDto {
  id: number;
  roleId: number;
  names: string;
  lastnames: string;
  avatar: string;
  username: string;
  isActive: number;
}