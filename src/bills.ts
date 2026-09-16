export const money = (cents: number) => (cents / 100).toFixed(2);
// Twelve-month demo contract: June 2026 through May 2027.
// Two installments are settled; the remaining ten include August 2026.
export const bills = Array.from({ length: 12 }, (_, index) => {
  const date = new Date(2026, 5 + index, 1);
  return { date, key: `${date.getFullYear()}-${date.getMonth()}`, cents: index === 0 ? 127289 : index === 1 ? 47289 : 26789, couponCents: index === 0 ? 100000 : index === 1 ? 20000 : index === 2 ? 10000 : 0, settled: index < 2 };
});
export function summarize(paid: string[]) {
  const history = bills.filter(b => b.settled || paid.includes(b.key));
  const pending = bills.filter(b => !b.settled && !paid.includes(b.key));
  return { history, pending, savings: history.reduce((s,b)=>s+b.couponCents,0), total: bills.reduce((s,b)=>s+b.cents,0), settled: history.reduce((s,b)=>s+b.cents,0), remaining: pending.reduce((s,b)=>s+b.cents,0) };
}
