import { type BreadcrumbItem, } from '@/types';
import { Head, Link, } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import AccessControlLayout from '@/layouts/access-control/layout';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/courses/course-data-table';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/course';
import { CreateCourse } from '@/components/courses/create-course';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cursos',
        href: '/cursos',
    },
];

export default function Courses({ courses }: { courses: [Course] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cursos" />
            <AccessControlLayout headings={{
                title: 'Lista de cursos',
                description: 'Aquí puedes ver todos los cursos disponibles.',
            }}>
                <div className="space-y-6 w-full flex flex-col">
                    <div className="flex items-center justify-end absolute right-0 -top-16 p-4">
                        <CreateCourse />
                    </div>
                    <DataTable<Course>
                        data={courses}
                        columns={columns}
                        filterKey="name"
                    />

                </div>
            </AccessControlLayout>
        </AppLayout>
    );
}
