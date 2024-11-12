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

            $name = $this->request->getPost('name') ?? null;
            $email = $this->request->getPost('email') ?? null;
            $phone = $this->request->getPost('phone') ?? null;
            $address = $this->request->getPost('address') ?? null;

            $img = $_FILES['photo'];
            
            if ($img['error'] === 0) {

                $fileExtension = pathinfo($img['name'], PATHINFO_EXTENSION);
                $newFileName = uniqid('file_', true) . '.' . $fileExtension;
                $destination = 'uploads/' . $newFileName;

                move_uploaded_file($img['tmp_name'], $destination);
            }
            
            $insert = [
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'address' => $address,
                'photo' => $newFileName
            ];

            $res = $this->student->insert($insert);

            $response = [
                'success' => true,
                'message' => 'Successful save',
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

    public function get($id){
        try {
            
            $data = $this->student->find($id);

            $data['photo'] = '/uploads/' . $data['photo'];

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

            $name = $this->request->getPost('name') ?? null;
            $email = $this->request->getPost('email') ?? null;
            $phone = $this->request->getPost('phone') ?? null;
            $address = $this->request->getPost('address') ?? null;
            
            $update = [
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'address' => $address
            ];
            
            if(!empty($_FILES['photo'])){

                $img = $_FILES['photo'];

                if ($img['error'] === 0) {
                    
                    $past_photo = 'uploads/' . $this->student->find($id)['photo'];
        
                    if (file_exists($past_photo)) {
                        unlink($past_photo);
                    }
    
                    $fileExtension = pathinfo($img['name'], PATHINFO_EXTENSION);
                    $newFileName = uniqid('file_', true) . '.' . $fileExtension;
                    $destination = 'uploads/' . $newFileName;
    
                    move_uploaded_file($img['tmp_name'], $destination);

                    $update['photo'] = $newFileName;
                }
            } else {
                $update['photo'] = $this->student->find($id)['photo'];
            }

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

    public function delete($id){
        try {

            $photo = 'uploads/' . $this->student->find($id)['photo'];

            if (file_exists($photo)) {
                unlink($photo);
            }

            $res = $this->student->delete($id);

            $response = [
                'success' => true,
                'message' => 'Successful delete',
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