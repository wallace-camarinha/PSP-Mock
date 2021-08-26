import Payable from '../infra/typeorm/entities/Payable';

interface Amounts {
  paidAmount: number;
  paidCount: number;
  waitingAmount: number;
  waitingCount: number;
}

let paidAmount = 0;
let paidCount = 0;
let waitingAmount = 0;
let waitingCount = 0;

export default function sumAmounts(payables: Payable[]): Amounts {
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
