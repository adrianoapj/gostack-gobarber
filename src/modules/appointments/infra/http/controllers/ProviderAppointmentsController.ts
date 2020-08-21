import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.query;
    const provider_id = request.user.id;

    const listProviderAppointment = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointment.execute({
      month: Number(month),
      year: Number(year),
      day: Number(day),
      provider_id,
    });

    return response.json(classToClass(appointments));
  }
}
