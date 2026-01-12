import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { TeamMember } from '@/types/team';

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { id: 'asc' },
    });
    
    // Transform database model to app model
    const transformed: TeamMember[] = teamMembers.map((member) => ({
      id: member.id,
      name: { en: member.nameEn, ar: member.nameAr },
      role: { en: member.roleEn, ar: member.roleAr },
      roleType: member.roleType as any,
      desc: { en: member.descEn, ar: member.descAr },
      details: { en: member.detailsEn, ar: member.detailsAr },
    }));
    
    return NextResponse.json(transformed);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const memberData: Omit<TeamMember, 'id'> = await request.json();
    
    const newMember = await prisma.teamMember.create({
      data: {
        nameEn: memberData.name.en,
        nameAr: memberData.name.ar,
        roleEn: memberData.role.en,
        roleAr: memberData.role.ar,
        roleType: memberData.roleType,
        descEn: memberData.desc.en,
        descAr: memberData.desc.ar,
        detailsEn: memberData.details.en,
        detailsAr: memberData.details.ar,
      },
    });
    
    const transformed: TeamMember = {
      id: newMember.id,
      name: { en: newMember.nameEn, ar: newMember.nameAr },
      role: { en: newMember.roleEn, ar: newMember.roleAr },
      roleType: newMember.roleType as any,
      desc: { en: newMember.descEn, ar: newMember.descAr },
      details: { en: newMember.detailsEn, ar: newMember.detailsAr },
    };
    
    return NextResponse.json(transformed, { status: 201 });
  } catch (error) {
    console.error('Error adding team member:', error);
    return NextResponse.json({ error: 'Failed to add team member' }, { status: 500 });
  }
}
