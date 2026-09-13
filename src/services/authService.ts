/**
 * Autenticação administrativa — MODO DESENVOLVIMENTO.
 *
 * Este serviço NÃO é seguro para produção: ele apenas guarda uma flag de
 * sessão no navegador e compara a senha com um valor de ambiente local.
 * Antes de publicar a loja de verdade, substitua este serviço por uma
 * autenticação real (ex.: login com backend + sessão/JWT, Supabase Auth,
 * Firebase Auth, etc.), validando as credenciais no servidor — nunca no
 * código do frontend.
 */

import { delay, readStorage, removeStorage, writeStorage } from './storage'

const SESSION_KEY = 'admin-session'

// Senha de desenvolvimento. Pode ser sobrescrita via variável de ambiente
// VITE_ADMIN_DEV_PASSWORD no arquivo .env local. Nunca reutilize esta senha
// em produção.
const DEV_PASSWORD = import.meta.env.VITE_ADMIN_DEV_PASSWORD ?? 'karenstore123'

export const authService = {
  async login(password: string): Promise<boolean> {
    const ok = password === DEV_PASSWORD
    if (ok) {
      writeStorage(SESSION_KEY, { authenticated: true, since: new Date().toISOString() })
    }
    return delay(ok, 300)
  },

  async logout(): Promise<void> {
    removeStorage(SESSION_KEY)
    return delay(undefined)
  },

  isAuthenticated(): boolean {
    return readStorage<{ authenticated: boolean }>(SESSION_KEY, { authenticated: false }).authenticated
  },
}
