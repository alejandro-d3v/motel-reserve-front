import { TimestampDto } from "../../../shared/dto/timestamp.dto"
import { ServiceDto } from "../../services/dtos/service.dto"

export interface ReservationDto extends TimestampDto {
  code: string
  nameClient: string
  id: number
  startTime: string
  endtTime: string
  paymentStatus: number
  updatedAt: string
  date: string
  phone: string
  totalPrice: number
}

export interface reservationWithServiceDto extends ReservationDto {
  services: ServiceDto
}