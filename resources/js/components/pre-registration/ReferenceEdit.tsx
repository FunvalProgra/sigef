import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { Reference } from '../../types/reference';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CompleteDialog } from '../ui/complete-dialog';
import { Label } from '../ui/label';

type Props = {
    reference: Reference;
    onSave?: (updated: Reference) => void;
};

const ReferenceEdit = ({ reference, onSave }: Props) => {
    // Estado local para editar
    const [form, setForm] = useState({ ...reference });

    // Manejador genérico para inputs
    const onChange = (field: keyof Reference, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    // Manejo para campos anidados como gender.name
    const onNestedChange = (field: keyof Reference, nestedField: string, value: any) => {
        setForm((prev) => ({
            ...prev,
            [field]: {
                ...(prev as any)[field],
                [nestedField]: value,
            },
        }));
    };

    const handleSubmit = () => {
        // Aquí puedes llamar a la API para guardar o usar el onSave
        if (onSave) onSave(form);
        // También podrías cerrar modal si CompleteDialog lo permite
    };
    console.log(form);
    return (
        <CompleteDialog
            btnLabel="Editar"
            dialogTitle="Editar"
            dialogDescription="Modifica los campos y guarda los cambios"
            icon={<Pencil className="h-4 w-4" />}
        >
            <div className="grid max-h-[80vh] gap-6 overflow-y-auto py-4">
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Persona Referida</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Nombre Completo</Label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => onChange('name', e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <Label>Género</Label>
                            <input
                                type="text"
                                value={form.gender.name}
                                onChange={(e) => onNestedChange('gender', 'name', e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <Label>País</Label>
                            <input
                                type="text"
                                value={form.country.name}
                                onChange={(e) => onNestedChange('country', 'name', e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <Label>Teléfono</Label>
                            <input
                                type="text"
                                value={form.phone}
                                onChange={(e) => onChange('phone', e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <Label>Estaca</Label>
                            <input
                                type="text"
                                value={form.stake.name}
                                onChange={(e) => onNestedChange('stake', 'name', e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Información del Referente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Nombre Completo</Label>
                            <input
                                type="text"
                                value={form.referrer_name}
                                onChange={(e) => onChange('referrer_name', e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <Label>Teléfono</Label>
                            <input
                                type="text"
                                value={form.referrer_phone}
                                onChange={(e) => onChange('referrer_phone', e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <Label>Relación con la persona referida</Label>
                            <input
                                type="text"
                                value={form.relationship_with_referred.name}
                                onChange={(e) => onNestedChange('relationship_with_referred', 'name', e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Estado y Seguimiento */}
                <Card className="border-blue-200">
                    <CardHeader className="bg-transparent">
                        <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Estado y Seguimiento</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Fecha de Creación</Label>
                            <input
                                type="date"
                                value={form.created_at ? new Date(form.created_at).toISOString().substring(0, 10) : ''}
                                onChange={(e) => onChange('created_at', e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <Label>Estado Actual</Label>
                            <select
                                value={form.status.name}
                                onChange={(e) => onNestedChange('status', 'name', e.target.value)}
                                className="input input-bordered w-full"
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="aprobado">Aprobado</option>
                                <option value="rechazado">Rechazado</option>
                            </select>
                        </div>
                        {form.status.name.toLowerCase() === 'rechazado' && (
                            <div>
                                <Label>Razón del Rechazo</Label>
                                <input
                                    type="text"
                                    value={form.declined_reason?.name || ''}
                                    onChange={(e) => onNestedChange('declined_reason', 'name', e.target.value)}
                                    className="input input-bordered w-full"
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                    <Button onClick={handleSubmit} variant="default">
                        Guardar
                    </Button>
                </div>
            </div>
        </CompleteDialog>
    );
};

export default ReferenceEdit;
