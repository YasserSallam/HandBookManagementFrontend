import { StatusEnum } from '../../enums/statusEnum';

export class HandBookDTO{
    id:number;
    title:string;
    countryId:number;
    guideDate:Date;
    guideInfo:string;
    attachments:any[];
    image:any;
}