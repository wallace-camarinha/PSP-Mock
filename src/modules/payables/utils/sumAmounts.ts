import Payable from '../infra/typeorm/entities/Payable';

interface Amounts {
  paidAmount: number;
  paidCount: number;
  waitingAmount: number;
  waitingCount: number;
}

let paidAmount: number;
let paidCount: number;
let waitingAmount: number;
let waitingCount: number;

export default function sumAmounts(payables: Payable[]): Amounts {
  payables?.forEach(payable => {
    if (payable.status === 'waiting_funds') {
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
