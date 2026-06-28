import type { LogEntry } from '../types/calculator';

interface Props { entries: LogEntry[]; }

export function ApiLog({ entries }: Props) {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="dot cyan" /> API Log
      </div>
      <div className="panel-body log-body">
        {entries.length === 0
          ? <p className="empty">No requests yet.</p>
          : entries.map(e => (
            <div key={e.id} className={`log-entry ${e.response.success ? '' : 'log-err'}`}>
              <div className="log-method">
                POST /api/calculator/{e.endpoint} · {e.ms}ms
              </div>
              <div className="log-req">↑ {JSON.stringify(e.request)}</div>
              <div className={`log-res ${e.response.success ? 'ok' : 'err'}`}>
                ↓ {e.response.success
                  ? JSON.stringify({ success: true, value: e.response.value })
                  : JSON.stringify({ success: false, error: e.response.error })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
