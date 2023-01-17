interface AppointmentProps {
    customer: string
    startsAt: Date
    endAt: Date
}

export class Appointment {

    private props: AppointmentProps

    constructor(props: AppointmentProps) {
        const {startsAt, endAt} = props

        if(startsAt <= new Date()) {
            throw new Error('Invalid starts date')
        }

        if(endAt <= startsAt) {
            throw new Error('Invalid end date')
        }

        this.props = props
    }

    get customer() {
        return this.props.customer
    }
    get startsAt() {
        return this.props.startsAt
    }
    get endAt() {
        return this.props.endAt
    }
}

