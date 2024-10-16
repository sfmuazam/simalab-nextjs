import { Breadcrumbs } from '@/components/breadcrumbs';
import { ScrollArea } from '@/components/ui/scroll-area';
import PetugasForm from '@/sections/petugas/petugas-form';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Petugas', link: '/dashboard/petugas' },
  { title: 'Create', link: '/dashboard/petugas/create' }
];

export default function Page() {
  return (
    <ScrollArea className="h-[calc(100dvh-64px)]">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <PetugasForm />
      </div>
    </ScrollArea>
  );
}
