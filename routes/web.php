<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\ChatController;
use App\Http\Controllers\User\PostController;
use App\Http\Controllers\User\EventController;
use App\Http\Controllers\User\FrontendController;
use App\Http\Controllers\User\PostLikeController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\User\ConnectionController;
use App\Http\Controllers\User\PostCommentController;
use App\Http\Controllers\User\ShowProfileController;
use App\Http\Controllers\User\PostInteractionController;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Route::get('/googleLogin', [SocialiteController::class,'googleLogin'])->name('google.login');

Route::middleware('auth')->group(function () {
    Route::get('uploadMedia', function () {
        return Inertia::render('UploadMedia');
    })->name('uploadMedia');

    Route::get('updateProfile', function () {
        return Inertia::render('Profile');
    })->name('updateProfile');

    // Route::get('post',[PostController::class,'index'])->name('createPost');
    Route::resource('post',PostController::class)->except('destroy');

    Route::get('posts/latestPosts',[PostController::class,'latestPosts'])->name('latestPosts');

    Route::get('posts/showPosts',[PostController::class,'showPosts'])->name('showPosts');

    Route::post('post/{post}', [PostController::class, 'destroy'])->name('post.destroy');

    Route::get('post/{post}', [PostController::class, 'updatePostLoveCount'])->name('post.updatePostLoveCount');

    Route::post('post/latestComment',[PostController::class, 'latestComment']);


    Route::post('postLike/isLiked',[PostLikeController::class,'isLiked']);
    Route::post('postComment/commentOnThePost',[PostCommentController::class,'commentOnThePost']);
    Route::post('postComment/allComments',[PostCommentController::class, 'allComments']);

    Route::post('postInteraction/commented',[PostInteractionController::class, 'commentInThePost'])->name('post.comment');


    Route::get('showProfile/{username}',[ShowProfileController::class, 'showProfile'])->name('showProfile');
    Route::get('showProfile/{id}',[ShowProfileController::class, 'showProfileById'])->name('showProfileById');

    route::get('/my-network', [ConnectionController::class, 'myNetwork'])->name('myNetwork');
});


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
    Route::get('/profileSetting', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profileSetting', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profileSetting', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::patch('updateSkills/{id}',[ProfileController::class,'updateSkills'])->name('updateSkills');

    Route::get('chat', [ChatController::class, 'index'])->name('chat');

    Route::get('/fetchChats/{sathiKoId}', [ChatController::class, 'fetchChats']);

    Route::post('sendChat', [ChatController::class, 'sendChat'])->name('chat.send');

    Route::post('note', [NoteController::class, 'store'])->name('note.store');

    Route::delete('/chat/note/{note:id}', [NoteController::class, 'destroy'])->name('note.destroy');

    Route::get('events', [EventController::class,'index'])->name('event.index');

    Route::post('events/store', [EventController::class,'store'])->name('event.store');
    Route::get('event-detail/{event:title}', [EventController::class,'eventDetail'])->name('event.detail');
});

require __DIR__.'/auth.php';
