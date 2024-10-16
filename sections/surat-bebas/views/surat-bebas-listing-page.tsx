import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import SuratBebasTable from '../surat-bebas-tables';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Surat Bebas Lab', link: '/dashboard/surat-bebas-lab' }
];

export default function SuratBebasListingPage() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title="Surat Bebas Lab"
            description="Manage surat bebas lab"
          />

          <Link
            href={'/dashboard/surat-bebas-lab/create'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Data
          </Link>
        </div>

        <Separator />
        <SuratBebasTable />
      </div>
    </PageContainer>
  );
}