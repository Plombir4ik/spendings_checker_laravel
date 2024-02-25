<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    use Filterable;
    protected $guarded = [];
    protected $appends = ['category_name'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function getCategoryNameAttribute()
    {
        return $this->category->name; // предполагается, что у меня есть отношение category()
    }
}
