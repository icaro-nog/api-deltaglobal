<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

use Firebase\JWT\JWT;
use Config\Services;
use Firebase\JWT\Key;

class AuthFilter implements FilterInterface
{
    /**
     * Do whatever processing this filter needs to do.
     * By default it should not return anything during
     * normal execution. However, when an abnormal state
     * is found, it should return an instance of
     * CodeIgniter\HTTP\Response. If it does, script
     * execution will end and that Response will be
     * sent back to the client, allowing for error pages,
     * redirects, etc.
     *
     * @param RequestInterface $request
     * @param array|null       $arguments
     *
     * @return RequestInterface|ResponseInterface|string|void
     */
    // Método que é executado antes de acessar a rota protegida
    public function before(RequestInterface $request, $arguments = null)
    {
        // Pegando o token JWT no cabeçalho Authorization
        $authHeader = $request->getHeaderLine('Authorization');

        log_message('debug', $request->getHeaderLine('Authorization'));

        if (!$authHeader) {
            // Retorna erro 401 se o cabeçalho Authorization não estiver presente
            return Services::response()->setStatusCode(401)->setJSON(['error' => 'Token não fornecido', 'req' => $request->headers()]); // parei aqui
        }

        // Remover o "Bearer " da string do token
        $token = str_replace('Bearer ', '', $authHeader);

        try {
            // Chave secreta usada para codificar o token no backend
            $key = 'SECRET_KEY'; // Substitua por uma chave secreta segura

            // Decodificando o token com a chave secreta e o algoritmo HS256
            $decoded = JWT::decode($token, new Key($key, 'HS256'));

            // Armazenando as informações do usuário no objeto Request, para uso posterior
            $request->user = $decoded->user;

        } catch (\Exception $e) {
            // Retorna erro 401 se o token for inválido ou expirado
            return Services::response()->setStatusCode(403)->setJSON(['error' => 'Token inválido ou expirado', 'req' => $request->getHeaderLine('Authorization')]);
        }

        return true; // Se o token for válido, a requisição segue normalmente
    }

    /**
     * Allows After filters to inspect and modify the response
     * object as needed. This method does not allow any way
     * to stop execution of other after filters, short of
     * throwing an Exception or Error.
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @param array|null        $arguments
     *
     * @return ResponseInterface|void
     */
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        //
    }
}
