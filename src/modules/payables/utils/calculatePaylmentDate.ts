export default function calculatePaymentDate(
  payment_method: string,
  date: Date,
): Date {
  if (payment_method === 'credit_card') {
    const dateInMs = date.setDate(date.getDate() + 30);
    const payment_date = new Date(dateInMs);
    return payment_date;
  }
  return new Date();
}
