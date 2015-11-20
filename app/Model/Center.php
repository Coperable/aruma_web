<?php namespace Aruma\Model;

use Illuminate\Database\Eloquent\Model;
 
class Center extends Model {

    protected $hidden = ['created_at', 'updated_at'];

    public function organizations() {
        return $this->belongsToMany('Aruma\Model\Organization', 'centers_organizations');
    }

    public function activities() {
        return $this->hasMany('Aruma\Model\Activity');
    }

    public function users() {
        return $this->belongsToMany('Aruma\User', 'centers_users');
    }


}


