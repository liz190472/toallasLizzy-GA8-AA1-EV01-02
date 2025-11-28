<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';

    protected $fillable = [
        'ean_producto',
        'referencia',
        'gramos',
        'tamano',
        'color',
        'precio_unitario',
        'imagen',
        'cantidad_stock',
        'estado'
    ];

    protected $casts = [
        'precio_unitario' => 'decimal:2',
        'gramos' => 'integer',
        'cantidad_stock' => 'integer',
    ];

    public function toArray()
    {
        $array = parent::toArray();
        
        $array['Referencia'] = $this->referencia;
        $array['Gramos'] = $this->gramos;
        $array['Tamano'] = $this->tamano;
        $array['Color'] = $this->color;
        $array['PrecioUnitario'] = $this->precio_unitario;
        $array['CantidadStock'] = $this->cantidad_stock;
        $array['Estado'] = $this->estado;
        
        return $array;
    }
}
