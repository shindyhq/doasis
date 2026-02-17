import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/services/admin.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, type, data } = body;

    if (type === 'service') {
      await adminService.assignService(clientId, data.serviceName, data.price);
    } else if (type === 'link') {
      await adminService.assignLink(clientId, data.link);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Assignment Error:', error);
    return NextResponse.json({ error: 'Failed to save assignment' }, { status: 500 });
  }
}
