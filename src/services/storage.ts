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

/**
 * Retorna `true` se a gravação foi bem-sucedida. Chamadores que não podem
 * aceitar uma perda silenciosa de dados (ex.: salvar um produto) devem
 * checar o retorno e avisar a pessoa usuária em vez de assumir sucesso —
 * uma gravação pode falhar por cota excedida (localStorage geralmente tem
 * 5–10MB por site) ou por modo privado/anônimo.
 */
export function writeStorage<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false
  try {
    window.localStorage.setItem(buildKey(key), JSON.stringify(value))
    return true
  } catch {
    return false
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
