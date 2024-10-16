import { Breadcrumbs } from '@/components/breadcrumbs';
import { ScrollArea } from '@/components/ui/scroll-area';
import SuratPeminjamanForm from '@/sections/surat-peminjaman/surat-peminjaman-form';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Surat Peminjaman', link: '/dashboard/surat-peminjaman' },
  { title: 'Create', link: '/dashboard/surat-peminjaman/create' }
];

export default function Page() {
  return (
    <ScrollArea className="h-[calc(100dvh-64px)]">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <SuratPeminjamanForm />
      </div>
    </ScrollArea>
  );
}
