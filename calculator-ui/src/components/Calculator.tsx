import { useEffect } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { Display } from './Display';
import { CalcButton } from './CalcButton';
import { ApiLog } from './ApiLog';
import { History } from './History';

export function Calculator() {
  const calc = useCalculator();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') calc.digit(e.key);
      else if (e.key === '.') calc.dot();
      else if (e.key === '+') calc.setOp('add');
      else if (e.key === '-') calc.setOp('subtract');
      else if (e.key === '*') calc.setOp('multiply');
      else if (e.key === '/') { e.preventDefault(); calc.setOp('divide'); }
      else if (e.key === '^') calc.setOp('power');
      else if (e.key === 'Enter' || e.key === '=') calc.calculate();
      else if (e.key === 'Escape') calc.clear();
      else if (e.key === 'Backspace') calc.backspace();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [calc]);

  return (
    <div className="app">
      <h1 className="app-title">
        <span className="title-icon">⟨/⟩</span>
        Scientific Calculator
        <span className="title-sub">.NET 8 API</span>
      </h1>

      <div className="layout">
        {/* ── Calculator ── */}
        <div className="calculator">
          <Display
            value={calc.display}
            expression={calc.expression}
            isError={calc.isError}
            isLoading={calc.isLoading}
          />

          {/* Angle mode */}
          <div className="mode-row">
            {(['Deg', 'Rad'] as const).map(m => (
              <button
                key={m}
                className={`mode-btn ${calc.angleMode === m ? 'active' : ''}`}
                onClick={() => calc.setAngleMode(m)}
              >{m}</button>
            ))}
          </div>

          {/* Scientific — row 1 */}
          <div className="btn-row">
            {(['sin','cos','tan','log','ln'] as const).map(fn => (
              <CalcButton key={fn} variant="fn" onClick={() => calc.callUnary(fn)}>{fn}</CalcButton>
            ))}
          </div>
          {/* Scientific — row 2 */}
          <div className="btn-row">
            {(['asin','acos','atan'] as const).map(fn => (
              <CalcButton key={fn} variant="fn" onClick={() => calc.callUnary(fn)}>
                {fn.slice(1)}⁻¹
              </CalcButton>
            ))}
            <CalcButton variant="fn" onClick={() => calc.callUnary('sqrt')}>√</CalcButton>
            <CalcButton variant="fn" onClick={() => calc.callUnary('square')}>x²</CalcButton>
          </div>
          {/* Scientific — row 3 */}
          <div className="btn-row">
            <CalcButton variant="fn" onClick={() => calc.insertConst(Math.PI, 'π')}>π</CalcButton>
            <CalcButton variant="fn" onClick={() => calc.insertConst(Math.E,  'e')}>e</CalcButton>
            <CalcButton variant="fn" onClick={() => calc.setOp('power')}>xʸ</CalcButton>
            <CalcButton variant="fn" onClick={() => calc.callUnary('abs')}>|x|</CalcButton>
            <CalcButton variant="fn" onClick={() => calc.callUnary('reciprocal')}>1/x</CalcButton>
          </div>

          <div className="divider" />

          {/* Basic */}
          <div className="btn-row">
            <CalcButton variant="clear" onClick={calc.clear}>AC</CalcButton>
            <CalcButton variant="clear" onClick={() => calc.callUnary('negate')}>+/-</CalcButton>
            <CalcButton variant="clear" onClick={() => calc.callUnary('percent')}>%</CalcButton>
            <CalcButton variant="op"    onClick={() => calc.setOp('divide')}>÷</CalcButton>
          </div>
          <div className="btn-row">
            {['7','8','9'].map(d => <CalcButton key={d} onClick={() => calc.digit(d)}>{d}</CalcButton>)}
            <CalcButton variant="op" onClick={() => calc.setOp('multiply')}>×</CalcButton>
          </div>
          <div className="btn-row">
            {['4','5','6'].map(d => <CalcButton key={d} onClick={() => calc.digit(d)}>{d}</CalcButton>)}
            <CalcButton variant="op" onClick={() => calc.setOp('subtract')}>−</CalcButton>
          </div>
          <div className="btn-row">
            {['1','2','3'].map(d => <CalcButton key={d} onClick={() => calc.digit(d)}>{d}</CalcButton>)}
            <CalcButton variant="op" onClick={() => calc.setOp('add')}>+</CalcButton>
          </div>
          <div className="btn-row">
            <CalcButton wide onClick={() => calc.digit('0')}>0</CalcButton>
            <CalcButton onClick={calc.dot}>.</CalcButton>
            <CalcButton variant="eq" onClick={() => calc.calculate()}>=</CalcButton>
          </div>
        </div>

        {/* ── Side panels ── */}
        <div className="side">
          <ApiLog entries={calc.log} />
          <History entries={calc.history} onRecall={calc.recallHistory} />
        </div>
      </div>
    </div>
  );
}
