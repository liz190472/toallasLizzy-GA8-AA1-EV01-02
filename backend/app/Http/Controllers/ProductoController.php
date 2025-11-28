<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::all();
        return response()->json([
            'success' => true,
            'data' => $productos
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ean_producto' => 'required|string|max:50',
            'referencia' => 'required|string|max:100',
            'gramos' => 'nullable|numeric',
            'tamano' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'precio_unitario' => 'required|numeric',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $imagenPath = null;

        if ($request->hasFile('imagen')) {
            $imagen = $request->file('imagen');
            $nombreImagen = time() . '_' . $imagen->getClientOriginalName();
            $imagen->move(public_path('imagenes'), $nombreImagen);
            $imagenPath = '/imagenes/' . $nombreImagen;
        }

        $producto = Producto::create([
            'ean_producto' => $request->ean_producto,
            'referencia' => $request->referencia,
            'gramos' => $request->gramos,
            'tamano' => $request->tamano,
            'color' => $request->color,
            'precio_unitario' => $request->precio_unitario,
            'imagen' => $imagenPath,
            'cantidad_stock' => $request->cantidad_stock ?? 0,
            'estado' => 'activo',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Producto creado exitosamente',
            'data' => $producto
        ], 201);
    }

    public function show($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json([
                'success' => false,
                'message' => 'Producto no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $producto
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json([
                'success' => false,
                'message' => 'Producto no encontrado'
            ], 404);
        }

        $request->validate([
            'ean_producto' => 'required|string|max:50',
            'referencia' => 'required|string|max:100',
            'gramos' => 'nullable|numeric',
            'tamano' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'precio_unitario' => 'required|numeric',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $imagenPath = $producto->imagen;

        if ($request->hasFile('imagen')) {
            if ($producto->imagen && file_exists(public_path($producto->imagen))) {
                unlink(public_path($producto->imagen));
            }

            $imagen = $request->file('imagen');
            $nombreImagen = time() . '_' . $imagen->getClientOriginalName();
            $imagen->move(public_path('imagenes'), $nombreImagen);
            $imagenPath = '/imagenes/' . $nombreImagen;
        }

        $producto->update([
            'ean_producto' => $request->ean_producto,
            'referencia' => $request->referencia,
            'gramos' => $request->gramos,
            'tamano' => $request->tamano,
            'color' => $request->color,
            'precio_unitario' => $request->precio_unitario,
            'imagen' => $imagenPath,
            'cantidad_stock' => $request->cantidad_stock ?? $producto->cantidad_stock,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Producto editado exitosamente',
            'data' => $producto
        ], 200);
    }

    public function destroy($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json([
                'success' => false,
                'message' => 'Producto no encontrado'
            ], 404);
        }

        if ($producto->imagen && file_exists(public_path($producto->imagen))) {
            unlink(public_path($producto->imagen));
        }

        $producto->delete();

        return response()->json([
            'success' => true,
            'message' => 'Producto eliminado exitosamente'
        ], 200);
    }
}