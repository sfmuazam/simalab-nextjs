import { Breadcrumbs } from '@/components/breadcrumbs';
import { ScrollArea } from '@/components/ui/scroll-area';
import SuratPenelitianForm from '@/sections/surat-penelitian/surat-penelitian-form';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Surat Penelitian', link: '/dashboard/surat-penelitian' },
  { title: 'Create', link: '/dashboard/surat-penelitian/create' }
];

export default function Page() {
  return (
    <ScrollArea className="h-[calc(100dvh-64px)]">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <SuratPenelitianForm />
      </div>
    </ScrollArea>
  );
}
