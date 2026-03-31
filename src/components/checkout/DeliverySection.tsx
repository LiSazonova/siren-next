import { useTranslations } from 'next-intl';

export default function DeliverySection({
  deliveryCountry,
  setDeliveryCountry,
  setDelivery,
  postalCode,
  update,
}: any) {
  const t = useTranslations('checkout');

  return (
    <div className="space-y-6">
      <h2 className="uppercase text-xl font-semibold">{t('delivery')} :</h2>

      {/* 🇺🇦 Ukraine */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          className="w-5 h-5 accent-black"
          checked={deliveryCountry === 'ua'}
          onChange={() => {
            setDeliveryCountry('ua');
            setDelivery('nova');
          }}
        />
        <span className="text-lg">{t('ua')}</span>
      </label>

      {deliveryCountry === 'ua' && (
        <div className="pl-8 space-y-4">
          <p className="text-gray-500 text-base">
            {t('deliveryDescriptionUA')}
          </p>

          <div className="space-y-2">
            {/* <p className="text-base">{t('enterPostalCode')}</p> */}

            <input
              className="border border-gray-300 p-4 w-full text-base"
              placeholder={t('placeholders.postalCode')}
              value={postalCode}
              onChange={(e) => update('postalCode', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* 🌍 Worldwide */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          className="w-5 h-5 accent-black"
          checked={deliveryCountry === 'world'}
          onChange={() => {
            setDeliveryCountry('world');
            setDelivery('intl');
          }}
        />
        <span className="text-lg">{t('world')}</span>
      </label>

      {deliveryCountry === 'world' && (
        <div className="pl-8">
          <input
            className="border border-gray-300 p-4 w-full text-base"
            placeholder="ZIP code"
            value={postalCode}
            onChange={(e) => update('postalCode', e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
