import type { QueryObserver } from '@tanstack/query-core'
import type { QueryKey, QueryObserverResult } from '@tanstack/query-core'
import type { CreateBaseQueryOptions } from './types'
import { useQueryClient } from './QueryClientProvider'
import { createStore } from '@stencil/store'

// Base Query Function that is used to create the query.
export function createBaseQuery<
  TQueryFnData,
  TError,
  TData,
  TQueryData,
  TQueryKey extends QueryKey,
>(
  options: CreateBaseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >,
  Observer: typeof QueryObserver,
): QueryObserverResult<TData, TError> {
  const queryClient = useQueryClient()
  const defaultedOptions = queryClient.defaultQueryOptions(options)
  defaultedOptions._optimisticResults = 'optimistic'
  const observer = new Observer(queryClient, defaultedOptions)

  let { state } = createStore<QueryObserverResult<TData, TError>>(
    // @ts-ignore
    observer.getOptimisticResult(defaultedOptions),
  )


  //TODO
 /*  const [dataResource, { refetch, mutate }] = createResource<TData | undefined>(
    () => {
      return new Promise((resolve) => {
        if (!(state.isFetching && state.isLoading)) {
          if (state.data === emptyData) {
            resolve(undefined)
          }
          resolve(state.data)
        }
      })
    },
  ) */

  /* batch(() => {
    mutate(() => state.data)
    refetch()
  }) */

/*   let taskQueue: Array<() => void> = [] */

/*   const unsubscribe = observer.subscribe((result) => {
    taskQueue.push(() => {
      batch(() => {

        if (result.data === undefined) {
          // TODO: Is this necessary for stencil/store?
          // This is a hack to prevent Solid
          // from deleting the data property when it is `undefined`
          // ref: https://www.solidjs.com/docs/latest/api#updating-stores
          // @ts-ignore
          result.data = emptyData
        }
        state = result
        mutate(() => result.data)
        refetch()
      })
    }) */

/*     queueMicrotask(() => {
      const taskToRun = taskQueue.pop()
      if (taskToRun) {
        taskToRun()
      }
      taskQueue = []
    })
  })
 */
/*   onCleanup(() => unsubscribe()) */

/*   onMount(() => {
    observer.setOptions(defaultedOptions, { listeners: false })
  }) */

/*   createComputed(() => {
    const newDefaultedOptions = queryClient.defaultQueryOptions(options)
    observer.setOptions(newDefaultedOptions)
  }) */

/*   createComputed(
    on(
      () => state.status,
      () => {
        if (
          state.isError &&
          !state.isFetching &&
          shouldThrowError(observer.options.useErrorBoundary, [
            state.error,
            observer.getCurrentQuery(),
          ])
        ) {
          throw state.error
        }
      },
    ),
  )
 */
 /*  const handler = {
    get(
      target: QueryObserverResult<TData, TError>,
      prop: keyof QueryObserverResult<TData, TError>,
    ): any {
      if (prop === 'data') {
        return dataResource()
      }
      return Reflect.get(target, prop)
    },
  } */

  return state
}
