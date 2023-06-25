import { Task } from '../models/task.model';
import { User } from '../models/user.model';

export const users: User[] = [
  new User('Admin', 'admin@admin', 'admin321'),
  new User('Felipe', 'felipe@email', '123456'),
];

users[0].tasks.push(new Task('Detalhe 1', 'Descrição 1'));
users[0].tasks.push(new Task('Detalhe 2', 'Descrição 2'));
users[1].tasks.push(new Task('Alguma coisa', 'Outra coisa!!'));
