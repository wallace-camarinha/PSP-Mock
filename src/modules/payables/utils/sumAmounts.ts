import { Payable } from '@shared/infra/prisma/prismaClient';

interface Amounts {
  paidAmount: number;
  paidCount: number;
  waitingAmount: number;
  waitingCount: number;
}

export default function sumAmounts(payables: Payable[]): Amounts {
  let paidAmount = 0;
  let paidCount = 0;
  let waitingAmount = 0;
  let waitingCount = 0;

  payables?.forEach(payable => {
    if (payable.status === 'paid') {
      paidAmount += payable.amount;
      paidCount += 1;
    } else {
      waitingAmount += payable.amount;
      waitingCount += 1;
    }
  });
  const amounts: Amounts = {
    paidAmount,
    paidCount,
    waitingAmount,
    waitingCount,
  };

  return amounts;
}
