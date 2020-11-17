export class PaymentDto {
    creditCardNumber : string;
    cardholder: string
    expirationDate: Date;
    securityCode?: string;
    amount: string;
}