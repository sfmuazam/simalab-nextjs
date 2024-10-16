import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { getInventarisLength, getSuratBebasLength, getSuratPeminjamanLength, getSuratPenelitianLength } from '@/lib/action';

export default async function OverViewPage() {
  const suratPenelitian = await getSuratPenelitianLength();
  const suratBebas = await getSuratBebasLength();
  const suratPeminjaman = await getSuratPeminjamanLength();
  const inventaris = await getInventarisLength();

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Surat Penelitian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{suratPenelitian}</div>
              <p className="text-xs text-muted-foreground">
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Surat Bebas Lab
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{suratBebas}</div>
              <p className="text-xs text-muted-foreground">
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Surat Peminjaman
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{suratPeminjaman}</div>
              <p className="text-xs text-muted-foreground">
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inventaris
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventaris}</div>
              <p className="text-xs text-muted-foreground">
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
