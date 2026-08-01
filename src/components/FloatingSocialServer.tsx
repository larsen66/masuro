import { getSiteSettings } from "@/sanity/lib";
import { FloatingSocial } from "./FloatingSocial";
import { getLocale } from "@/i18n/server";

export async function FloatingSocialServer() {
  const locale = await getLocale();
  const settings = await getSiteSettings(locale);

  if (!settings) return null;

  return (
    <FloatingSocial
      whatsappNumber={settings.whatsappNumber}
      instagramUrl={settings.instagramUrl}
      facebookUrl={settings.facebookUrl}
      telegramUrl={settings.telegramUrl}
      phoneNumber={settings.phoneNumber}
    />
  );
}
