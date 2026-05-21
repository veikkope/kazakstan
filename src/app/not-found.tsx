import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="py-12 flex justify-center">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">404 — Ei löytynyt</CardTitle>
          <CardDescription>
            Tätä sivua ei ole olemassa. Ehkä tarkoitit:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/kartta">Kartta</Link>
            </li>
            <li>
              <Link href="/nahtavyydet">Nähtävyydet</Link>
            </li>
            <li>
              <Link href="/reitit">Valmiit reitit</Link>
            </li>
          </ul>
          <Button asChild>
            <Link href="/">Etusivulle</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
