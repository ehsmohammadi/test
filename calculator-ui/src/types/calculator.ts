export type AngleMode = 'Deg' | 'Rad';

export interface ApiResult {
  success: boolean;
  value: number | null;
  error: string | null;
}

export interface LogEntry {
  id: number;
  endpoint: string;
  request: Record<string, unknown>;
  response: ApiResult;
  ms: number;
  timestamp: Date;
}

export interface HistoryEntry {
  id: number;
  expression: string;
  value: number;
}

export type Operator = 'add' | 'subtract' | 'multiply' | 'divide' | 'power';
