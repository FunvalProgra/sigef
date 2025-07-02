import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { GraduationCap, CheckCircle, XCircle, Clock, TrendingUp, MapPin, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PreInscriptionStats {
    total: number
    pending: number
    approved: number
    rejected: number
    approvalPercentage: number
    newThisWeek: number
}

interface PreInscriptionByCountry {
    country: string
    quantity: number
    percentage: number
}

interface PreInscriptionByStake {
    stake: string
    quantity: number
    percentage: number
}

interface PreInscriptionByModality {
    modality: string
    quantity: number
    percentage: number
}

interface PreInscription {
    id: number
    first_name: string
    middle_name: string | null
    last_name: string
    second_last_name: string | null
    gender: {
        id: number
        name: string
    }
    age: number
    phone: string | null
    email: string | null
    marital_status: {
        id: number
        name: string
    }
    served_mission: boolean
    currently_working: boolean
    job_type_preference: {
        id: number
        name: string
    }
    available_full_time: boolean
    status: {
        id: number
        name: string
    }
    comments: string | null
    declined_reason: string | null
    modified_by: string | null
    created_at: string
    updated_at: string
    country: {
        id: number
        name: string
    }
    stake: {
        id: number
        name: string
    }
}

interface DashboardData {
    stats: PreInscriptionStats
    preInscriptionsByCountry: PreInscriptionByCountry[]
    preInscriptionsByStake: PreInscriptionByStake[]
    preInscriptionsByModality: PreInscriptionByModality[]
    preInscriptions: PreInscription[]
}

interface DashboardProps {
    data: DashboardData
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Preinscripciones',
        href: '/dashboard/preinscripciones',
    },
];

export default function DashboardPreInscripciones({ data }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Preinscripciones" />
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-blue-700">Dashboard de Preinscripciones</h2>
                        <p className="text-muted-foreground">Resumen y métricas de las preinscripciones recibidas</p>
                    </div>
                </div>

                {/* Métricas principales */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700">Total Preinscripciones</CardTitle>
                            <GraduationCap className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{data.stats.total}</div>
                            <p className="text-xs text-muted-foreground">+{data.stats.newThisWeek} esta semana</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700">Pendientes</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{data.stats.pending}</div>
                            <p className="text-xs text-muted-foreground">
                                {data.stats.total > 0 ? ((data.stats.pending / data.stats.total) * 100).toFixed(1) : 0}% del total
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700">Aprobadas</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{data.stats.approved}</div>
                            <p className="text-xs text-muted-foreground">
                                {data.stats.total > 0 ? ((data.stats.approved / data.stats.total) * 100).toFixed(1) : 0}% del total
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700">Rechazadas</CardTitle>
                            <XCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{data.stats.rejected}</div>
                            <p className="text-xs text-muted-foreground">
                                {data.stats.total > 0 ? ((data.stats.rejected / data.stats.total) * 100).toFixed(1) : 0}% del total
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Tasa de aprobación */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Tasa de Aprobación</CardTitle>
                            <CardDescription>Porcentaje de preinscripciones procesadas que fueron aprobadas</CardDescription>
                        </CardHeader>
                        <CardContent className="px-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-2xl font-bold text-green-600">{data.stats.approvalPercentage}%</p>
                                        <p className="text-xs text-muted-foreground">
                                            {data.stats.approved} de {data.stats.approved + data.stats.rejected} procesadas
                                        </p>
                                    </div>
                                    <TrendingUp className="h-8 w-8 text-green-600" />
                                </div>
                                <Progress value={data.stats.approvalPercentage} className="w-full" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Métricas adicionales */}
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle className="text-blue-700">Resumen de Estados</CardTitle>
                            <CardDescription>Distribución de estados de las preinscripciones</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-yellow-600" />
                                    <span className="text-sm">Pendientes</span>
                                </div>
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                    {data.stats.pending}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-sm">Aprobadas</span>
                                </div>
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    {data.stats.approved}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <XCircle className="h-4 w-4 text-red-600" />
                                    <span className="text-sm">Rechazadas</span>
                                </div>
                                <Badge variant="secondary" className="bg-red-100 text-red-800">
                                    {data.stats.rejected}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {/* Preinscripciones por país */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-700">Preinscripciones por País</CardTitle>
                            <CardDescription>Distribución geográfica de las preinscripciones</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.preInscriptionsByCountry.length > 0 ? (
                                    data.preInscriptionsByCountry.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm font-medium">{item.country}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-muted-foreground">{item.quantity}</span>
                                                <div className="w-16">
                                                    <Progress value={item.percentage} className="h-2" />
                                                </div>
                                                <span className="text-xs text-muted-foreground w-10">{item.percentage}%</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        No hay datos disponibles
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preinscripciones por estaca */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-700">Preinscripciones por Estaca</CardTitle>
                            <CardDescription>Distribución por estaca de las preinscripciones</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.preInscriptionsByStake.length > 0 ? (
                                    data.preInscriptionsByStake.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Briefcase className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm font-medium">{item.stake}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-muted-foreground">{item.quantity}</span>
                                                <div className="w-16">
                                                    <Progress value={item.percentage} className="h-2" />
                                                </div>
                                                <span className="text-xs text-muted-foreground w-10">{item.percentage}%</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        No hay datos disponibles
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preinscripciones por modalidad */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-700">Preferencia de Modalidad</CardTitle>
                            <CardDescription>Distribución por modalidad de curso preferida</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.preInscriptionsByModality.length > 0 ? (
                                    data.preInscriptionsByModality.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <GraduationCap className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm font-medium">{item.modality}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-muted-foreground">{item.quantity}</span>
                                                <div className="w-16">
                                                    <Progress value={item.percentage} className="h-2" />
                                                </div>
                                                <span className="text-xs text-muted-foreground w-10">{item.percentage}%</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        No hay datos disponibles
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Resumen de acciones pendientes */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-blue-700">Acciones Pendientes</CardTitle>
                        <CardDescription>Preinscripciones que requieren atención inmediata</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex items-center space-x-4 rounded-lg border p-4">
                                <Clock className="h-8 w-8 text-yellow-600" />
                                <div>
                                    <p className="text-sm font-medium">Preinscripciones pendientes</p>
                                    <p className="text-2xl font-bold text-yellow-600">{data.stats.pending}</p>
                                    <p className="text-xs text-muted-foreground">Requieren evaluación</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-lg border p-4">
                                <GraduationCap className="h-8 w-8 text-blue-600" />
                                <div>
                                    <p className="text-sm font-medium">Nuevas esta semana</p>
                                    <p className="text-2xl font-bold text-blue-600">{data.stats.newThisWeek}</p>
                                    <p className="text-xs text-muted-foreground">Recién recibidas</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 rounded-lg border p-4">
                                <TrendingUp className="h-8 w-8 text-green-600" />
                                <div>
                                    <p className="text-sm font-medium">Tasa de aprobación</p>
                                    <p className="text-2xl font-bold text-green-600">{data.stats.approvalPercentage}%</p>
                                    <p className="text-xs text-muted-foreground">Preinscripciones aprobadas</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
