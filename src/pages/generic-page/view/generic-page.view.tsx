import React from 'react'
import { TitleGeneric } from '../../../components'
import type { GenericPageProps } from '../types'

export function GenericPageView({ title }: GenericPageProps) {
  return (
    <React.Fragment>
      <TitleGeneric title={title} />
    </React.Fragment>
  )
}
