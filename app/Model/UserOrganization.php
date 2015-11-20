<?php namespace Aruma\Model;

use Illuminate\Database\Eloquent\Model;
 
class UserOrganization extends Model {

    protected $table = 'organizations_users';

    protected $fillable = ['user_id', 'organization_id'];

    public function user() {
        return $this->hasOne('Aruma\User');
    }

    public function organization() {
        return $this->hasOne('Aruma\Model\Organization');
    }


}

