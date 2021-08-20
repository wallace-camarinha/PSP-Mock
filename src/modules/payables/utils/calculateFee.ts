export default function calculateFee(
  amount: number,
  payment_method: string,
): number {
  if (payment_method === 'credit_card') {
    return amount - amount * 0.05;
  }
  return amount - amount * 0.03;
}
