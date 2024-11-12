<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AuthenticationController;


Route::middleware('guest')->group(function () {

    Route::get('/admin/login', [AuthenticationController::class, 'create'])
                ->name('login');

    Route::post('/admin/login', [AuthenticationController::class, 'store']);
});
// Public routes, accessible without authentication
Route::middleware('web:admin')->group(function () {
    Route::get('admin/dashboard', [AdminController::class, 'index'])->name('dashboard');
    Route::post('admin/logout', [AuthenticationController::class, 'destroy'])->name('logout');
});

// Protected routes, accessible only when authenticated
