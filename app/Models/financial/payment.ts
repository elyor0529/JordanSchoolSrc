export class Payment {
    id: number;
    voucherId: string;
    regParentId:number;
    fatherName:string;
    yearDesc:string;
    voucherTypeId: number;
    voucherTypeDesc: string;
    voucherStatusId: number;
    voucherStatusDesc: string;
    debit: number;
    credit: number;
    note: string;
    paymentMethodDesc : string;
    transferNo:string;
    transferDate: Date;
    visaCardNo:string;
}