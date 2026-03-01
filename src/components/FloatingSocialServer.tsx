import { getSiteSettings } from "@/sanity/lib";
import { FloatingSocial } from "./FloatingSocial";

export async function FloatingSocialServer() {
  const settings = await getSiteSettings();

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
