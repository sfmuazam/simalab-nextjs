import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import SuratPeminjamanTable from '../surat-peminjaman-tables';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Surat Peminjaman', link: '/dashboard/surat-peminjaman' }
];

export default function SuratPeminjamanListingPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title="Surat Peminjaman"
            description="Manage surat peminjaman"
          />

          <Link
            href={'/dashboard/surat-peminjaman/create'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Data
          </Link>
        </div>

        <Separator />
        <SuratPeminjamanTable />
      </div>
    </PageContainer>
  );
}