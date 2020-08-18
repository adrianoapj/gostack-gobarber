import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

describe('ListProviders', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let listProviders: ListProvidersService;
  let fakeCacheProvider: FakeCacheProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to show the profile', async () => {
    const users = [];

    users[0] = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@contoso.com',
      password: '123456',
    });

    users[1] = await fakeUsersRepository.create({
      name: 'John For',
      email: 'john@contoso.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'john@contoso.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual(users);
  });
});
