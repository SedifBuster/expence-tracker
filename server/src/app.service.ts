import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  private readonly htmlContent: string;

  constructor() {
    const filePath = join(process.cwd(), 'static', 'api-docs.html');
    this.htmlContent = readFileSync(filePath, 'utf-8');
  }

  getHello(): string {
    return this.htmlContent;
  }
}
