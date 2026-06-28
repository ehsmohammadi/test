import type { HistoryEntry } from '../types/calculator';

interface Props {
  entries: HistoryEntry[];
  onRecall: (e: HistoryEntry) => void;
}

function fmt(n: number) {
  return String(parseFloat(n.toFixed(10)));
}

export function History({ entries, onRecall }: Props) {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="dot purple" /> History
      </div>
      <div className="panel-body history-body">
        {entries.length === 0
          ? <p className="empty">No history yet.</p>
          : entries.map(e => (
            <button key={e.id} className="history-item" onClick={() => onRecall(e)}>
              <span className="h-expr">{e.expression}</span>
              <span className="h-val">{fmt(e.value)}</span>
            </button>
          ))}
      </div>
    </div>
  );
}
