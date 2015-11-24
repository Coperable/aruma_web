<?php namespace Aruma\Model;

use Illuminate\Database\Eloquent\Model;
 
class CenterOrganization extends Model {

    protected $table = 'centers_organizations';

    protected $fillable = ['center_id', 'organization_id'];

    public function center() {
        return $this->hasOne('Aruma\Model\Center');
    }

    public function organization() {
        return $this->hasOne('Aruma\Model\Organization');
    }

}

