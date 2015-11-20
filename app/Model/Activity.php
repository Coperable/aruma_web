<?php namespace Aruma\Model;

use Illuminate\Database\Eloquent\Model;
 
class Activity extends Model {

    protected $table = 'activities';

    protected $hidden = ['created_at', 'updated_at'];

    protected $dates = ['event_date'];

    public function organization() {
        return $this->belongsTo('Aruma\Model\Organization');
    }

    public function center() {
        return $this->belongsTo('Aruma\Model\Center');
    }

    public function medias() {
        return $this->belongsToMany('Aruma\Model\Medias', 'products_medias');
    }
}



