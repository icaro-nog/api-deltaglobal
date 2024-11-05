<?php namespace App\Controllers;

use CodeIgniter\Controller;
use App\Models\StudentModel;
use Exception;

class StudentController extends Controller
{

    protected $student;
    protected $request;

    public function __construct(){

        $this->student = new StudentModel();
        $this->request = \Config\Services::request();
    }

    public function index()
    {
        return view('student');
    }

    public function test(){

        $data = $this->student->findAll();

        return json_encode($data);

    }

    public function list(){
        try {
            
            $data = $this->student->findAll();

            $response = [
                'data' => $data,
                'success' => true,
                'message' => 'Successful load',
            ];

            return json_encode($response);

        } catch (Exception $e) {

            $response = [
                'success' => false,
                'message' => $e->getMessage(),
            ];

            return json_encode($response);
        }
    }

    public function create(){
        try {

            $json = $this->request->getJSON();

            $insert = [
                'name' => $json->name,
                'email' => $json->email,
                'phone' => $json->phone,
                'address' => $json->address,
                'photo' => $json->photo
            ];

            $res = $this->student->insert($insert);

            $response = [
                'success' => true,
                'message' => 'Successful save',
            ];

            return json_encode($response);
            
        } catch (Exception $e) {

            $response = [
                'success' => false,
                'message' => $e->getMessage(),
            ];

            return json_encode($response);
        }
    }

    public function get($id){
        try {
            
            $data = $this->student->find($id);

            if($data){
                $response = [
                    'data' => $data,
                    'success' => true,
                    'message' => 'Successful load',
                ];
            } else {
                $response = [
                    'success' => false,
                    'message' => 'Not found data',
                ];
            }

            return json_encode($response);

        } catch (Exception $e) {

            $response = [
                'success' => false,
                'message' => $e->getMessage(),
            ];

            return json_encode($response);
        }
    }

    public function update($id){
        try {

            $json = $this->request->getJSON();

            $update = [
                'name' => $json->name,
                'email' => $json->email,
                'phone' => $json->phone,
                'address' => $json->address,
                'photo' => $json->photo
            ];

            $res = $this->student->update($id, $update);

            $response = [
                'success' => true,
                'message' => 'Successful update',
                'res' => $res
            ];

            return json_encode($response);

        } catch (Exception $e) {

            $response = [
                'success' => false,
                'message' => $e->getMessage(),
            ];

            return json_encode($response);
        }
    }
}