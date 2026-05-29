import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

/**
 * Instant loading state for a sight detail.
 *
 * Detail routes are statically prerendered (see `generateStaticParams`), so in
 * production they're fully prefetched on viewport and navigation is instant —
 * this skeleton rarely shows. Its real job is the cold path (dev, where
 * prefetch is disabled; a slow network; or an expired prefetch): it gives the
 * tap *immediate* visual feedback, which is what removes the "did my tap
 * register? — tap again" double-tap feeling.
 *
 * The shape mirrors `[slug]/page.tsx` (hero → header → 2/1 content grid) so the
 * transition into real content has no layout shift.
 */
export default function SightDetailLoading() {
  return (
    <div className="space-y-8 pb-20 lg:pb-0" aria-hidden>
      {/* Hero image */}
      <Skeleton className="aspect-[16/9] w-full rounded-lg sm:aspect-[21/9]" />

      {/* Header: badges + title */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-9 w-2/3 max-w-md" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-6 w-full max-w-2xl" />
      </div>

      {/* Content grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-28" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
