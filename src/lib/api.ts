import axios from 'axios'

export const api = axios.create({
  // Definindo o caminho padrão do back-end
  baseURL: 'http://localhost:3333',
})
