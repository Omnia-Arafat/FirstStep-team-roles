import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { teamData } from '../data/teamData';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.teamMember.deleteMany();

  // Insert team members
  for (const member of teamData) {
    await prisma.teamMember.create({
      data: {
        id: member.id,
        nameEn: member.name.en,
        nameAr: member.name.ar,
        roleEn: member.role.en,
        roleAr: member.role.ar,
        roleType: member.roleType,
        descEn: member.desc.en,
        descAr: member.desc.ar,
        detailsEn: member.details.en,
        detailsAr: member.details.ar,
      },
    });
  }

  console.log(`Seeded ${teamData.length} team members`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
