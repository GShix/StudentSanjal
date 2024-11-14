<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\RegisterController;

Route::prefix('admin')->middleware('guest:admin')->group(function(){

    Route::get('register', [RegisterController::class, 'create'])->name('admin.register');
    Route::post('admin.register', [RegisterController::class, 'store'])->name('admin.register.store');
    Route::get('login',[LoginController::class,'create'])->name('admin.login');
    Route::post('login',[LoginController::class,'store'])->name('admin.store');
    Route::get('forgot-password', [LoginController::class, 'create'])->name('admin.password.request');
});


Route::prefix('admin')->middleware('auth:admin')->group(function(){

    Route::get('dashboard',[AdminController::class,'index'])->name('admin.dashboard');
    Route::get('allUsers',[AdminController::class,'allUsers'])->name('admin.allUsers');
    Route::get('goldVerified',[AdminController::class,'goldVerified'])->name('admin.goldVerified');
    Route::get('pendingGoldVerification',[AdminController::class,'pendingGoldVerification'])->name('admin.pendingGoldVerification');
    Route::get('user/view/{username:username}',[AdminController::class,'viewUser'])->name('admin.viewUser');
    Route::post('user/account_status',[AdminController::class,'changeAccountStatus'])->name('admin.status');
    Route::post('logout',[LoginController::class,'destroy'])->name('admin.logout');
});
