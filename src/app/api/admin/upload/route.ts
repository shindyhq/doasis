import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const clientId = formData.get('clientId') as string;

    if (!file || !clientId) {
      return NextResponse.json({ error: 'File and Client ID are required' }, { status: 400 });
    }

    console.log(`Mock Upload: ${file.name} for client ${clientId}`);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ 
      success: true, 
      data: {
        file_name: file.name,
        file_url: `https://mock-storage.supabase.co/v1/object/public/documents/${clientId}/${file.name}`,
        uploaded_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload document' }, { status: 500 });
  }
}
