/**
 * Sortowanie zadań według daty arkusza (najnowsze pierwsze).
 * Numeracja wyświetlana (1, 2, 3…) jest niezależna od numeru zadania w arkuszu maturalnym.
 */

export function getSourceSortKey(source = "") {
  const s = String(source).toLowerCase();

  const years = [...s.matchAll(/20(\d{2})/g)].map((m) => 2000 + parseInt(m[1], 10));
  const year = years.length ? Math.max(...years) : 0;

  let month = 0;
  if (s.includes("maj")) month = 5;
  else if (s.includes("czerwiec")) month = 6;
  else if (s.includes("styczeń") || s.includes("styczen")) month = 1;
  else if (s.includes("październik") || s.includes("pazdziernik")) month = 10;
  else if (s.includes("lipiec")) month = 7;
  else if (s.includes("sierpień") || s.includes("sierpien")) month = 8;
  else if (year >= 2026 && (s.includes("egzamin w 2026") || s.includes("maj 2026"))) month = 5;

  return year * 100 + month;
}

export function sortTasksBySourceDate(tasks) {
  return [...tasks]
    .map((task, index) => ({ task, index }))
    .sort((a, b) => {
      const diff = getSourceSortKey(b.task.source) - getSourceSortKey(a.task.source);
      return diff !== 0 ? diff : a.index - b.index;
    })
    .map(({ task }) => task);
}

export function getDisplayNumber(index) {
  return String(index + 1);
}
