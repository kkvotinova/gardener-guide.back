import { Ref, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { PlantsModel } from 'src/plants/plants.model';

export interface UsersModel extends Base {}

export class UserGarden {
  @prop({ ref: () => PlantsModel })
  plant?: Ref<PlantsModel>;
}

export class UsersModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop({ unique: true })
  username: string;

  @prop()
  password: string;

  @prop()
  garden: UserGarden[];
}
