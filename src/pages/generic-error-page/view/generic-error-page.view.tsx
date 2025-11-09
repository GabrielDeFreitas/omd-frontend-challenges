import React from 'react'
import { TitleGeneric } from '../../../components'
import type { GenericErrorPageProps } from '../types'

export function GenericErrorPageView({ title }: GenericErrorPageProps) {
  return (
    <React.Fragment>
      <TitleGeneric title={title} />
    </React.Fragment>
  )
}
