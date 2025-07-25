import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Reference } from '../../types/reference';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CompleteDialog } from '../ui/complete-dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type FormValues = {
    name: string;
    gender: { id: number; name: string };
    country: { id: number; name: string };
    phone: string;
    stake: { id: number; name: string };
    referrer_name: string;
    referrer_phone: string;
    relationship_with_referred: { id: number; name: string };
    created_at: string;
    status: { id: number; name: string };
    declined_reason?: { id: number; name: string };
};

type Props = {
    reference: Reference;
    onSave?: (updated: Reference) => void;
    enums?: {
        gender?: Array<{ id: number; name: string }>;
        country?: Array<{ id: number; name: string }>;
        stake?: Array<{ id: number; name: string }>;
        relationship?: Array<{ id: number; name: string }>;
        status?: Array<{ id: number; name: string }>;
        declinedReasons?: Array<{ id: number; name: string }>;
    };
};

const ReferenceEdit = ({ reference, onSave, enums }: Props) => {
    const form = useForm<FormValues>({
        defaultValues: {
            name: reference.name || '',
            gender: reference.gender || { id: 0, name: 'not-selected' },
            country: reference.country || { id: 0, name: 'not-selected' },
            phone: reference.phone || '',
            stake: reference.stake || { id: 0, name: 'not-selected' },
            referrer_name: reference.referrer_name || '',
            referrer_phone: reference.referrer_phone || '',
            relationship_with_referred: reference.relationship_with_referred || { id: 0, name: 'not-selected' },
            created_at: reference.created_at ? new Date(reference.created_at).toISOString().substr(0, 10) : '',
            status: reference.status || { id: 0, name: 'not-selected' },
            declined_reason: reference.declined_reason || undefined,
        },
    });

    const onSubmit = (data: FormValues) => {
        const updatedReference: Reference = {
            ...reference,
            ...data,
            created_at: data.created_at ? new Date(data.created_at).toISOString() : reference.created_at,
        };
        if (onSave) onSave(updatedReference);
    };

    const selectedStatus = form.watch('status');

    return (
        <CompleteDialog
            btnLabel="Editar"
            dialogTitle="Editar Referencia"
            dialogDescription="Modifica los detalles de la referencia seleccionada."
            icon={<Pencil className="h-4 w-4" />}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid max-h-[80vh] gap-6 overflow-y-auto py-4">
                    {/* --- Persona Referida --- */}
                    <Card className="border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Persona Referida</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <FormField
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Nombre Completo</Label>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="gender.name"
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
                                                            <SelectItem key={g.id} value={g.name}>
                                                                {g.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="no-options" disabled>
                                                            No hay opciones disponibles
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="phone"
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

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    name="country.name"
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
                                                            <SelectItem key={c.id} value={c.name}>
                                                                {c.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="no-options" disabled>
                                                            No hay opciones disponibles
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="stake.name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Estaca</Label>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona estaca" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {enums?.stake?.length ? (
                                                        enums.stake.map((s) => (
                                                            <SelectItem key={s.id} value={s.name}>
                                                                {s.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="no-options" disabled>
                                                            No hay opciones disponibles
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

                    {/* --- Información del Referente --- */}
                    <Card className="border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Información del Referente</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <FormField
                                name="referrer_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Nombre Completo</Label>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="referrer_phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Teléfono</Label>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="relationship_with_referred.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Relación con la persona referida</Label>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona relación" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {enums?.relationship?.length ? (
                                                    enums.relationship.map((r) => (
                                                        <SelectItem key={r.id} value={r.name}>
                                                            {r.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="no-options" disabled>
                                                        No hay opciones disponibles
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* --- Estado y Seguimiento --- */}
                    <Card className="border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Estado y Seguimiento</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <FormField
                                name="created_at"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Fecha de Creación</Label>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="status.name"
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
                                                {enums?.status?.length ? (
                                                    enums.status.map((s) => (
                                                        <SelectItem key={s.id} value={s.name}>
                                                            {s.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="no-options" disabled>
                                                        No hay opciones disponibles
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            {selectedStatus?.name?.toLowerCase() === 'rechazado' && (
                                <FormField
                                    name="declined_reason.name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label>Razón del Rechazo</Label>
                                            <Select onValueChange={field.onChange} value={field.value || 'not-specified'}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona razón" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {enums?.declinedReasons?.length ? (
                                                        enums.declinedReasons.map((d) => (
                                                            <SelectItem key={d.id} value={d.name}>
                                                                {d.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem value="not-specified">No especificado</SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            )}
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

export default ReferenceEdit;
