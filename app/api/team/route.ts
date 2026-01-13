import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { TeamMember } from '@/types/team';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const prisma = getPrisma();
    const teamMembers = await prisma.teamMember.findMany();

    // Transform database model to app model
    const transformed: TeamMember[] = teamMembers.map((member: any) => ({
      id: member.id,
      name: { en: member.nameEn, ar: member.nameAr },
      role: { en: member.roleEn, ar: member.roleAr },
      roleType: member.roleType as any,
      desc: { en: member.descEn, ar: member.descAr },
      details: { en: member.detailsEn, ar: member.detailsAr },
    }));

    // Define priority order: owner, cto, pm, then others
    const roleOrder: Record<string, number> = {
      owner: 1,
      cto: 2,
      pm: 3,
      design: 4,
      frontend: 5,
      backend: 6,
      mobile: 7,
      support: 8,
    };
    
    // Sort: leadership roles first (owner, co-founder, cto, pm), then by original ID
    const sorted = transformed.sort((a, b) => {
      const orderA = roleOrder[a.roleType] || 999;
      const orderB = roleOrder[b.roleType] || 999;
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      // If same role type, maintain original order by ID
      return parseInt(a.id) - parseInt(b.id);
    });
    
    return NextResponse.json(sorted);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const memberData: Omit<TeamMember, 'id'> = await request.json();
    
    const prisma = getPrisma();
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
