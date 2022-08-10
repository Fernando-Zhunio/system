
export interface ReuseComponent<T> {
  loadInfo(): void;
}

export function instanceOfReuseComponent<T>(
  component: any
): component is ReuseComponent<T> {
  return component?.loadInfo instanceof Function;
}
