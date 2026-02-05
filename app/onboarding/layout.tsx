import { OnboardingHeader } from "../components/OnboardingHeader";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 flex flex-col max-w-md mx-auto w-full px-6">
        {children}
      </main>
    </div>
  );
}
