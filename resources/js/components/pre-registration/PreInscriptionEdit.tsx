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

const PreInscriptionEdit = ({ preInscription }: { preInscription: PreInscription }) => {
    const defaultValues = {
        ...preInscription,
        gender: preInscription.gender?.name ?? '',
        marital_status: preInscription.marital_status?.name ?? '',
        country: preInscription.country?.name ?? '',
        stake: preInscription.stake?.name ?? '',
        job_type_preference: preInscription.job_type_preference?.name ?? '',
        status: preInscription.status?.name ?? '',
    };

    const form = useForm({
        defaultValues,
    });

    const onSubmit = (data: any) => {
        console.log('Datos actualizados:', data);
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
                    <Card className="border-blue-200">
                        <CardHeader className="bg-transparent">
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
                                                    <SelectItem value="Masculino">Masculino</SelectItem>
                                                    <SelectItem value="Femenino">Femenino</SelectItem>
                                                    <SelectItem value="Otro">Otro</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                                    <SelectItem value="Soltero/a">Soltero/a</SelectItem>
                                                    <SelectItem value="Casado/a">Casado/a</SelectItem>
                                                    <SelectItem value="Divorciado/a">Divorciado/a</SelectItem>
                                                    <SelectItem value="Viudo/a">Viudo/a</SelectItem>
                                                </SelectContent>
                                            </Select>
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

                    <Card className="border-blue-200">
                        <CardHeader className="bg-transparent">
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
                                                    <SelectItem value="México">México</SelectItem>
                                                    <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                                                    <SelectItem value="Colombia">Colombia</SelectItem>
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
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                        <CardHeader className="bg-transparent">
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
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                        <CardHeader className="bg-transparent">
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
                                                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                                                    <SelectItem value="Aprobado">Aprobado</SelectItem>
                                                    <SelectItem value="Rechazado">Rechazado</SelectItem>
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
