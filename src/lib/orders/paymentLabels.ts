export function getPaymentMethodLabel(method: string): string {
  switch (method) {
    case 'cod':
      return 'Післяплата';
    case 'paypal':
      return 'PayPal';
    case 'card':
      return 'Оплата карткою';
    default:
      return method || '—';
  }
}

export function getPaymentStatusLabel(
  status: string,
  paymentMethod?: string,
): string {
  switch (status) {
    case 'paid':
      return '✅ Оплачено';
    case 'unpaid':
      return paymentMethod === 'cod'
        ? 'Не оплачено (післяплата)'
        : 'Не оплачено';
    case 'pending':
      return '⏳ Очікує оплату';
    case 'failed':
      return '❌ Оплата не пройшла';
    default:
      return status || '—';
  }
}
