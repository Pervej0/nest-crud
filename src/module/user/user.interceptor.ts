import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as ExcelJS from 'exceljs';
import * as argon2 from 'argon2';

@Injectable()
export class UserXlsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();

    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`)),
      catchError(() => throwError(() => new BadGatewayException())),
      map(async (data) => {
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
        console.log(data, 'ooo');
        data.forEach((user) => {
          worksheet.addRow(user);
        });

        worksheet.getRow(1).font = { bold: true };

        res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        res.setHeader(
          'Content-Disposition',
          'attachment; filename="users.xlsx"',
        );

        await workbook.xlsx.write(res);
      }),
    );
  }
}

export class CreateUserInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const body = context.switchToHttp().getRequest().body;
    const hash = await argon2.hash(body.password);
    body.password = hash;

    return next.handle().pipe();
  }
}
