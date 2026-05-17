// Paginate past PostgREST's default 1000-row cap by walking .range() until a
// short page comes back. Without this, queries on quiz_responses silently
// truncate once the table exceeds 1000 rows.

const PAGE_SIZE = 1000;

type PageResult<T> = { data: T[] | null; error: unknown };

export async function fetchAllPages<T>(
  build: (from: number, to: number) => PromiseLike<PageResult<T>>
): Promise<{ data: T[]; error: unknown | null }> {
  const all: T[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const to = from + PAGE_SIZE - 1;
    const { data, error } = await build(from, to);
    if (error) return { data: all, error };
    const page = data ?? [];
    all.push(...page);
    if (page.length < PAGE_SIZE) break;
  }
  return { data: all, error: null };
}
