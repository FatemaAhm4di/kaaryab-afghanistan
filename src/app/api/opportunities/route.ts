import {createClient} from '@supabase/supabase-js';
import {NextResponse} from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const {data, error} = await supabase
    .from('Opportunity')
    .select('*')
    .order('createdAt', {ascending: false});

  if (error) return NextResponse.json({error: error.message}, {status: 500});
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  const payload = {
    title: body.title,
    organization: body.organization,
    category: body.category,
    location: body.location,
    type: body.type,
    deadline: body.deadline,
    description: body.description,
    requirements: body.requirements,
    applyLink: body.applyLink,
    tags: body.tags,
    featured: body.featured ?? false,
  };

  console.log('POST payload:', payload);

  const {data, error} = await supabase
    .from('Opportunity')
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({error: error.message, details: error}, {status: 500});
  }
  return NextResponse.json(data);
}