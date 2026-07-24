import { MainLayout } from "@/components/layout";
import { getLocale } from "@/i18n/server";

export const revalidate = 10;

export default async function VoicePage() {
  const locale = await getLocale();
  const voiceBankLocale = locale === "ka" ? "ge" : locale;

  return (
    <MainLayout activeNav="/voice">
      <div className="w-full" style={{ height: "calc(100vh - 5rem)" }}>
        <iframe
          src={`https://voicebank.ge/${voiceBankLocale}/`}
          className="w-full h-full rounded-xl border border-primary/20"
          allow="autoplay; clipboard-write; encrypted-media"
          allowFullScreen
          title="VoiceBank"
        />
      </div>
    </MainLayout>
  );
}
