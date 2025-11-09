import type { PageNotFoundProps } from '../types'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/empty'
import { FolderOpen } from 'lucide-react'
import { Button } from '@/components/button'

export function PageNotFoundView({ pageNotFound }: PageNotFoundProps) {
  const { content, actions } = pageNotFound
  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderOpen />
            </EmptyMedia>
            <EmptyTitle>{content.title}</EmptyTitle>
            <EmptyDescription>{content.description}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={actions.goToHome} size="sm" variant="outline">
              {actions.label}
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </main>
  )
}
