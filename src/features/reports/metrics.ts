export interface Metric {
  name: string;
  filters: string[];
}

export const metrics: Metric[] = [
  {
    name: 'Master-O ID',
    filters: ['Count', 'Distinct Count', 'Distinct Value']
  },
  {
    name: 'Content launch date',
    filters: ['Date range', 'Specific date']
  },
  {
    name: 'Challenges',
    filters: ['Status']
  },
  {
    name: 'Completion Status',
    filters: ['Status', 'Status Count', 'Status Percentage', 'Less than', 'Greater than', 'Range']
  },
  {
    name: 'Completion Date',
    filters: ['Date Range', 'Specific date']
  },
  {
    name: 'Completed In Days',
    filters: ['Count', 'Less than', 'Greater']
  },
  {
    name: 'Attempts',
    filters: ['Status']
  },
  {
    name: 'Score',
    filters: ['Count', 'Average', 'Percentage']
  },
  {
    name: 'Max Score',
    filters: ['Count']
  },
  {
    name: 'Time Spent',
    filters: ['Time value', 'Average']
  },
  {
    name: 'Microskill Name',
    filters: ['Count', 'Distinct Count', 'Distinct Value']
  },
  {
    name: 'Login Status',
    filters: ['Status', 'Count']
  },
  {
    name: 'Last Login Date',
    filters: ['Date Range', 'Specific date']
  }
];