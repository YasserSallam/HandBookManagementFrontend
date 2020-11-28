import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HandbookDetailsDTO } from 'src/app/container/models/handBookModule/HandbookDetailsDTO';
import { HandBookStatusDTO } from 'src/app/container/models/handBookModule/HandBookStatusDTO';
import { LookupDTO } from 'src/app/container/models/lookup/lookupDTO';
import { AttachmentService } from 'src/app/container/services/HandbookModule/attachment.service';
import { HandbookService } from 'src/app/container/services/HandbookModule/handbook.service';
import { LookupService } from 'src/app/container/services/lookup/lookup.service';
import { SharedService } from 'src/app/container/services/shared/shared.service';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver'
import { map } from 'rxjs/operators'
import { AttachmentDTO } from 'src/app/container/models/handBookModule/AttachmentDTO';
import { FileTypeEnum } from 'src/app/container/enums/FileTypeEnum';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  handbook: HandbookDetailsDTO;
  handbookId: any;
  countries: LookupDTO[] = [];
  attachments:AttachmentDTO[]=[];
  handbookFiles:AttachmentDTO[]=[];
  user: string;
  selectedImageUrl: string;
  baseFileUrl: string = environment.FilesURL;
  imgSrc = 'data:image/jpeg;base64,'
  constructor(private _route: ActivatedRoute,
    private _handbookServ: HandbookService,
    private _router: Router,
    private _lookupServ: LookupService,
    private _sharedServ: SharedService,
    private _attachmentServ: AttachmentService) { }

  ngOnInit(): void {
    this.loodLookups();
    this.handbookId = this._route.snapshot.paramMap.get('id');
    if (this.handbookId)
      this.GetHandbook(+this.handbookId);
  }
  loodLookups() {
    this._lookupServ.getCountries().subscribe(res => {
      this.countries = res
    },
      err => { console.log(err) }
    );
  }
  GetHandbook(id: number) {
    this._handbookServ.getDetails(id).subscribe(
      res => {
        this.handbook = res;
        this.imgSrc = this.imgSrc + res.image
        this.attachments=res.attachments
       this.ExtractFiles()
      },
      error => console.log(error)
    )
  }
  ExtractFiles(){
this.handbookFiles=this.attachments.filter(f=>f.type == FileTypeEnum.file)

  }
  manageFileType(name: string): string {
    return this._sharedServ.manageFileType(name)
  }

  downloadFile(id, fileName:string) {
let extension=fileName.split('.')[0];

    this._attachmentServ.download(id)
      .subscribe((res) => {
        var blob = this.convertBase64ToBlobData(res, 'application'+`/`+extension);
        FileSaver. saveAs(blob,fileName);
      }, error => console.log(error))


  }


  convertBase64ToBlobData(base64Data: string, contentType: string, sliceSize=512) {
    const byteCharacters = window.atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


}
