<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\File\File as SymfonyFile;

class File extends Model
{
    const PATH = '/files';
    /** @var array */
    protected $fillable = [
        'folder_id',
        'filename',
        'original_filename',
        'mime_type',
        'url',
        'size'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];


    protected function folder()
    {
        return  $this->belongsTo(Folder::class);
    }

    /**
     * @param string $destination
     * @param UploadedFile|\Illuminate\Http\File|SymfonyFile $file
     * @param  $folderId
     * @return array
     */
    public static function upload(SymfonyFile $file, $folderId = null)
    {
        $driverDisk = config('filesystems.default');
        $storedFilePath = Storage::disk($driverDisk)->putFile(
            self::PATH,
            $file
        );

        $modelData = [
            'folder_id' => $folderId,
            'filename' => self::PATH.'/'.basename($storedFilePath),
            'original_filename' => $file->getClientOriginalName(),
            'url' => Storage::disk($driverDisk)->url($storedFilePath),
            'mime_type' => $file->getClientMimeType(),
            'size' => $file->getSize(),
        ];

        return self::create($modelData);
    }

    public static function createFile($fileData)
    {
        $filename = $fileData['title'];
        $folderId = $fileData['folder_id'];
        $contents = $fileData['contents'];
        $driverDisk = config('filesystems.default');
        $storedFilePath = Storage::disk($driverDisk)->put(self::PATH.'/'.$filename, $contents);
        $metaData = Storage::disk($driverDisk)->getMetaData(self::PATH.'/'.$filename);

        $modelData = [
            'folder_id' => $folderId,
            'filename' => self::PATH.'/'.basename($storedFilePath),
            'original_filename' => $filename,
            'url' => Storage::disk($driverDisk)->url($metaData['path']),
            'mime_type' => $metaData['mimetype'],
            'size' => $metaData['size'],
        ];

        return self::create($modelData);
    }


    /**
     * @param $id
     * @param $folder_id
     * @return mixed
     */
    public function copy($id, $folder_id)
    {
        $driverDisk = config('filesystems.default');
        $file = $this->getFileById($id);
        $newFilename = 'copy/'.Str::random(32).$this->convertMimeType($file->mime_type);
        Storage::copy($file->filename, $newFilename);
        $randomStr =  Str::random(6);

        $modelData = [
            'folder_id' => $folder_id,
            'filename' => $newFilename,
            'original_filename' => 'copy('.$randomStr.')'.$file->original_filename,
            'url' => Storage::disk($driverDisk)->url($newFilename),
            'mime_type' => $file->mime_type,
            'size' => $file->size,
        ];

        return self::create($modelData);
    }

    /**
     * @return bool
     */
    public function deleteFromStorage()
    {
        return Storage::disk(config('filesystems.default'))->delete($this->filename);
    }

    public function getFileById($id)
    {
        return $this->where('id', $id)->first();
    }


    public function convertMimeType ($mimeType)
    {
        switch ($mimeType) {
            case 'image/jpeg':
                return '.jpg';
            case 'image/png':
                return '.png';
            default:
                return '';
        }
    }

    /**
     * remove file from storage and from db
     * {@inheritdoc}
     */
    public function delete()
    {
        $this->deleteFromStorage();

        return parent::delete();
    }
}
