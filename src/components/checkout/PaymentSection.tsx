import { useTranslations } from 'next-intl';

export default function PaymentSection({
  payment,
  setPayment,
  deliveryCountry,
}: any) {
  const t = useTranslations('checkout');

  if (!deliveryCountry) return null;

  return (
    <div className="space-y-6 mt-8">
      <h2 className="uppercase text-xl font-semibold">{t('payment')}:</h2>

      {/* 💳 Card (WayForPay) */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          className="w-5 h-5 accent-black"
          checked={payment === 'card'}
          onChange={() => setPayment('card')}
        />
        <span className="text-lg">{t('card')}</span>
      </label>

      {payment === 'card' && (
        <div className="pl-8">
          <p className="text-gray-500 text-base">
            {t('cardRedirectDescription')}
          </p>
        </div>
      )}

      {/* 🚚 COD (only UA) */}
      {deliveryCountry === 'ua' && (
        <>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              className="w-5 h-5 accent-black"
              checked={payment === 'cod'}
              onChange={() => setPayment('cod')}
            />
            <span className="text-lg">
              {t('cod')} ({t('onlyUkraine')})
            </span>
          </label>

          {payment === 'cod' && (
            <div className="pl-8">
              <p className="text-gray-500 text-base">{t('codDescription')}</p>
            </div>
          )}
        </>
      )}

      {/* 🌍 PayPal */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          className="w-5 h-5 accent-black"
          checked={payment === 'paypal'}
          onChange={() => setPayment('paypal')}
        />
        <span className="text-lg">PayPal</span>
      </label>

      {payment === 'paypal' && (
        <div className="pl-8">
          <p className="text-gray-500 text-base">{t('paypalDescription')}</p>
        </div>
      )}
    </div>
  );
}
