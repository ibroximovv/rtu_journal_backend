import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BcryptEncryption } from 'src/infrastructure/lib/bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends BaseService<PrismaService['user'], CreateAuthDto, UpdateAuthDto> {
  constructor(readonly prisma: PrismaService, private readonly jwtService: JwtService) {
    super(prisma, prisma.user)
  }
  async create(createAuthDto: CreateAuthDto) {
    const { password, ...rest } = createAuthDto;

    const user = await this.prisma.user.findFirst({
      where: { username: rest.username },
    });
    if (user) throw new BadRequestException('User already exists');

    const hashedPassword = BcryptEncryption.encrypt(password);

    const data: Omit<CreateAuthDto, 'password'> & { password_hash: string } = {
      ...rest,
      password_hash: hashedPassword,
    };
    
    return await super.create(data as any);
  }


  async update(id: number, updateAuthDto: UpdateAuthDto) {
    const findone = await this.prisma.user.findFirst({ where: { id } })
    if (!findone) throw new BadRequestException('User not found!')
    let hashedPassword = findone.password_hash
    if (updateAuthDto.password) {
      hashedPassword = BcryptEncryption.encrypt(updateAuthDto.password)
    }
    const data = {
      ...updateAuthDto,
      password_hash: hashedPassword,
    }
    return await super.update(id, data)
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const findone = await this.prisma.user.findFirst({ where: { username: loginAuthDto.username } })
      if (!findone) throw new BadRequestException('User not found!')
      const isMatch = BcryptEncryption.compare(loginAuthDto.password, findone.password_hash)
      if (!isMatch) throw new BadRequestException('Invalid credentials!')

      const token = this.jwtService.sign({ id: findone.id, role: findone.role })
      return { token }
    } catch (error) {
      throw error
    }
  }
}
