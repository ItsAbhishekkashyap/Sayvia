// src/app/reset-password/[token]/page.tsx
export const dynamic = "force-dynamic";
import ResetPasswordForm from '@/components/ResetPasswordForm';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
