import { TimestampDto } from "../../../shared/dto/timestamp.dto"

export interface ModuleDto extends TimestampDto {
  name: string
  id: number
  active: number
}