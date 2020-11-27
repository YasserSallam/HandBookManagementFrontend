import { StatusEnum } from '../../enums/statusEnum';
import { AttachmentDTO } from './AttachmentDTO';

export class HandbookDetailsDTO {
    id:number;
    statuse:StatusEnum;
    title:string;
    countryId:number;
    guideDate:Date;
    guideInfo:string;
    attachments:AttachmentDTO[];
    image:any;
}