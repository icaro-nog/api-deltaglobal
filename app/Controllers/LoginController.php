<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\User;
use Firebase\JWT\JWT;

class LoginController extends BaseController
{

    protected $key;

    public function __construct(){
        $this->key = '9b9b6435e10480f16fcff317470cfed5c6c9fa85b0e0effac9d38972be2083f9';
    }

    public function index()
    {
        return view('student');
    }

    public function store()
    {
        $json = $this->request->getJSON();
        
        $user = new User();
        
        $userFound = $user->select('id, email')->where('email', $json->email)->first();

        if ($userFound) {
            $iat = time();
            $exp = $iat + 3600;
            
            $payload = [
                'iat' => $iat,
                'exp' => $exp,
                'user' => [
                    'id' => $userFound['id'],
                    'email' => $userFound['email'],
                ]
            ];

            $jwt = JWT::encode($payload, $this->key, 'HS256');

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