
export interface ReuseComponent {
  loadInfo(): void;
}

export function instanceOfReuseComponent(
  component: any
): component is ReuseComponent{
  return component?.loadInfo instanceof Function;
}
