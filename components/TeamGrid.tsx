'use client';

import { TeamMember } from '@/types/team';
import TeamCard from './TeamCard';

interface TeamGridProps {
  members: TeamMember[];
  onMemberClick: (member: TeamMember) => void;
}

export default function TeamGrid({ members, onMemberClick }: TeamGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[26px]">
      {members.map((member, index) => (
        <TeamCard
          key={member.id}
          member={member}
          index={index}
          onClick={() => onMemberClick(member)}
        />
      ))}
    </div>
  );
}
