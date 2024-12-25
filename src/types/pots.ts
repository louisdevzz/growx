export interface Pot {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed';
  amount: number;
  target?: number;
  daysLeft?: number;
  link?: string;
} 