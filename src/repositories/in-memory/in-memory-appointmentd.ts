import { areIntervalsOverlapping, isThisSecond } from "date-fns";
import { Appointment } from "../../entities/appointment";
import { AppointmentRepository } from "../appointment-repository";


export class InMemoryAppointmentsRepository implements AppointmentRepository{

    public item: Appointment[] = []

    async create(appointment: Appointment): Promise<void>{
        this.item.push(appointment)
    }


    async findOverlappingAppointment(startsAt: Date, endAt: Date): Promise<Appointment | null> {
        const overlappingAppointment = this.item.find(appointment => {
            return areIntervalsOverlapping(
                {start: startsAt, end: endAt},
                {start: appointment.startsAt, end: appointment.endAt},
                {inclusive: true}
            )
        })

        if(!overlappingAppointment) {
            return null
        }

        return overlappingAppointment
    }

} 