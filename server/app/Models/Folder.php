<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer id
 */

class Folder extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'parent_id',
        'title',
        'user_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'updated_at',
        'created_at',
    ];

    protected $with = [
        'files',
        'child'
    ];

    public function child() {
        return $this->hasMany(Folder::class, 'parent_id','id') ;
    }

    public function files()
    {
        return  $this->hasMany(File::class, 'folder_id');
    }

    public function getRootFiles()
    {
        return File::where('folder_id', '=', null)->get();
    }


    public function getRootFoldersByUserId($userId)
    {
        return $this->where('user_id', '=', $userId)
                ->where(function ($query) {
                    $query->where('parent_id', '=', null);
                })
                ->get();
    }

    public function getFolderById($id)
    {
        return $this->where('id', $id)->first();
    }

    public function getFolderChild($id)
    {
        return $this->where('parent_id', $id)->get();
    }

    public function copy($id, $folder_id)
    {
        $copiedFolder = $this->getFolderById($id);
        $newFolder = $copiedFolder->replicate();
        $newFolder->parent_id = $folder_id;
        $newFolder->save();
        $childen = $newFolder->child;
        $files = $newFolder->files;

        foreach($files as $file){
            $newFolder->files()->create($file->toArray());
        }

        foreach($childen as $child) {
            self::copy($child->id, $newFolder->id);
        }

        return true;
    }

    public function isChildExits($id, $folder_id)
    {
        $folder = $this->getFolderById($id);
        if($id === $folder_id) {
            return true;
        }
        $children = $folder->child;
        if(!empty($children)){
            foreach($children as $child){
                if ($child->id === $folder_id){
                    return true;
                } else if(!empty($child->child)) {
                    if(self::isChildExits($child->id, $folder_id)){
                        return true;
                    };
                } else {
                    return false;
                }
            }
        }

        return false;
    }

}
