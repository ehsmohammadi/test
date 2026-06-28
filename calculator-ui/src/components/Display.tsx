interface Props {
  value: string;
  expression: string;
  isError: boolean;
  isLoading: boolean;
}

export function Display({ value, expression, isError, isLoading }: Props) {
  const valueClass = [
    'display-value',
    isError ? 'error' : '',
    isLoading ? 'loading' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="display">
      <span className="display-api-tag">API</span>
      <div className="display-expr">{expression || ' '}</div>
      <div className={valueClass}>
        {isLoading ? <span className="spinner" /> : null}
        {value}
      </div>
    </div>
  );
}
