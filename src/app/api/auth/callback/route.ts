import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // console.log(searchParams) -> São todos os parâmetros que estão vindo na url
  // URLSearchParams {'code' => '.....'}

  const code = searchParams.get('code') // armazenando apenas o code

  // Buscando nos cookies a chave redirectTo para saber qual página o usuário estava tentando acessar
  const redirectTo = request.cookies.get('redirectTo')?.value

  // Enviando para o backend para a rota POST '/register'
  const registerResponse = await api.post('/register', {
    code,
  })

  // o registerResponse vai retornar o token
  const { token } = registerResponse.data

  // console.log(token)

  // Redirecionando o usuário para a página home e guardando este token nos cookies
  // Manda para uma página que o usuário estava tentando logar ou para a home caso não exista
  const redirectURL = redirectTo ?? new URL('/', request.url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 7 // 7 days

  return NextResponse.redirect(redirectURL, {
    headers: {
      // Path determina onde que o token vai estar disponível (/  quer dizer toda a aplicação)
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
