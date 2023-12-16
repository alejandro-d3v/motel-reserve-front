import { reservationCodesStore } from "../stores/reservationCodesStore";

export class ReservationCodesService {
  private key = 'reservationCodes';

  get(): string[] {
    const codes = localStorage.getItem(this.key);

    if (codes) return JSON.parse(codes);
    return [];
  }

  set(code: string): void {
    const store = reservationCodesStore.getState();
    const codes = this.get();

    codes.push(code);
    store.set(codes);

    localStorage.setItem(this.key, JSON.stringify(codes));
  }
}