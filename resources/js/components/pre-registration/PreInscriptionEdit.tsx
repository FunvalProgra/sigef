import { Enums } from '@/types/global';
import { usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { type PreInscription } from '../../types/pre-inscription';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CompleteDialog } from '../ui/complete-dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type FormValues = {
    first_name: string;
    middle_name?: string;
    last_name: string;
    second_last_name?: string;
    gender: string;
    age?: number;
    marital_status: string;
    email: string;
    phone?: string;
    country: string;
    stake?: string;
    served_mission: boolean;
    currently_working: boolean;
    available_full_time: boolean;
    job_type_preference: string;
    status: string;
    comments?: string;
};

interface PreInscriptionEditProps {
    preInscription: PreInscription;
    countries: Array<{ id: number; name: string }>;
    stakes: Array<{ id: number; name: string; country_id: number }>;
}

const PreInscriptionEdit = ({ preInscription, countries = [], stakes = [] }: PreInscriptionEditProps) => {
    const { enums } = usePage<{ enums: Enums }>().props;

    const defaultValues: FormValues = {
        first_name: preInscription.first_name ?? '',
        middle_name: preInscription.middle_name ?? '',
        last_name: preInscription.last_name ?? '',
        second_last_name: preInscription.second_last_name ?? '',
        gender: preInscription.gender?.id?.toString() ?? '',
        age: preInscription.age ?? undefined,
        marital_status: preInscription.marital_status?.id?.toString() ?? '',
        email: preInscription.email ?? '',
        phone: preInscription.phone ?? '',
        country: preInscription.country?.id?.toString() ?? '',
        stake: preInscription.stake?.id?.toString() ?? '',
        served_mission: preInscription.served_mission ?? false,
        currently_working: preInscription.currently_working ?? false,
        available_full_time: preInscription.available_full_time ?? false,
        job_type_preference: preInscription.job_type_preference?.id?.toString() ?? '',
        status: preInscription.status?.id?.toString() ?? '',
        comments: preInscription.comments ?? '',
    };

    const form = useForm<FormValues>({ defaultValues });

    // Filtrar estacas basadas en el país seleccionado
    const selectedCountry = form.watch('country');
    const filteredStakes = selectedCountry ? stakes.filter((stake) => stake.country_id === Number(selectedCountry)) : [];

    const onSubmit = (data: FormValues) => {
        console.log('Datos actualizados:', data);
        // Aquí agregar la lógica para enviar los datos al backend o actualizar estado
    };
    return (
        <CompleteDialog
            btnLabel="Editar"
            dialogTitle="Editar Pre-inscripción"
            dialogDescription="Modifica los detalles de la pre-inscripción seleccionada."
            icon={<Pencil className="h-4 w-4" />}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid max-h-[80vh] gap-6 overflow-y-auto py-4">
                    {/* --- Información Personal --- */}
                    <Card className="border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Información Personal</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="first_name"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Nombre</Label>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="middle_name"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Segundo Nombre</Label>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="last_name"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Apellido</Label>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="second_last_name"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Segundo Apellido</Label>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="gender"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Género</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona género" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {enums?.gender?.length ? (
                                                        enums.gender.map((g) => (
                                                            <SelectItem key={g.id} value={g.id.toString()}>
                                                                {g.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="none" disabled>
                                                            No hay opciones
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="age"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Edad</Label>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="marital_status"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Estado Civil</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona estado civil" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {enums?.maritalStatus?.length ? (
                                                        enums.maritalStatus.map((m) => (
                                                            <SelectItem key={m.id} value={m.id.toString()}>
                                                                {m.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="none" disabled>
                                                            No hay opciones
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="email"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Email</Label>
                                            <FormControl>
                                                <Input type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="phone"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Teléfono</Label>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- Ubicación --- */}
                    <Card className="border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Ubicación</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="country"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>País</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona país" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {enums?.country?.length ? (
                                                        enums.country.map((c) => (
                                                            <SelectItem key={c.id} value={c.id.toString()}>
                                                                {c.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="none" disabled>
                                                            No hay opciones
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="stake"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Estaca</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona país" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {enums?.stake?.length ? (
                                                        enums.country.map((c) => (
                                                            <SelectItem key={c.id} value={c.id.toString()}>
                                                                {c.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="none" disabled>
                                                            No hay opciones
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- Info Laboral y Servicio --- */}
                    <Card className="border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Información Laboral y de Servicio</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="served_mission"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>¿Sirvió misión?</Label>
                                            <Select onValueChange={(val) => field.onChange(val === 'true')} value={field.value ? 'true' : 'false'}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona opción" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="true">Sí</SelectItem>
                                                    <SelectItem value="false">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="currently_working"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>¿Trabajando actualmente?</Label>
                                            <Select onValueChange={(val) => field.onChange(val === 'true')} value={field.value ? 'true' : 'false'}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona opción" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="true">Sí</SelectItem>
                                                    <SelectItem value="false">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="available_full_time"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Disponibilidad</Label>
                                            <Select onValueChange={(val) => field.onChange(val === 'true')} value={field.value ? 'true' : 'false'}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona disponibilidad" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="true">Tiempo completo</SelectItem>
                                                    <SelectItem value="false">Tiempo parcial</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="job_type_preference"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Preferencia Laboral</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona preferencia" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {enums?.jobType?.length ? (
                                                        enums.jobType.map((j) => (
                                                            <SelectItem key={j.id} value={j.id.toString()}>
                                                                {j.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="none" disabled>
                                                            No hay opciones
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- Estado y Seguimiento --- */}
                    <Card className="border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Estado y Seguimiento</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Fecha de Solicitud</Label>
                                    <p>{preInscription.created_at ? new Date(preInscription.created_at).toLocaleDateString() : 'N/A'}</p>
                                </div>
                                <FormField
                                    name="status"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Estado Actual</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona estado" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {enums?.statusEnum?.length ? (
                                                        enums.statusEnum.map((s) => (
                                                            <SelectItem key={s.id} value={s.id.toString()}>
                                                                {s.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="none" disabled>
                                                            No hay opciones
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                name="comments"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Comentarios</Label>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Botones */}
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button">
                            Cancelar
                        </Button>
                        <Button type="submit">Guardar Cambios</Button>
                    </div>
                </form>
            </Form>
        </CompleteDialog>
    );
};

export default PreInscriptionEdit;
