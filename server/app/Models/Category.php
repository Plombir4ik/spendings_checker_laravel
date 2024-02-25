<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($category) {
            $category->transactions()->delete();
        });
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
