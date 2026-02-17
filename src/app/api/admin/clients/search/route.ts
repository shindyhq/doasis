import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/services/admin.service';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  try {
    const clients = await adminService.searchClients(query);
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Admin Client Search Error:', error);
    return NextResponse.json({ error: 'Failed to search clients' }, { status: 500 });
  }
}
