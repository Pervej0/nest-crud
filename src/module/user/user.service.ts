import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { UserDTO } from 'src/dto';
import { PrismadbService } from 'src/prismadb/prismadb.service';
import * as ExcelJS from 'exceljs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismadbService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        fullName: true,
        email: true,
        phone: true,
        address: true,
        country: true,
        isStudent: true,
      },
    });
    return users;
  }

  async createUser(dto: any) {
    const user = await this.prisma.user.create({ data: dto });
    return user;
  }

  async updateUser(userId: string, dto: any) {
    await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const result = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });

    return result;
  }

  async deleteUser(userId: string) {
    try {
      const result = await this.prisma.user.delete({
        where: { id: userId },
      });
      console.log(result, 'pp');

      return result;
    } catch {
      throw new HttpException('Dose not exist', HttpStatus.NOT_FOUND);
    }
  }

  async exportXLS(res: Response) {
    const users = await this.prisma.user.findMany({
      select: {
        fullName: true,
        email: true,
        phone: true,
        address: true,
        country: true,
        isStudent: true,
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('TestExportXLS');

    worksheet.columns = [
      {
        header: 'fullName',
        key: 'fullName',
      },
      {
        header: 'email',
        key: 'email',
      },
      {
        header: 'phone',
        key: 'phone',
      },
      {
        header: 'address',
        key: 'address',
      },
      {
        header: 'country',
        key: 'country',
      },
      {
        header: 'isStudent',
        key: 'isStudent',
      },
    ];

    worksheet.addRow(
      users.map((user) => ({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        country: user.country,
        isStudent: user.isStudent,
      })),
    );

    const buffer = await workbook.xlsx.writeBuffer();
    res.header(
      'Content-Disposition',
      'attachment; filename=anlikodullendirme.xlsx',
    );
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);

    return;
  }
}
