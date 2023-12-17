import { TimestampDto } from "../../../shared/dto/timestamp.dto"

export interface ItemDto extends TimestampDto {
  id: number
  moduleId: number
  itemId?: number
  name: string
  url?: string
}