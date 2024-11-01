<?php namespace App\Controllers;

use CodeIgniter\Controller;
use App\Models\StudentModel;

class StudentController extends Controller
{

    protected $student;

    public function __construct(){

        $this->student = new StudentModel();

    }

    public function index()
    {
        return view('customer');
    }

    public function test(){

        $data = $this->student->findAll();

        return json_encode($data);

    }
}