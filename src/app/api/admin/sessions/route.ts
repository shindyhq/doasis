import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/services/admin.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const month = parseInt(searchParams.get('month') || new Date().getMonth().toString());
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());

    const sessions = await adminService.getSessions(month, year);
    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Session Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}
