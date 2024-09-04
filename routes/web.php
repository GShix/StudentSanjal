<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\PostController;
use App\Http\Controllers\User\FrontendController;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('uploadMedia', function () {
    return Inertia::render('UploadMedia');
})->name('uploadMedia');

// Route::get('post',[PostController::class,'index'])->name('createPost');
Route::resource('post',PostController::class)->middleware('auth');
Route::post('/post/{post}', [PostController::class, 'destroy'])->name('post.destroy');


// Route::post('post',[PostController::class,'store'])->name('post.store');

// Route::middleware('web')->group(function () {
//     Route::get('/', function () {
//         return Inertia::render('Welcome');
//     })->name('home');
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
