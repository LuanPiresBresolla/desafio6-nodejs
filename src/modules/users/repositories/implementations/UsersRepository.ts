import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne(user_id, {
      relations: ['games']
    });    

    return user ? user : {} as User;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const query = 'select * from users order by first_name asc';

    return this.repository.query(query); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const query = `select * from users where first_name ilike '%${first_name}%' and last_name ilike '%${last_name}%'`;

    return this.repository.query(query); // Complete usando raw query    
  }
}
