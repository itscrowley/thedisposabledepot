'use server'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  // ✅ FIX: 'await' added before cookies()
  (await cookies()).delete('admin_token');
  redirect('/admin/login');
}
