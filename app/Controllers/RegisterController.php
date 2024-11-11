<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\User;
use CodeIgniter\HTTP\ResponseInterface;

class RegisterController extends BaseController
{
    public function index()
    {
        return view('student');
    }

    public function create()
    {
        
        $json = $this->request->getJSON();

        $user = new User();
        
        $res = $user->insert($json);

        $response = [
            'success' => true,
            'message' => 'Successful create',
            'res' => $res
        ];

        return json_encode($response);

    }
}
