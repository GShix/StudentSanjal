<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AuthenticationController;


Route::middleware(['admin_guest'])->group(function(){

    Route::get('/admin/login',[AuthenticationController::class,'create'])->name('admin.login');
    Route::post('/admin/login',[AuthenticationController::class,'store'])->name('admin.store');
});


// Route::middleware(['admin_auth'])->group(function(){

    Route::get('/admin/dashboard',[AdminController::class,'index'])->name('admin.dashboard');
    Route::get('/admin/allUsers',[AdminController::class,'allUsers'])->name('admin.allUsers');
    Route::get('/admin/user/view/{username:username}',[AdminController::class,'viewUser'])->name('admin.viewUser');
    Route::post('/admin/user/account_status',[AdminController::class,'changeAccountStatus'])->name('admin.status');
    Route::get('/admin/logout',[AuthenticationController::class,'logout'])->name('admin.logout');
// });
