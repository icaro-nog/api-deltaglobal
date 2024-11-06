<?php

namespace App\Models;

use CodeIgniter\Model;

class StudentModel extends Model
{
   protected $table = 'students';
   protected $primaryKey = 'id';
   protected $useAutoIncrement = true;

   protected $returnType = 'array';

   protected $allowedFields = [
     'name',
     'email',
     'phone',
     'address',
     'photo'
   ];

   protected $useTimestamps = false;
}