<?php namespace Aruma\Model;

use Illuminate\Database\Eloquent\Model;
 
class UserRole extends Model {

    protected $table = 'users_roles';

    protected $fillable = ['user_id', 'role_id'];

    public function user() {
        return $this->hasOne('Aruma\User');
    }

    public function role() {
        return $this->hasOne('Aruma\Model\Role');
    }


}

