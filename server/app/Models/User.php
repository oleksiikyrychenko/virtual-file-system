<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

/**
 * @property integer id
 * @property string first_name
 * @property string last_name
 * @property string email
 * @property string confirmed_at
 * @property string confirmation_token
 */

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'confirmed_at',
        'confirmation_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'confirmed_at',
        'updated_at',
        'created_at',
        'avatar_id',
        'confirmation_token'
    ];

    protected $appends = [
        'full_name',
    ];

    protected $with = [
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getFullNameAttribute()
    {
        return $this->attributes['first_name'] . ' ' . $this->attributes['last_name'];
    }

    public static function confirmationUser($code)
    {
        $user = User::where('confirmation_token', $code)->first();
        if(!$user) {
            return false;
        }
        return $user->fill(['confirmed_at' => now(), 'confirmation_token' => null ])->save();
    }

}
