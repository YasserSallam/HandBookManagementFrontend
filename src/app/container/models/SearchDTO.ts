import { StatusEnum } from '../enums/statusEnum';
import { HandBookStatus } from './handBookModule/HandBookStatus';

export class SearchDTO{
    handbookStatus:StatusEnum;
    title:string;
    fromDate:Date;
    toDate:Date;
    countryId:number;
}