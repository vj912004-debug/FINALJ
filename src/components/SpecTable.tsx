export default function SpecTable({
  title,
  caption,
  columns,
  rows,
  notes,
}: {
  title?: string;
  caption?: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  notes?: readonly string[];
}) {
  return (
    <div className="overflow-hidden border border-line bg-background">
      {title ? (
        <div className="bg-navy px-4 py-3 sm:px-5">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
            {title}
          </h3>
          {caption ? (
            <p className="mt-1 text-[11px] text-steel-light">{caption}</p>
          ) : null}
        </div>
      ) : null}
      <div className="overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-surface-muted">
              {columns.map((col) => (
                <th
                  key={col}
                  className="border-b border-line px-3 py-3 font-semibold text-navy sm:px-4"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row[0]}-${index}`}
                className={index % 2 === 0 ? "bg-surface" : "bg-background"}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${columns[cellIndex]}-${cellIndex}`}
                    className={`border-b border-line px-3 py-2.5 sm:px-4 ${
                      cellIndex === 0
                        ? "font-semibold text-navy"
                        : "text-steel"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {notes?.length ? (
        <ul className="space-y-1.5 border-t border-line bg-surface-muted px-4 py-3 text-xs text-steel">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
