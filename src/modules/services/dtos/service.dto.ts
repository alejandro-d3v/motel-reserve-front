import { TimestampDto } from "../../../shared/dto/timestamp.dto"

export interface ServiceDto extends TimestampDto {
  description: string
  id: number
  price: number
  status: number
  urlImg?: string
  name: string
  longDescription: string
  advancePayment: number
}