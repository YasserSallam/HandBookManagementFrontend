import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  PageSize=5;

  constructor() { }

  manageFileType(name: string): string {
    let fileNameArr = name.split('.');

    let extension = fileNameArr[fileNameArr.length - 1];
    switch (extension) {
      case 'pdf':
        return 'PDF.svg'
      case 'doc':
      case 'docx':
        return 'docx.svg'
    }
  }

}
