import { useTranslations } from 'next-intl';

export default function PaymentSection({
  payment,
  setPayment,
  deliveryCountry,
}: any) {
  const t = useTranslations('checkout');

  if (!deliveryCountry) return null;

  return (
    <>
      <h2 className="uppercase text-xl mt-6">{t('payment')}</h2>

      <label className="flex gap-2">
        <input
          type="radio"
          checked={payment === 'card'}
          onChange={() => setPayment('card')}
        />
        {t('card')}
      </label>

      {payment === 'card' && (
        <p className="pl-6 text-sm text-gray-500">{t('cardDescription')}</p>
      )}

      {deliveryCountry === 'ua' && (
        <label className="flex gap-2 mt-2">
          <input
            type="radio"
            checked={payment === 'cod'}
            onChange={() => setPayment('cod')}
          />
          {t('cod')} (UA)
        </label>
      )}

      <label className="flex gap-2 mt-2">
        <input
          type="radio"
          checked={payment === 'paypal'}
          onChange={() => setPayment('paypal')}
        />
        {t('paypal')}
      </label>
    </>
  );
}
