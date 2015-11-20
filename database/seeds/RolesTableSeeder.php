<?php
use Illuminate\Database\Seeder;
use Aruma\User;
use Aruma\Model\UserRole;
use Aruma\Model\Role;
use Illuminate\Support\Facades\Hash;

class RolesTableSeeder extends Seeder {

    public function run() {
        DB::table('roles')->delete();


        $role = new Role();
        $role->name = 'edit_site';
        $role->description = 'Editar Sitio';
        $role->save();

        $role = new Role();
        $role->name = 'crud_user';
        $role->description = 'Manejo Usuarios';
        $role->save();

        $role = new Role();
        $role->name = 'create_center';
        $role->description = 'Administrar Centros';
        $role->save();

        $role = new Role();
        $role->name = 'create_organization';
        $role->description = 'Crear Emprendimientos';
        $role->save();

        $role = new Role();
        $role->name = 'edit_center';
        $role->description = 'Editar Centro';
        $role->save();

        $role = new Role();
        $role->name = 'crud_center_user';
        $role->description = 'Administrar Participantes';
        $role->save();

        $userRole = new UserRole();
        $userRole->user_id = 1;
        $userRole->role_id = 1;
        $userRole->save();
        
        $userRole = new UserRole();
        $userRole->user_id = 1;
        $userRole->role_id = 2;
        $userRole->save();
 

        $userRole = new UserRole();
        $userRole->user_id = 2;
        $userRole->role_id = 3;
        $userRole->save();
 
        $userRole = new UserRole();
        $userRole->user_id = 2;
        $userRole->role_id = 2;
        $userRole->save();
 
        $userRole = new UserRole();
        $userRole->user_id = 3;
        $userRole->role_id = 4;
        $userRole->save();
 
        $userRole = new UserRole();
        $userRole->user_id = 3;
        $userRole->role_id = 5;
        $userRole->save();

        $userRole = new UserRole();
        $userRole->user_id = 3;
        $userRole->role_id = 6;
        $userRole->save();


     }

}




