import { FileUploader, FileSelectDirective,FileUploaderOptions,Headers } from 'ng2-file-upload';
export class FileUploaderExtended extends FileUploader{
public setHeader(headerName: string, value: string) {
    if (!this.options.headers) {
      this.options.headers = [];
    }
    let header: any = { 'name': headerName, 'value': value };
    this.options.headers.push(header);
  }
}