import { TimestampDto } from "../../../shared/dto/timestamp.dto"
import { ItemDto } from "./item.dto"

export interface RolItemsDto extends TimestampDto {
  id: number
  roleId: number
  itemId: number
  item: ItemDto
}