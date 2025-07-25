import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/pre-registration/pre-inscriptions-data-table';
import AppLayout from '@/layouts/app-layout';
import PreInscriptionLayout from '@/layouts/pre-inscription/layout';
import { type PreInscription } from '@/types/pre-inscription';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pre-Inscription',
        href: '/pre-inscription',
    },
];

export default function PreInscription({ preInscriptions }: { preInscriptions: PreInscription[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pre-inscripciones" />
            <PreInscriptionLayout
                headings={{
                    title: 'Dashboard de Pre-inscripciones',
                    description: 'Aquí puedes ver y gestionar todas las pre-inscripciones recibidas.',
                }}
            >
                <div className="flex w-full flex-col space-y-6">
                    <DataTable<PreInscription> data={preInscriptions || []} columns={columns} filterKey="first_name" />
                </div>
            </PreInscriptionLayout>
        </AppLayout>
    );
}
