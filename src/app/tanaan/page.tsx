import TodayDashboard from '@/components/today/TodayDashboard.client';

export const metadata = {
  title: 'Tänään — Kazakstan',
  description: 'Tämän päivän plan, ankkurit, hätäkortti ja pikalinkit reissun aikana.',
};

export default function TanaanPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Tänään</h1>
        <p className="text-sm text-muted-foreground">
          Päivän plan, ankkurit, käteinen ja hätäkortti — yhdellä silmäyksellä.
        </p>
      </div>

      <TodayDashboard />
    </div>
  );
}
