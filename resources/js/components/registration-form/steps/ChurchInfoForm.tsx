import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormContext } from '@/context/FormContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { wards } from '@/components/registration-form/data/mockData';

// Define validation schema for church info
const churchInfoSchema = z.object({
  membership_id: z.string().optional(),
  mission_name: z.string().optional(),
  mission_end_year: z.string()
    .refine(val => !val || /^\d{4}$/.test(val), {
      message: "Año de fin debe ser un número de 4 dígitos",
    })
    .optional(),
  temple_sealed: z.boolean().default(false),
  calling: z.string().optional(),
  stake_district_mission: z.string().optional(),
  recruiter_name: z.string().optional(),
  is_active_member: z.boolean().default(false),
  ward_id: z.string().optional(),
});

export const ChurchInfoForm: React.FC = () => {
  const { formData, updateFormSection } = useFormContext();

  // Initialize form with current data
  const form = useForm({
    resolver: zodResolver(churchInfoSchema),
    defaultValues: {
      ...formData.churchInfo,
      is_active_member: formData.personalInfo.is_active_member,
      ward_id: formData.personalInfo.ward_id,
    },
  });

  // On form changes, update context
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      const { is_active_member, ward_id, ...churchInfo } = value;
      updateFormSection('churchInfo', churchInfo);
      updateFormSection('personalInfo', {
        ...formData.personalInfo,
        is_active_member,
        ward_id,
      });
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateFormSection]);

  return (
    <Form {...form}>
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-xl font-semibold text-gray-800">Información de la Iglesia</h2>
        <p className="text-muted-foreground">Por favor proporcione información relacionada con la Iglesia.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="membership_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID de Membresía</FormLabel>
                <FormControl>
                  <Input placeholder="123-4567-890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mission_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la Misión</FormLabel>
                <FormControl>
                  <Input placeholder="Misión México Ciudad de México" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mission_end_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Año de fin de misión</FormLabel>
                <FormControl>
                  <Input placeholder="2022" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="calling"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Llamamiento</FormLabel>
                <FormControl>
                  <Input placeholder="Maestro de Escuela Dominical" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stake_district_mission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estaca/Distrito/Misión</FormLabel>
                <FormControl>
                  <Input placeholder="Estaca Ciudad de México" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recruiter_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Reclutador</FormLabel>
                <FormControl>
                  <Input placeholder="Juan Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="is_active_member"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Miembro Activo de la Iglesia</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {form.watch("is_active_member") && (
            <FormField
              control={form.control}
              name="ward_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barrio</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona barrio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wards.map((ward) => (
                        <SelectItem key={ward.id} value={ward.id}>
                          {ward.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="temple_sealed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Sellado en el Templo</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  );
};
