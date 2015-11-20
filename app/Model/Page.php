<?php namespace Aruma\Model;

use Illuminate\Database\Eloquent\Model;
 
class Page extends Model {

    protected $hidden = ['created_at', 'updated_at'];

    public function medias() {
        return $this->belongsToMany('Aruma\Model\Media', 'pages_medias');
    }

}





