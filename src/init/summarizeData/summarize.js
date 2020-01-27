import nest from './nest';
import transpose from './transpose';

export default function summarize(data, row = null, col = null, denominators = null) {
    // summarize by col variable
    const colNest = nest(data, col);
    const colNestTransposed = transpose(colNest, denominators ? denominators.summary.row : null);

    // summarize by row variable
    const rowNest = row ? nest(data, row, d => d) : null;
    const rowNestTransposed = row
        ? rowNest
              .map(row => {
                  const nested = nest(row.values, col);
                  nested.key = row.key;
                  return nested;
              })
              .map(row => {
                  const transposed = transpose(row, colNestTransposed);
                  transposed.key = row.key;
                  return transposed;
              })
        : null;

    return {
        row: colNestTransposed,
        rows: rowNestTransposed
    };
}
