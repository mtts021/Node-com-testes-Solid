import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointmentd";
import { getFutureDate } from "../tests/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe('Create Appointment', () => {
    it('should be able to create an appointment', () => {

        const appointmentReporitory = new InMemoryAppointmentsRepository()
        const createAppointment = new CreateAppointment(appointmentReporitory)

        const startsAt = getFutureDate('2023-01-16')
        const endAt = getFutureDate('2023-01-18')

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endAt
        })).resolves.toBeInstanceOf(Appointment)
    })
    it('should not be able to create an appointment with overlapping dates', async () => {

        const appointmentReporitory = new InMemoryAppointmentsRepository()
        const createAppointment = new CreateAppointment(appointmentReporitory)

        const startsAt = getFutureDate('2023-01-16')
        const endAt = getFutureDate('2023-01-20')

        await createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endAt
        })

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2023-01-17'),
            endAt: getFutureDate('2023-01-21')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2023-01-15'),
            endAt: getFutureDate('2023-01-19')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2023-01-15'),
            endAt: getFutureDate('2023-01-18')
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate('2023-01-17'),
            endAt: getFutureDate('2023-01-22')
        })).rejects.toBeInstanceOf(Error)
    })
})