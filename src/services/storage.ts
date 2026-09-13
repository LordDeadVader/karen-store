/**
 * Camada de persistência local usada apenas para prototipagem/desenvolvimento.
 *
 * IMPORTANTE: localStorage NÃO é um banco de dados seguro nem um mecanismo de
 * autenticação de produção — qualquer pessoa com acesso ao navegador pode lê-lo
 * e alterá-lo. Esta camada existe para que a loja funcione hoje com dados
 * locais/mockados, mas cada `services/*Service.ts` foi desenhado para ser
 * substituído por chamadas reais de API no futuro sem alterar os componentes
 * que os consomem.
 */

const NAMESPACE = 'karen-store'

function buildKey(key: string): string {
  return `${NAMESPACE}:${key}`
}

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(buildKey(key))
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(buildKey(key), JSON.stringify(value))
  } catch {
    // Armazenamento indisponível (modo privado, cota excedida, etc.) — falha silenciosa.
  }
}

export function removeStorage(key: string): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(buildKey(key))
}

/** Simula latência mínima de rede para manter os serviços "assíncronos" desde já. */
export function delay<T>(value: T, ms = 120): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}
