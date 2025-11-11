import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from '@/components/card'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs'
import { Pencil, Trash2, CalendarDays, LayoutGrid, PlusCircle, TableProperties } from 'lucide-react'
import type { BoardTaskViewProps, PlanStatus } from '@/pages/board-task/types'
import { getActionIcon, getStatusIcon } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Separator } from '@/components/separator'
import { Skeleton } from '@/components/skeleton'

export function BoardTaskView({
  plans,
  isLoading,
  viewMode,
  setViewMode,
  onOpenCreate,
  onEdit,
  onDelete,
}: BoardTaskViewProps) {
  if (isLoading) {
    return (
      <main className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <Card>
            <CardContent className="flex flex-col gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <div className="flex flex-row gap-6">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  const STATUSES: PlanStatus[] = ['Não Iniciado', 'Em Andamento', 'Concluído']

  function shouldRenderHeader() {
    return (
      <CardHeader>
        <CardTitle>Gestão de Planos</CardTitle>
        <CardDescription>Visualize e gerencie seus planos de ação.</CardDescription>
        <CardAction>
          <Button size="sm" onClick={onOpenCreate}>
            <PlusCircle className="w-4 h-4" />
            Novo Plano
          </Button>
        </CardAction>
      </CardHeader>
    )
  }

  function shouldRenderTabList() {
    return (
      <TabsList className="flex gap-1">
        <TabsTrigger value="board" onClick={() => setViewMode('board')}>
          <LayoutGrid className="w-4 h-4 mr-1" /> Cards
        </TabsTrigger>
        <TabsTrigger value="table" onClick={() => setViewMode('table')}>
          <TableProperties className="w-4 h-4 mr-1" /> Tabela
        </TabsTrigger>
      </TabsList>
    )
  }

  function shouldRenderBoard() {
    return (
      <div className="flex flex-col gap-6">
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-full">
            {STATUSES.map(status => {
              const plansInStatus = plans.filter(plan => plan.status === status)

              return (
                <div key={status} className="shrink-0 w-96 bg-slate-50 rounded-md">
                  <div className="flex items-center justify-between py-4 px-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      <h3 className="font-semibold text-sm">{status}</h3>
                      <Badge variant="outline" className="text-xs">
                        {plansInStatus.length}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 min-h-96 flex flex-col gap-3 transition-all duration-200">
                    {plansInStatus.length > 0 ? (
                      plansInStatus.map(plan => (
                        <Card key={plan.id}>
                          <CardHeader>
                            <CardTitle>
                              <Badge variant="outline" className="text-xs uppercase">
                                {plan.id}
                              </Badge>
                            </CardTitle>
                            <CardDescription>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <CalendarDays className="w-4" />
                                <p className="text-xs">
                                  {new Date(plan.data).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                            </CardDescription>
                            <CardAction>
                              <Button variant="ghost" size="icon" onClick={() => onEdit(plan)}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => onDelete(plan.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </CardAction>
                          </CardHeader>

                          <CardHeader>
                            <CardTitle className="text-sm">{plan.titulo}</CardTitle>
                            <CardDescription className="text-xs">{plan.objetivo}</CardDescription>
                          </CardHeader>

                          <CardContent>
                            <div className="flex flex-col gap-4">
                              <Separator />
                              <div className="flex flex-row gap-2 flex-wrap">
                                {plan.acoes.map(acao => (
                                  <Badge
                                    key={acao.id}
                                    variant="outline"
                                    className="text-xs flex items-center gap-1"
                                  >
                                    {getActionIcon(acao.status)}
                                    <span>{acao.descricao}</span>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center text-sm text-muted-foreground py-8">
                        Nenhum plano neste status
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  function shouldRenderTable() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Ações</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.length > 0 ? (
            plans.map(plan => (
              <TableRow key={plan.id}>
                <TableCell className="uppercase">{plan.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{plan.titulo}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{plan.objetivo}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(plan.status)}
                    <span className="text-sm">{plan.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{plan.prioridade}</Badge>
                </TableCell>
                <TableCell className="p-3 text-xs text-muted-foreground">
                  {plan.acoes.filter(a => a.status === 'Feita').length}/{plan.acoes.length}{' '}
                  concluídas
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CalendarDays />
                    <p className="text-xs">{new Date(plan.data).toLocaleDateString('pt-BR')}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(plan)}>
                      <Pencil />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(plan.id)}>
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-8">
                Nenhuma ação registrada
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <Card>
          {shouldRenderHeader()}

          <Tabs defaultValue="board" className="px-4">
            {shouldRenderTabList()}
          </Tabs>

          <CardContent>
            <Tabs value={viewMode} onValueChange={value => setViewMode(value as 'board' | 'table')}>
              <TabsContent value="board">{shouldRenderBoard()}</TabsContent>
              <TabsContent value="table">{shouldRenderTable()}</TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
