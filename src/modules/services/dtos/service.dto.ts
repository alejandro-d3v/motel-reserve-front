import { TimestampDto } from "../../../shared/dto/timestamp.dto"
import { ReservationDto } from "../../home/dtos/reservations.dto"

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

export interface ServiceWithReservationsDto extends ServiceDto {
  reservation: ReservationDto[]
}