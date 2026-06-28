import axios from 'axios';
import type { AngleMode, ApiResult } from '../types/calculator';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
});

async function post<T>(endpoint: string, body: T): Promise<{ data: ApiResult; ms: number }> {
  const t0 = performance.now();
  const res = await api.post<ApiResult>(`/api/calculator/${endpoint}`, body);
  return { data: res.data, ms: Math.round(performance.now() - t0) };
}

export const calculatorApi = {
  // Binary
  add:      (a: number, b: number) => post('add',      { a, b }),
  subtract: (a: number, b: number) => post('subtract', { a, b }),
  multiply: (a: number, b: number) => post('multiply', { a, b }),
  divide:   (a: number, b: number) => post('divide',   { a, b }),
  modulo:   (a: number, b: number) => post('modulo',   { a, b }),
  power:    (base: number, exponent: number) => post('power', { base, exponent }),

  // Unary
  sqrt:       (x: number) => post('sqrt',       { x }),
  square:     (x: number) => post('square',     { x }),
  abs:        (x: number) => post('abs',        { x }),
  negate:     (x: number) => post('negate',     { x }),
  percent:    (x: number) => post('percent',    { x }),
  reciprocal: (x: number) => post('reciprocal', { x }),
  log:        (x: number) => post('log',        { x }),
  ln:         (x: number) => post('ln',         { x }),

  // Trig
  sin:  (x: number, mode: AngleMode) => post('sin',  { x, mode }),
  cos:  (x: number, mode: AngleMode) => post('cos',  { x, mode }),
  tan:  (x: number, mode: AngleMode) => post('tan',  { x, mode }),
  asin: (x: number, mode: AngleMode) => post('asin', { x, mode }),
  acos: (x: number, mode: AngleMode) => post('acos', { x, mode }),
  atan: (x: number, mode: AngleMode) => post('atan', { x, mode }),
};
