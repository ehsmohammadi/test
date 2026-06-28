import { useState, useCallback } from 'react';
import { calculatorApi } from '../api/calculatorApi';
import type { AngleMode, LogEntry, HistoryEntry, Operator } from '../types/calculator';

const TRIG_FNS = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'] as const;
type TrigFn = typeof TRIG_FNS[number];
type UnaryFn = 'sqrt' | 'square' | 'abs' | 'negate' | 'percent' | 'reciprocal' | 'log' | 'ln' | TrigFn;

const OP_LABELS: Record<Operator, string> = {
  add: '+', subtract: '−', multiply: '×', divide: '÷', power: '^',
};

const FN_LABELS: Record<UnaryFn, string> = {
  sin: 'sin', cos: 'cos', tan: 'tan',
  asin: 'sin⁻¹', acos: 'cos⁻¹', atan: 'tan⁻¹',
  log: 'log', ln: 'ln', sqrt: '√', square: 'sqr',
  abs: '|x|', negate: '±', percent: '%', reciprocal: '1/',
};

function fmt(n: number): string {
  return String(parseFloat(n.toFixed(10)));
}

let idCounter = 0;

export function useCalculator() {
  const [display, setDisplay]       = useState('0');
  const [expression, setExpression] = useState('');
  const [isError, setIsError]       = useState(false);
  const [isLoading, setIsLoading]   = useState(false);
  const [prev, setPrev]             = useState('');
  const [operator, setOperator]     = useState<Operator | null>(null);
  const [resetNext, setResetNext]   = useState(false);
  const [angleMode, setAngleMode]   = useState<AngleMode>('Deg');
  const [log, setLog]               = useState<LogEntry[]>([]);
  const [history, setHistory]       = useState<HistoryEntry[]>([]);

  const pushLog = useCallback((entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
    setLog(l => [{ ...entry, id: ++idCounter, timestamp: new Date() }, ...l].slice(0, 30));
  }, []);

  const pushHistory = useCallback((expression: string, value: number) => {
    setHistory(h => [{ id: ++idCounter, expression, value }, ...h].slice(0, 50));
  }, []);

  const applyResult = useCallback((value: number, expr: string, addToHistory = true) => {
    const str = fmt(value);
    setDisplay(str);
    setExpression(expr);
    setIsError(false);
    setResetNext(true);
    if (addToHistory) pushHistory(expr, value);
  }, [pushHistory]);

  const applyError = useCallback((msg: string) => {
    setDisplay(msg);
    setIsError(true);
    setResetNext(true);
  }, []);

  // ── Input handlers ───────────────────────────────────────────────────────
  const digit = useCallback((d: string) => {
    if (isError) return;
    setDisplay(cur => {
      if (resetNext) { setResetNext(false); return d; }
      return cur === '0' ? d : cur + d;
    });
    setIsError(false);
  }, [isError, resetNext]);

  const dot = useCallback(() => {
    if (isError) return;
    if (resetNext) { setDisplay('0.'); setResetNext(false); return; }
    setDisplay(cur => cur.includes('.') ? cur : cur + '.');
  }, [isError, resetNext]);

  const clear = useCallback(() => {
    setDisplay('0'); setExpression('');
    setIsError(false); setIsLoading(false);
    setPrev(''); setOperator(null); setResetNext(false);
  }, []);

  const backspace = useCallback(() => {
    if (isError || resetNext) return;
    setDisplay(cur => cur.length > 1 ? cur.slice(0, -1) : '0');
  }, [isError, resetNext]);

  const insertConst = useCallback((value: number, label: string) => {
    setDisplay(fmt(value));
    setExpression(label);
    setResetNext(true);
    setIsError(false);
  }, []);

  // ── Operator ─────────────────────────────────────────────────────────────
  const setOp = useCallback((op: Operator) => {
    if (isError) return;
    setDisplay(cur => {
      setPrev(resetNext ? prev : cur);
      return cur;
    });
    if (!resetNext) setPrev(display);
    setOperator(op);
    setResetNext(true);
    setExpression(`${resetNext ? prev : display} ${OP_LABELS[op]}`);
  }, [isError, display, prev, resetNext]);

  // ── Calculate ────────────────────────────────────────────────────────────
  const calculate = useCallback(async (chained = false) => {
    if (!operator || !prev) return;
    const a = parseFloat(prev), b = parseFloat(display);
    const label = !chained
      ? `${prev} ${OP_LABELS[operator]} ${display}`
      : expression;

    let result;
    if (operator === 'power') {
      result = await calculatorApi.power(a, b);
    } else {
      result = await (calculatorApi[operator] as (a: number, b: number) => ReturnType<typeof calculatorApi.add>)(a, b);
    }

    pushLog({ endpoint: operator, request: operator === 'power' ? { base: a, exponent: b } : { a, b }, response: result.data, ms: result.ms });
    setIsLoading(false);

    if (result.data.success && result.data.value !== null) {
      if (!chained) {
        setExpression(`${label} =`);
        pushHistory(`${label}`, result.data.value);
      }
      setDisplay(fmt(result.data.value));
      setIsError(false);
    } else {
      applyError(result.data.error ?? 'Error');
    }

    setOperator(null);
    setPrev('');
    setResetNext(true);
  }, [operator, prev, display, expression, pushLog, pushHistory, applyError]);

  // ── Scientific ───────────────────────────────────────────────────────────
  const callUnary = useCallback(async (fn: UnaryFn) => {
    if (isError) return;
    const x = parseFloat(display);
    const label = `${FN_LABELS[fn]}(${x})`;
    setExpression(label);
    setIsLoading(true);

    let result;
    if ((TRIG_FNS as readonly string[]).includes(fn)) {
      result = await calculatorApi[fn as TrigFn](x, angleMode);
      pushLog({ endpoint: fn, request: { x, mode: angleMode }, response: result.data, ms: result.ms });
    } else {
      result = await (calculatorApi[fn as Exclude<UnaryFn, TrigFn>] as (x: number) => ReturnType<typeof calculatorApi.sqrt>)(x);
      pushLog({ endpoint: fn, request: { x }, response: result.data, ms: result.ms });
    }

    setIsLoading(false);
    if (result.data.success && result.data.value !== null) {
      applyResult(result.data.value, `${label} =`);
    } else {
      applyError(result.data.error ?? 'Error');
    }
  }, [isError, display, angleMode, pushLog, applyResult, applyError]);

  const recallHistory = useCallback((entry: HistoryEntry) => {
    setDisplay(fmt(entry.value));
    setExpression(entry.expression + ' =');
    setIsError(false);
    setResetNext(true);
  }, []);

  return {
    display, expression, isError, isLoading,
    angleMode, setAngleMode,
    log, history,
    digit, dot, clear, backspace, insertConst,
    setOp, calculate, callUnary,
    recallHistory,
  };
}
