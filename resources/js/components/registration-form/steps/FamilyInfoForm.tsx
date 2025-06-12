import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormContext } from '@/context/FormContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Define validation schema for family info
const familyInfoSchema = z.object({
  children_count: z.string()
    .refine(val => !val || /^\d+$/.test(val), {
      message: "Debe ser un número",
    })
    .optional(),
  household_members: z.string()
    .refine(val => !val || /^\d+$/.test(val), {
      message: "Debe ser un número",
    })
    .optional(),
});

export const FamilyInfoForm: React.FC = () => {
  const { formData, updateFormSection } = useFormContext();

  // Initialize form with current data
  const form = useForm({
    resolver: zodResolver(familyInfoSchema),
    defaultValues: formData.familyInfo,
  });

  // On form changes, update context
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormSection('familyInfo', value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateFormSection]);

  return (
    <Form {...form}>
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-xl font-semibold text-gray-800">Información Familiar</h2>
        <p className="text-muted-foreground">Por favor proporcione información sobre su situación familiar.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="children_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Hijos</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="household_members"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Miembros del Hogar</FormLabel>
                <FormControl>
                  <Input type="number" min="1" placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  );
};
