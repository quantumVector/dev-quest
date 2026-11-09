import { ref, shallowRef, watchEffect } from 'vue'

/** Reactive loaders may read route props; obsolete requests cannot overwrite new data. */
export function useAsyncResource<T>(load: (signal: AbortSignal) => Promise<T>) {
  const data = shallowRef<T | null>(null)
  const error = shallowRef<Error | null>(null)
  const loading = ref(true)
  const revision = ref(0)

  watchEffect((onCleanup) => {
    void revision.value
    const controller = new AbortController()
    onCleanup(() => controller.abort())
    data.value = null
    error.value = null
    loading.value = true

    // Invoke synchronously so watchEffect tracks the route values read by the loader.
    void load(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) data.value = result
      })
      .catch((reason: unknown) => {
        if (!controller.signal.aborted) {
          error.value = reason instanceof Error ? reason : new Error('Не удалось загрузить данные.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) loading.value = false
      })
  })

  return {
    data,
    error,
    loading,
    retry: () => {
      revision.value += 1
    },
  }
}
