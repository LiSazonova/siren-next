import { useTranslations } from 'next-intl';
import DeliverySection from './DeliverySection';
import PaymentSection from './PaymentSection';

export default function CheckoutForm({
  form,
  update,
  deliveryCountry,
  setDeliveryCountry,
  setDelivery,
  payment,
  setPayment,
  agree,
  setAgree,
}: any) {
  const t = useTranslations('checkout');

  return (
    <div className="flex flex-col gap-6">
      <input
        className="border p-4"
        placeholder={t('placeholders.name')}
        value={form.name}
        onChange={(e) => update('name', e.target.value)}
      />
      <input
        className="border p-4"
        placeholder={t('placeholders.email')}
        value={form.email}
        onChange={(e) => update('email', e.target.value)}
      />
      <input
        className="border p-4"
        placeholder={t('placeholders.phone')}
        value={form.phone}
        onChange={(e) => update('phone', e.target.value)}
      />
      <input
        className="border p-4"
        placeholder={t('placeholders.country')}
        value={form.country}
        onChange={(e) => update('country', e.target.value)}
      />
      <input
        className="border p-4"
        placeholder={t('placeholders.address')}
        value={form.address}
        onChange={(e) => update('address', e.target.value)}
      />

      <DeliverySection
        deliveryCountry={deliveryCountry}
        setDeliveryCountry={setDeliveryCountry}
        setDelivery={setDelivery}
        postalCode={form.postalCode}
        update={update}
      />

      <PaymentSection
        payment={payment}
        setPayment={setPayment}
        deliveryCountry={deliveryCountry}
      />

      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        I agree with terms
      </label>
    </div>
  );
}
