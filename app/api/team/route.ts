import { NextRequest, NextResponse } from 'next/server';
import { teamStore } from '@/data/teamStore';
import { TeamMember } from '@/types/team';

export async function GET() {
  const teamData = teamStore.getAll();
  return NextResponse.json(teamData);
}

export async function POST(request: NextRequest) {
  try {
    const memberData: Omit<TeamMember, 'id'> = await request.json();
    const newMember = teamStore.add(memberData);
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
