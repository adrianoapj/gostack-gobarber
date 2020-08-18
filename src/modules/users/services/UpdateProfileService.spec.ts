import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('UpdateProfile', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let updateProfile: UpdateProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@contoso.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'john@tre.com',
    });

    expect(updatedUser.name).toBe('John Tre');
    expect(updatedUser.email).toBe('john@tre.com');
  });

  it("should not be able to change to another user's email", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@contoso.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'John Tree',
      email: 'john@tree.com',
      password: 'abcde123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'john@tree.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@contoso.com',
      password: '123456',
    });

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'john@contoso.com',
      old_password: '123456',
      password: 'abcde123',
    });

    expect(updatedUser.password).toBe('abcde123');
    expect(generateHash).toBeCalledWith('abcde123');
  });

  it('should not be able to update the password without providing the old one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@contoso.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'john@contoso.com',
        password: 'abcde123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password providing a wrong old one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@contoso.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'john@contoso.com',
        old_password: 'fgh789012',
        password: 'abcde123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password of a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'John Doe',
        email: 'john@contoso.com',
        old_password: '123456',
        password: 'abcde123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
