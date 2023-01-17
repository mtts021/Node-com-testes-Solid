import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointment-repository";

interface CreateAppointmentRequest {
    customer: string,
    startsAt: Date,
    endAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {

    constructor(private appointmentsRepository: AppointmentRepository ) {}

    async execute({customer, startsAt, endAt}: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {

        const overLappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(
            startsAt, endAt
        )

        if(overLappingAppointment) {
            throw new Error('Another appointment overlaps this appointment dates')
        }

        const appointment = new Appointment({
            customer,
            startsAt, 
            endAt
        })

        await this.appointmentsRepository.create(appointment)
        return appointment
    }
}