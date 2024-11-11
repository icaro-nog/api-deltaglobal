<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\User;
use CodeIgniter\HTTP\ResponseInterface;
// use firebase\JWT\JWT;
use CodeIgniter\Shield\Authentication\JWTManager;
use Firebase\JWT\JWT;

class LoginController extends BaseController
{
    public function index()
    {
        return view('student');
    }

    public function store()
    {
        $json = $this->request->getJSON();
        
        $user = new User();
        
        $userFound = $user->select('id, email')->where('email', $json->email)->first(); // senha????

        if ($userFound) {
            // Dados para o JWT
            $key = 'SECRET_KEY'; // Chave secreta para gerar o token
            $iat = time(); // Emissão do token
            $exp = $iat + 3600; // Expiração do token (1 hora)
            
            // Payload com dados do usuário
            $payload = [
                'iat' => $iat,
                'exp' => $exp,
                'user' => [
                    'id' => $userFound['id'],
                    'email' => $userFound['email'],
                ]
            ];

            // Gerando o token
            $jwt = JWT::encode($payload, $key, 'HS256');

            header('Authorization', $jwt);

            // Retornando o token no corpo da resposta
            return json_encode([
                'token' => $jwt,
                'user' => $userFound,
                'message' => 'Successful login',
                'success' => true
            ]);

        }
    
        return json_encode(['error' => 'Usuário não encontrado']);
    }
}