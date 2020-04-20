import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  public all(): Appointment[] {
    return this.appointments;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public isBooked({ provider, date }: Omit<Appointment, 'id'>): boolean {
    const findAppointment = Boolean(
      this.appointments.find(appointment => {
        return (
          isEqual(appointment.date, date) && appointment.provider === provider
        );
      }),
    );

    return findAppointment;
  }

  constructor() {
    this.appointments = [];
  }
}

export default AppointmentsRepository;
