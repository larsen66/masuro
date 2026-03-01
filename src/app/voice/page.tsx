import { MainLayout } from "@/components/layout";

export const revalidate = 10;

export default function VoicePage() {
  return (
    <MainLayout activeNav="/voice">
      <div className="w-full" style={{ height: "calc(100vh - 5rem)" }}>
        <iframe
          src="https://voicebank.ge/ge/"
          className="w-full h-full rounded-xl border border-primary/20"
          allow="autoplay; clipboard-write; encrypted-media"
          allowFullScreen
          title="VoiceBank"
        />
      </div>
    </MainLayout>
  );
}
