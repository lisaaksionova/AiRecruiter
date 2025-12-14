export interface Application {
  id: number;
  appliedAt: Date;
  status: Status;
  matchPercent: number;
  vacancyId: number;
  candidateId: number;
}

export interface ApplicationCreate {
  vacancyId: number;
  candidateId: number;
  status: number;
}

export interface ApplicationUpdate {
  id: number;
  status: Status;
}

export type Status = 'Applied' | 'Interviewing' | 'Offered' | 'Rejected' | 'Hired';

export const statusMap: Record<number, Status> = {
  0: 'Applied',
  1: 'Interviewing',
  2: 'Offered',
  3: 'Rejected',
  4: 'Hired',
};

export const statusReverseMap: Record<Status, number> = {
  'Applied': 0,
  'Interviewing': 1,
  'Offered': 2,
  'Rejected': 3,
  'Hired': 4,
};