<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthenticationController;


Route::middleware(['admin_guest'])->group(function(){

    Route::get('/admin/login',[AuthenticationController::class,'create'])->name('admin.login');
    Route::post('/admin/login',[AuthenticationController::class,'store'])->name('admin.store');
});


Route::middleware(['admin_auth'])->group(function(){

    Route::get('/admin/dashboard',[AuthenticationController::class,'index'])->name('admin.dashboard');
    Route::get('/admin/logout',[AuthenticationController::class,'logout'])->name('admin.logout');
});
