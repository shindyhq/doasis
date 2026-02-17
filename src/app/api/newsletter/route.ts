import { NextResponse } from 'next/server';

export async function POST() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return NextResponse.json({ 
    success: true, 
    message: 'Welcome to the sanctuary.' 
  });
}
