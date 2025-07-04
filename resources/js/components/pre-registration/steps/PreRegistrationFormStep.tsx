import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { PreRegistrationFormData } from '../../../types/forms';
import { Enums } from '@/types/global';
import SearchableSelect from '@/components/ui/searchable-select';

interface PreRegistrationFormStepProps {
    onNext: (data: PreRegistrationFormData) => void;
    onBack: () => void;
    stakes: { id: number; name: string, country_id: number }[]
    countries: { id: number; name: string; code: string }[]
}

export function PreRegistrationFormStep({ onNext, onBack, stakes, countries }: PreRegistrationFormStepProps) {
    const { enums } = usePage<{ enums: Enums }>().props;

    const [formData, setFormData] = useState<PreRegistrationFormData>({
        first_name: '',
        middle_name: '',
        last_name: '',
        second_last_name: '',
        gender: '0',
        age: '',
        country_id: '0',
        phone: '',
        stake_id: '0',
        email: '',
        marital_status: '0',
        served_mission: '',
        selected_course: '',
    });

    // Validación defensiva para evitar errores
    if (!enums || !enums.gender || !enums.maritalStatus) {
        return (
            <div className="mx-auto max-w-3xl">
                <Card className="border-2">
                    <CardContent className="p-6">
                        <p className="text-center text-muted-foreground">Cargando formulario...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid()) {
            console.log('Datos de pre-inscripción (JSON):', JSON.stringify(formData, null, 2));
            onNext(formData);
        }
    };

    const isFormValid = () => {
        const requiredFields = [
            'first_name',
            'last_name',
            'age',
            'country_id',
            'phone',
            'stake_id',
            'email',
            'served_mission',
        ];
        const isBasicFieldsValid = requiredFields.every((field) => {
            const value = formData[field as keyof PreRegistrationFormData];
            return value !== undefined && value !== null && value.toString().trim() !== '' && value.toString() !== '0';
        });
        const isGenderValid = formData.gender !== '0' && formData.gender !== '';
        const isMaritalStatusValid = formData.marital_status !== '0' && formData.marital_status !== '';

        return isBasicFieldsValid && isGenderValid && isMaritalStatusValid;
    };

    const updateFormData = (field: keyof PreRegistrationFormData, value: string) => {
        setFormData((prev) => {
            const updated = { ...prev, [field]: value };
            // Validación específica para el campo de teléfono no funciona

            // Si se cambia el país, actualizar el código de teléfono y resetear la estaca
            /* if (field === 'country_id') {
                const selected = countries.find((c) => c.id.toString() === value);
                if (selected && selected.code) {
                    const code = selected.code;
                    if (!updated.phone.startsWith(code)) {
                        updated.phone = `${code} `;
                    }
                }
                // Resetear la estaca cuando se cambia el país
                updated.stake_id = '0';
            } */

            return updated;
        });
    };

    return (
        <div className="mx-auto max-w-3xl">
            <Card className="border-2">
                <CardHeader className="pb-4 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(46_131_242_/_1)]/10">
                        <UserPlus className="h-8 w-8 text-[rgb(46_131_242_/_1)]" />
                    </div>
                    <CardTitle className="text-funval-blue text-2xl font-bold text-[rgb(46_131_242_/_1)]">Formulario de Pre-inscripción</CardTitle>
                    <p className="text-muted-foreground mt-2">Completa tus datos personales para el proceso de inscripción</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Todos los inputs de nombres */}
                            <InputGroup id="first_name" label="Primer nombre" value={formData.first_name} onChange={updateFormData} required />
                            <InputGroup id="middle_name" label="Segundo nombre" value={formData.middle_name} onChange={updateFormData} />
                            <InputGroup id="last_name" label="Apellido" value={formData.last_name} onChange={updateFormData} required />
                            <InputGroup id="second_last_name" label="Segundo apellido" value={formData.second_last_name} onChange={updateFormData} />

                            {/* Género */}
                            <div>
                                <Label htmlFor="gender">Género *</Label>
                                <Select value={formData.gender === '0' ? '' : formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar género" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enums.gender.map(gender => (
                                            <SelectItem key={gender.id} value={gender.id.toString()}>
                                                {gender.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Edad */}
                            <InputGroup
                                id="age"
                                label="Edad"
                                value={formData.age}
                                onChange={updateFormData}
                                type="number"
                                min="18"
                                max="100"
                                required
                            />

                            {/* País */}
                            <div>
                                <Label htmlFor="country_id">País *</Label>
                                <SearchableSelect
                                    data={countries}
                                    id="country_id"
                                    name="country_id"
                                    value={formData.country_id === '0' ? '' : formData.country_id}
                                    searchField="name"
                                    onChange={(value) => updateFormData('country_id', value)}
                                />
                            </div>

                            {/* Teléfono */}
                            <InputGroup id="phone" label="Teléfono" value={formData.phone} onChange={updateFormData} required />

                            {/* Estaca */}
                            <div>
                                <Label htmlFor="stake_id">Estaca/Distrito/Misión *</Label>
                                <Select value={formData.stake_id} onValueChange={(value) => updateFormData('stake_id', value)}>
                                    <SelectTrigger id="stake_id" name="stake_id">
                                        <SelectValue placeholder="Selecciona tu estaca" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {formData.country_id && formData.country_id !== '0' ?
                                            stakes.filter(stake => stake.country_id.toString() === formData.country_id).map((stake) => (
                                                <SelectItem key={stake.id} value={stake.id.toString()}>
                                                    {stake.name}
                                                </SelectItem>
                                            ))
                                            : <SelectItem value="0" disabled>Selecciona un país primero</SelectItem>}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Correo */}
                            <InputGroup id="email" label="Email" value={formData.email} onChange={updateFormData} type="email" required />

                            {/* Estado Civil */}
                            <div>
                                <Label htmlFor="marital_status">Estado civil *</Label>
                                <Select value={formData.marital_status === '0' ? '' : formData.marital_status} onValueChange={(value) => updateFormData('marital_status', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona estado civil" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enums.maritalStatus.map(status => (
                                            <SelectItem key={status.id} value={status.id.toString()}>
                                                {status.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Misión */}
                        <div>
                            <Label className="text-base font-medium">¿Has servido una misión? *</Label>
                            <RadioGroup
                                value={formData.served_mission}
                                onValueChange={(value) => updateFormData('served_mission', value)}
                                className="mt-2 flex flex-row space-x-6"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="mission-yes" />
                                    <Label htmlFor="mission-yes">Si</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="mission-no" />
                                    <Label htmlFor="mission-no">No</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Botones */}
                        <div className="flex justify-between pt-4">
                            <Button type="button" onClick={onBack} variant="outline" size="lg" className="min-w-[120px]">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Anterior
                            </Button>

                            <Button
                                type="submit"
                                disabled={!isFormValid()}
                                size="lg"
                                className="min-w-[200px] bg-[rgb(46_131_242_/1)] text-white transition-colors hover:bg-[rgb(46_131_242/_1)]/90"
                            >
                                Continuar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

// InputGroup helper
function InputGroup({
    id,
    label,
    value,
    onChange,
    type = 'text',
    required = false,
    min,
    max,
    ...rest
}: {
    id: keyof PreRegistrationFormData;
    label: string;
    value: string;
    onChange: (field: keyof PreRegistrationFormData, value: string) => void;
    type?: string;
    required?: boolean;
    min?: string;
    max?: string;
}) {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                name={id}
                value={value}
                onChange={(e) => onChange(id, e.target.value)}
                type={type}
                required={required}
                min={min}
                max={max}
                {...rest}
            />
        </div>
    );
}
