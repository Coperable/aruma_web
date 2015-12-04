<?php namespace Aruma\Model;

use Illuminate\Database\Eloquent\Model;
 
class Organization extends Model {

    protected $hidden = ['created_at', 'updated_at'];

    public function products() {
        return $this->hasMany('Aruma\Model\Product');
    }

    public function activities() {
        return $this->hasMany('Aruma\Model\Activity');
    }

    public function geopoints() {
        return $this->hasMany('Aruma\Model\GeoPoint');
    }

    public function centers() {
        return $this->belongsToMany('Aruma\Model\Center', 'centers_organizations');
    }

    public function medias() {
        return $this->belongsToMany('Aruma\Model\Media', 'organizations_medias');
    }

    public function users() {
        return $this->belongsToMany('Aruma\User', 'organizations_users');
    }


}




