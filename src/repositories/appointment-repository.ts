import { Appointment } from "../entities/appointment";

export interface AppointmentRepository {
    create(appointment: Appointment): Promise<void>;
    findOverlappingAppointment(startsAt: Date, endAt: Date): Promise<Appointment | null>
}
