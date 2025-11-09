import type { TitleGenericProps } from './types'

export function TitleGeneric({ title }: TitleGenericProps) {
  return <h1 className="text-3xl font-bold underline">{title}</h1>
}
