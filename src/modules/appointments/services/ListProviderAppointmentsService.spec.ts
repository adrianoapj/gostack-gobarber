import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

describe('ListProviderAppointments', () => {
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let listProviderAppointments: ListProviderAppointmentsService;
  let fakeCacheProvider: FakeCacheProvider;

  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments of a specific date', async () => {
    const appointments = [];

    appointments[0] = await fakeAppointmentsRepository.create({
      provider_id: 'example_provider_id',
      user_id: 'example_user_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    appointments[1] = await fakeAppointmentsRepository.create({
      provider_id: 'example_provider_id',
      user_id: 'example_user_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const providersList = await listProviderAppointments.execute({
      provider_id: 'example_provider_id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(providersList).toEqual(appointments);
  });
});
