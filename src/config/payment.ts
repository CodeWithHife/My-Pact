export interface PaymentAccountConfig {
  bankName: string;
  accountName: string;
  accountNumber: string;
  instructions: string;
}

export const DEFAULT_PAYMENT_ACCOUNT: PaymentAccountConfig = {
  bankName: "OPay",
  accountName: "Obadimu Ifeoluwa Bilebo",
  accountNumber: "7070295803",
  instructions:
    "Transfer the exact amount using your bank or mobile app (OPay, PalmPay, Kuda, GTBank, Zenith, Access). Enter your Sender Name below so our admin team can verify and activate your plan.",
};
