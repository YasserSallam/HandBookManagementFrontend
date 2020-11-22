import { StatusEnum } from '../../enums/statusEnum';

export class HandbookDetailsDTO {
    id:number;
    statuse:StatusEnum;
    title:string;
    countryId:number;
    guideDate:Date;
    guideInfo:string;
    attachments:any[];
    image:any;
}