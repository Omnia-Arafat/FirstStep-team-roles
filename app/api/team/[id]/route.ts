import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { TeamMember } from '@/types/team';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updatedMember: TeamMember = await request.json();

    const prisma = getPrisma();
    const result = await prisma.teamMember.update({
      where: { id },
      data: {
        nameEn: updatedMember.name.en,
        nameAr: updatedMember.name.ar,
        roleEn: updatedMember.role.en,
        roleAr: updatedMember.role.ar,
        roleType: updatedMember.roleType,
        descEn: updatedMember.desc.en,
        descAr: updatedMember.desc.ar,
        detailsEn: updatedMember.details.en,
        detailsAr: updatedMember.details.ar,
      },
    });

    const transformed: TeamMember = {
      id: result.id,
      name: { en: result.nameEn, ar: result.nameAr },
      role: { en: result.roleEn, ar: result.roleAr },
      roleType: result.roleType as any,
      desc: { en: result.descEn, ar: result.descAr },
      details: { en: result.detailsEn, ar: result.detailsAr },
    };

    return NextResponse.json(transformed);
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error updating team member:', message);
    return NextResponse.json({ error: 'Failed to update team member', details: message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prisma = getPrisma();
    await prisma.teamMember.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error deleting team member:', message);
    return NextResponse.json({ error: 'Failed to delete team member', details: message }, { status: 500 });
  }
}
