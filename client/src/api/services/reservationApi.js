import { AxiosInstance } from "./axiosInstances";

class ReservationApi {
  static async newReservation({
    userId,
    listingId,
    startDate,
    endDate,
    totalprice
  }) {
    const result = await AxiosInstance.post("reservations",{
        userId,
        listingId,
        startDate,
        endDate,
        totalprice
    })

    return result.data.data;
  }
  static async getReservationsById({ reservationID }) {
    const result = await AxiosInstance.get(`/reservations/${reservationID}`);
    return result.data.data;
  }
}

export default ReservationApi;
