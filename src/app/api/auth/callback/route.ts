import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // console.log(searchParams) -> São todos os parâmetros que estão vindo na url
  // URLSearchParams {'code' => '.....'}

  const code = searchParams.get('code') // armazenando apenas o code

  // Enviando para o backend para a rota POST '/register'
  const registerReponse = await api.post('/register', {
    code,
  })

  // o registerResponse vai retornar o token
  const { token } = registerReponse.data

  // console.log(token)

  // Redirecionando o usuário para a página home e guardando este token nos cookies
  const redirectURL = new URL('/', request.url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 7 // 7 days

  return NextResponse.redirect(redirectURL, {
    headers: {
      // Path determina onde que o token vai estar disponível (/  quer dizer toda a aplicação)
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
