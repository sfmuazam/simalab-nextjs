import { Breadcrumbs } from '@/components/breadcrumbs';
import { ScrollArea } from '@/components/ui/scroll-area';
import SuratBebasForm from '@/sections/surat-bebas/surat-bebas-form';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Surat Bebas Lab', link: '/dashboard/surat-bebas-lab' },
  { title: 'Create', link: '/dashboard/surat-bebas-lab/create' }
];

export default function Page() {
  return (
    <ScrollArea className="h-[calc(100dvh-64px)]">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <SuratBebasForm />
      </div>
    </ScrollArea>
  );
}
