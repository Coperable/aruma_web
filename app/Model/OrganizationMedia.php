<?php namespace Aruma\Model;

use Illuminate\Database\Eloquent\Model;
 
class OrganizationMedia extends Model {

    protected $table = 'organizations_medias';

    protected $fillable = ['media_id', 'organization_id'];

    public function media() {
        return $this->hasOne('Aruma\Model\Media');
    }

    public function organization() {
        return $this->hasOne('Aruma\Model\Organization');
    }

}
