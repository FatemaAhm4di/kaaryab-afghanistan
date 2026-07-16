import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from('Opportunity')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('📥 Received:', JSON.stringify(body, null, 2));

    if (body.deadline) {
      body.deadline = new Date(body.deadline).toISOString();
    }

    if (typeof body.requirements === 'string') {
      body.requirements = body.requirements.split('\n').filter(Boolean);
    }
    if (!Array.isArray(body.requirements)) {
      body.requirements = [];
    }

    if (typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
    }
    if (!Array.isArray(body.tags)) {
      body.tags = [];
    }

    console.log('📤 Final:', JSON.stringify(body, null, 2));

    const { data, error } = await supabase
      .from('Opportunity')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase Error:', error);
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Server Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: String(error) },
      { status: 500 }
    );
  }
}