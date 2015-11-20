<?php namespace Aruma\Model;

use Illuminate\Database\Eloquent\Model;
 
class Product extends Model {

    protected $hidden = ['created_at', 'updated_at'];

    public function organization() {
        return $this->belongsTo('Aruma\Model\Organization');
    }

    public function medias() {
        return $this->belongsToMany('Aruma\Model\Medias', 'products_medias');
    }


}




