import { useContext, Context, ReactNode } from 'react';

interface ContextConsumerIProps<T> {
  context: Context<T>;
  children: (data: T) => ReactNode;
}

export default function ContextConsumer<T>({ context, children }: ContextConsumerIProps<T>) {
  const data = useContext(context);
  return children(data);
}
