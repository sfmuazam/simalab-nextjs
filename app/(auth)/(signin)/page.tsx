import { SignInViewPage } from '@/sections/auth/view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SIMALAB | Login',
};

export default function Page() {
  return <SignInViewPage />;
}
