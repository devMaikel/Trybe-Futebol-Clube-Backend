import * as bcrypt from 'bcryptjs';
import { IEmailAndPassword, IStatusAndMessage, IUser } from '../interfaces';
import UsersModel from '../database/models/UsersModel';
import { tokenGenerator } from '../utils/jwtUtils';

class LoginService {
  public userModel = UsersModel;

  public login = async (user: IEmailAndPassword): Promise<IStatusAndMessage> => {
    const findedUser = await this.userModel
      .findOne({ where: { email: user.email }, raw: true }) as IUser;
    if (!findedUser) return { status: 401, message: 'Incorrect email or password' };
    const checkPassword = await bcrypt.compare(user.password, findedUser.password);
    if (!checkPassword) return { status: 401, message: 'Incorrect email or password' };
    const token = tokenGenerator({
      id: findedUser.id, username: findedUser.username, role: findedUser.role });
    return { status: 200, message: token };
  };
}

export default LoginService;
