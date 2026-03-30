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
    <>
      <h2 className="uppercase text-xl">{t('delivery')}</h2>

      <label className="flex gap-2">
        <input
          type="radio"
          checked={deliveryCountry === 'ua'}
          onChange={() => {
            setDeliveryCountry('ua');
            setDelivery('nova');
          }}
        />
        {t('ua')}
      </label>

      {deliveryCountry === 'ua' && (
        <div className="pl-6">
          <p className="text-sm text-gray-500">{t('deliveryDescriptionUA')}</p>

          <input
            className="border p-4"
            placeholder="Поштовий індекс"
            value={postalCode}
            onChange={(e) => update('postalCode', e.target.value)}
          />
        </div>
      )}

      <label className="flex gap-2 mt-4">
        <input
          type="radio"
          checked={deliveryCountry === 'world'}
          onChange={() => {
            setDeliveryCountry('world');
            setDelivery('intl');
          }}
        />
        {t('world')}
      </label>

      {deliveryCountry === 'world' && (
        <div className="pl-6">
          <input
            className="border p-4"
            placeholder="ZIP code"
            value={postalCode}
            onChange={(e) => update('postalCode', e.target.value)}
          />
        </div>
      )}
    </>
  );
}
