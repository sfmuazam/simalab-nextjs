'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useTransition, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import ky from 'ky'
// Schema validasi formulir menggunakan Zod
const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(3, { message: 'Password must be at least 3 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const defaultValues = {
    email: '',
    password: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  // Fungsi submit formulir
  const onSubmit = async (values: UserFormValue) => {
    startTransition(async () => {
      setError(null);
      try {
        const res = await ky.post('/api/auth/login', { json: values });

        const response: any = await res.json();
        if (response.success) {
          router.push(callbackUrl);
        } else {
          setError(response.error || 'Something went wrong');
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('Something went wrong');
      }
    });
  };

  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </div>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <div className="text-red-500">{error}</div>} {/* Tampilkan pesan error */}
          <Button disabled={loading} className="ml-auto w-full mt-4" type="submit">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
    </Suspense>
  );
}
