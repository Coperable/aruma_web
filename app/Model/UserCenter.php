<?php namespace Aruma\Model;

use Illuminate\Database\Eloquent\Model;
 
class UserCenter extends Model {

    protected $table = 'centers_users';

    protected $fillable = ['user_id', 'center_id'];

    public function user() {
        return $this->hasOne('Aruma\User');
    }

    public function region() {
        return $this->hasOne('Aruma\Model\Center');
    }


}
