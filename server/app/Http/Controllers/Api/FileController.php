<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CopyRequest;
use App\Http\Requests\CreateFileRequest;
use App\Http\Requests\UploadFileRequest;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FileController extends Controller
{
    /**
     * @param UploadFileRequest $request
     * @param File $file
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UploadFileRequest $request, File $file)
    {
        if (!$request->hasFile('file')) {
            return $this->invalidData();
        }

        try {
            $fileModel = $file->upload(
                $request->file('file'),
                $request->get('folder_id')
            );

            $response = $this->successApiResponse($fileModel->toArray());
        } catch (\Exception $e) {
            Log::error('File upload error: ' . $e->getMessage());
            $response = $this->errorApiResponse([$e->getMessage()]);
        }

        return $response;
    }

    public function createFile(CreateFileRequest $request, File $file)
    {
        $data = $request->only('folder_id', 'title', 'contents');
        if($newFile = $file->createFile($data)){
            return $this->successApiResponse(['file' => $newFile]);
        }
        return $this->errorApiResponse();
    }

    /**
     * @param Request $request
     * @param $id
     * @param File $file
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id, File $file)
    {
        $file = $file->getFileById($id);
        if(!$file){
            return $this->resourceNotFound();
        }

        $data = $request->only('original_filename', 'folder_id');
        $file->fill($data);
        $file->save();

        return $this->successApiResponse($file);
    }

    /**
     * @param CopyRequest $request
     * @param $id
     * @param File $file
     * @return \Illuminate\Http\JsonResponse
     */
    public function copyFile(CopyRequest $request, $id, File $file)
    {
        $folder_id = $request->get('folder_id');
        if($file->copy($id, $folder_id)) {
            return $this->successApiResponse();
        };

        return $this->errorApiResponse();
    }

    /**
     * @param $id
     * @param File $file
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id, File $file)
    {
        $storageFile = $file->getFileById($id);
        if (!$storageFile) {
            return $this->resourceNotFound();
        }

        if ($storageFile->delete()) {
            return $this->successApiResponse();
        }

        return $this->errorApiResponse();
    }
}
