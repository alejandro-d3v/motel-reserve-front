import { TimestampDto } from './timestamp.dto';

export interface RoleDto extends TimestampDto {
  id: number;
  name: string;
  description: string;
}