import { teamData } from './teamData';
import { TeamMember } from '@/types/team';

// In-memory storage for team data
// This will be shared across API routes
// For production, replace with a real database
class TeamStore {
  private data: TeamMember[];

  constructor() {
    this.data = [...teamData];
  }

  getAll(): TeamMember[] {
    return this.data;
  }

  getById(id: string): TeamMember | undefined {
    return this.data.find((m) => m.id === id);
  }

  update(id: string, updatedMember: TeamMember): TeamMember | null {
    const index = this.data.findIndex((m) => m.id === id);
    if (index === -1) return null;
    
    this.data[index] = updatedMember;
    return updatedMember;
  }

  add(memberData: Omit<TeamMember, 'id'>): TeamMember {
    const newId = (Math.max(...this.data.map(m => parseInt(m.id)), 0) + 1).toString();
    const newMember: TeamMember = {
      id: newId,
      ...memberData,
    };
    this.data.push(newMember);
    return newMember;
  }

  delete(id: string): boolean {
    const index = this.data.findIndex((m) => m.id === id);
    if (index === -1) return false;
    
    this.data.splice(index, 1);
    return true;
  }

  reset() {
    this.data = [...teamData];
  }
}

// Singleton instance
export const teamStore = new TeamStore();
