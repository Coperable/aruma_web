<?php namespace Aruma\Model;

use Illuminate\Database\Eloquent\Model;
 
class GeoPoint extends Model {

    protected $table = 'geo_points';

    protected $hidden = ['created_at', 'updated_at'];

    public function organization() {
        return $this->belongsTo('Aruma\Model\Organization');
    }

    public function location() {
        return $this->belongsTo('Aruma\Model\Location');
    }

}

