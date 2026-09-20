export default defineNuxtPlugin(() => {
  if (!import.meta.client || !('serviceWorker' in navigator)) return

  navigator.serviceWorker.getRegistrations().then(async (regs) => {
    if (!regs.length) return
    await Promise.all(regs.map(r => r.unregister()))
    const keys = await caches.keys()
    await Promise.all(keys.map(k => caches.delete(k)))
  }).catch(() => {})
})
