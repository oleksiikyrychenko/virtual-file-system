<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CreateFolderRequest;
use App\Http\Requests\UpdateFolderRequest;
use App\Models\Folder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @param Folder $folder
     * @return Response
     */
    public function index(Folder $folder)
    {
        $userId = Auth::id();
        $folders = $folder->getRootFoldersByUserId($userId);
        $files = $folder->getRootFiles();

        $data = [
            'files' => $files,
            'folders' => $folders
        ];

        return $this->successApiResponse($data);
    }

    /**
     * Store a newly created resource in storage.
     * @param CreateFolderRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateFolderRequest $request)
    {
        $data = $request->only('parent_id', 'title', 'user_id');
        $folder = new Folder();
        if($folder->isNameExits($data)){
            return $this->invalidData('The folder name is exits already');
        }
        $folder->fill($data);
        if($folder->save()){
            return $this->successApiResponse(['folder' => $folder]);
        }
        return $this->errorApiResponse();
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @param Folder $folder
     * @return void
     */
    public function show($id, Folder $folder)
    {
        $folder = $folder->getFolderById($id);
        if(!$folder){
            return $this->resourceNotFound();
        }
        $folderChild = $folder->getFolderChild($id);
        $data = [
            'folder' => $folder,
            'child' => $folderChild
        ];
        return $this->successApiResponse($data);
    }

    /**
     * @param UpdateFolderRequest $request
     * @param $id
     * @param Folder $folder
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateFolderRequest $request, $id, Folder $folder)
    {
        $folder = $folder->getFolderById($id);
        if(!$folder){
            return $this->resourceNotFound();
        }

        $data = $request->only('title', 'parent_id');
        $folder->fill($data);
        $folder->save();

        return $this->successApiResponse($folder);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @param Folder $folder
     * @return Response
     */
    public function destroy($id, Folder $folder)
    {
        $removableFolder = $folder->getFolderById($id);
        if(!$removableFolder){
            return $this->resourceNotFound();
        }
        $removableFolder->delete();
        return $this->successApiResponse();
    }

    /**
     * @param Folder $folder
     * @return \Illuminate\Http\JsonResponse
     */
    public function tree(Folder $folder)
    {
        $userId = Auth::id();
        $folders = $folder->getRootFoldersByUserId($userId);
        return $this->successApiResponse($folders);
    }

    /**
     * @param Request $request
     * @param $id
     * @param Folder $folder
     * @return \Illuminate\Http\JsonResponse
     */
    public function copyFolder(Request $request, $id, Folder $folder)
    {
        $folder_id = $request->get('folder_id');
        if($folder->isChildExits($id, $folder_id)){
            return $this->invalidData('You cannot copy parent to child elements ');
        }

        if($folder->copy($id, $folder_id)) {
            return $this->successApiResponse();
        };

        return $this->errorApiResponse();
    }

    /**
     * @param Request $request
     * @param $id
     * @param Folder $folder
     * @return \Illuminate\Http\JsonResponse
     */
    public function cutFolder(Request $request, $id, Folder $folder)
    {
        $copiedFolder = $folder->getFolderById($id);
        $data = $request->only( 'parent_id');
        if(!$copiedFolder){
            return $this->resourceNotFound();
        }

        if($folder->isChildExits($id, $data['parent_id'])){
            return $this->invalidData('You cannot copy parent to child elements ');
        }

        $copiedFolder->fill($data);
        $copiedFolder->save();

        return $this->successApiResponse($folder);
    }

}
