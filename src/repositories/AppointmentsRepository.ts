import { Repository, EntityRepository } from 'typeorm';

import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider_id: string;
  date: Date;
}

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async isBooked({
    provider_id,
    date,
  }: CreateAppointmentDTO): Promise<boolean> {
    const findAppointment = await this.findOne({
      where: { provider_id, date },
    });

    return Boolean(findAppointment);
  }
}

export default AppointmentsRepository;
