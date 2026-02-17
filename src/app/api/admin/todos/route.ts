import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/services/admin.service';

export async function GET() {
  try {
    const todos = await adminService.getTodos();
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, priority } = await req.json();
    // In a real app, save to DB
    console.log('Mock Todo Add:', title, priority);
    return NextResponse.json({ success: true, id: Math.random().toString(36).substr(2, 9) });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add todo' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, completed } = await req.json();
    console.log('Mock Todo Toggle:', id, completed);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    console.log('Mock Todo Delete:', id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}
