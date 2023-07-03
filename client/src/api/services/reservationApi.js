import { AxiosInstance } from "./axiosInstances";

class ReservationApi {
  static async newReservation({
    userId,
    listingId,
    ownerId,
    startDate,
    endDate,
    totalprice
  }) {
    const result = await AxiosInstance.post("reservations",{
        userId,
        listingId,
        startDate,
        ownerId,
        endDate,
        totalprice
    })

    return result.data.data;
  }
  static async getReservationsById({ reservationID }) {
    const result = await AxiosInstance.get(`/reservations?listingId=${reservationID}`);
    return result.data.data;
  }
  static async getReservationsByUserId({ userId }) {
    const result = await AxiosInstance.get(`/reservations?userId=${userId}`);
    return result.data.data;
  }
  static async getReservationsByOwnerId({ ownerId }) {
    const result = await AxiosInstance.get(`/reservations?ownerId=${ownerId}`);
    return result.data.data;
  }
  static async deleteReservationById({reservationID}){
    const result = await AxiosInstance.delete(`/reservations/${reservationID}`);
    return result.data;
  }
}

export default ReservationApi;
