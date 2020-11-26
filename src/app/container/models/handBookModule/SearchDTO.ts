import { StatusEnum } from '../../enums/statusEnum';
import { HandBookStatus } from './HandBookStatus';

export class SearchDTO{
    pagenumber:number;
    pageSize:number;
    handbookStatus:StatusEnum;
    title:string;
    fromDate?:Date;
    toDate?:Date;
    countryId?:number;
}