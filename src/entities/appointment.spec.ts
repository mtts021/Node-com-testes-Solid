import { expect, test } from 'vitest'
import { getFutureDate } from '../tests/get-future-date';
import { Appointment } from "./appointment";


test('Create an apppointment', () => {

    const startsAt = getFutureDate('2023-01-16')
    const endAt = getFutureDate('2023-01-18')

    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt,
        endAt
    })

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customer).toEqual('John Doe')
})

test('cannot create an appointment with end date before start date', () => {
    const startsAt = getFutureDate('2023-01-16')
    const endAt = getFutureDate('2023-01-15')
    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endAt
        })
    }).toThrow()
})
test('cannot create an appointment with start date before now', () => {
    const startsAt = new Date()
    const endAt = getFutureDate('2023-01-17')


    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endAt
        })
    }).toThrow()
})