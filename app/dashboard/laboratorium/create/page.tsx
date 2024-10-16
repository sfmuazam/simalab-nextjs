import { Breadcrumbs } from '@/components/breadcrumbs';
import { ScrollArea } from '@/components/ui/scroll-area';
import LaboratoriumForm from '@/sections/laboratorium/laboratorium-form';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Laboratorium', link: '/dashboard/laboratorium' },
  { title: 'Create', link: '/dashboard/laboratorium/create' }
];

export default function Page() {
  return (
    <ScrollArea className="h-[calc(100dvh-64px)]">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <LaboratoriumForm />
      </div>
    </ScrollArea>
  );
}
