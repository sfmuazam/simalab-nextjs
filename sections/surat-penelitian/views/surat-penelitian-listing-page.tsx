import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import SuratPenelitianTable from '../surat-penelitian-tables';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Surat Penelitian', link: '/dashboard/surat-penelitian' }
];

export default function SuratPenelitianListingPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title="Surat Penelitian"
            description="Manage surat penelitian"
          />

          <Link
            href={'/dashboard/surat-penelitian/create'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Data
          </Link>
        </div>

        <Separator />
        <SuratPenelitianTable />
      </div>
    </PageContainer>
  );
}