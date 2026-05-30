import React, { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import ContactChannelIcon from '@/components/ContactChannelIcon';
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  TELEGRAM_HANDLE,
  TELEGRAM_URL,
} from '@/lib/constants/contact';

const PHONE = '+380977099015';
const PHONE_DISPLAY = '+380 97 709 90 15';

const contactChannels = [
  {
    type: 'phone' as const,
    labelKey: 'channels.phone',
    href: `tel:${PHONE}`,
    value: PHONE_DISPLAY,
    opensInNewTab: false,
  },
  {
    type: 'whatsapp' as const,
    labelKey: 'channels.whatsapp',
    href: `https://wa.me/${PHONE.replace('+', '')}`,
    value: PHONE_DISPLAY,
    opensInNewTab: true,
  },
  {
    type: 'telegram' as const,
    labelKey: 'channels.telegram',
    href: TELEGRAM_URL,
    value: TELEGRAM_HANDLE,
    opensInNewTab: true,
  },
  {
    type: 'viber' as const,
    labelKey: 'channels.viber',
    href: `viber://chat?number=${PHONE.replace('+', '')}`,
    value: PHONE_DISPLAY,
    opensInNewTab: true,
  },
  {
    type: 'email' as const,
    labelKey: 'channels.email',
    href: `mailto:${EMAIL}`,
    value: EMAIL,
    opensInNewTab: false,
  },
  {
    type: 'instagram' as const,
    labelKey: 'channels.instagram',
    href: INSTAGRAM_URL,
    value: INSTAGRAM_HANDLE,
    opensInNewTab: true,
  },
  {
    type: 'clock' as const,
    labelKey: 'channels.schedule',
    href: undefined,
    valueKey: 'scheduleValue',
  },
];

type Props = {
  params: Promise<{ locale: string }>;
};

export default function ContactsPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('Contacts');

  return (
    <section className="max-w-[1228px] mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-lora text-[48px] md:text-[64px] uppercase text-black mb-4">
          {t('title')}
        </h1>
        <div className="w-24 h-1 bg-black mx-auto"></div>
        <p className="mt-6 text-[16px] text-gray-600 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {contactChannels.map((channel) => {
          const content = (
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                <ContactChannelIcon type={channel.type} className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="font-lora text-[14px] uppercase tracking-wide text-gray-500 mb-1">
                  {t(channel.labelKey)}
                </p>
                <p className="text-[16px] font-medium break-words text-black">
                  {'valueKey' in channel && channel.valueKey
                    ? t(channel.valueKey)
                    : channel.value}
                </p>
              </div>
            </div>
          );

          if (channel.href) {
            return (
              <a
                key={channel.type}
                href={channel.href}
                target={channel.opensInNewTab ? '_blank' : undefined}
                rel={
                  channel.opensInNewTab ? 'noopener noreferrer' : undefined
                }
                className="block p-6 rounded-lg border border-gray-200 bg-white hover:border-black hover:shadow-md transition-all duration-200"
              >
                {content}
              </a>
            );
          }

          return (
            <div
              key={channel.type}
              className="p-6 rounded-lg border border-gray-200 bg-white"
            >
              {content}
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-300 pt-8">
        <h2 className="font-lora text-[28px] uppercase text-black mb-4">
          {t('company.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-[16px]">
          <p>
            <span className="font-semibold">{t('company.name')}:</span>{' '}
            {t('company.fullName')}
          </p>
          <p>
            <span className="font-semibold">{t('company.inn')}:</span> 3669711966
          </p>
        </div>
      </div>
    </section>
  );
}
