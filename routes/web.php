<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\ChatController;
use App\Http\Controllers\User\PostController;
use App\Http\Controllers\User\EventController;
use App\Http\Controllers\User\SanjalController;
use App\Http\Controllers\User\FrontendController;
use App\Http\Controllers\User\PostLikeController;
use App\Http\Controllers\User\SavePostController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\RecommendationController;
use App\Http\Controllers\User\ConnectionController;
use App\Http\Controllers\User\PostCommentController;
use App\Http\Controllers\User\ShowProfileController;
use App\Http\Controllers\User\PostInteractionController;
use App\Http\Controllers\User\StudentVerificationController;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Route::get('/googleLogin', [SocialiteController::class,'googleLogin'])->name('google.login');

Route::middleware('auth')->group(function () {
    Route::get('updateProfile', function () {
        return Inertia::render('Profile');
    })->name('updateProfile');

    // Route::get('post',[PostController::class,'index'])->name('createPost');
    Route::resource('post',PostController::class)->except('edit','update','destroy');
    Route::get('/post/{post}/edit', [PostController::class, 'edit'])->name('post.edit');
    Route::patch('/post/{post}/update', [PostController::class, 'update'])->name('post.update');
    Route::delete('/post/{post}/destroy', [PostController::class, 'destroy'])->name('post.destroy');

    Route::get('posts/latestPosts',[PostController::class,'latestPosts'])->name('latestPosts');

    Route::get('posts/showPosts',[PostController::class,'showPosts'])->name('showPosts');

    Route::post('post/hide/{post}', [PostController::class, 'hide'])->name('post.hide');

    Route::get('post/{post}', [PostController::class, 'updatePostLoveCount'])->name('post.updatePostLoveCount');

    Route::post('post/latestComment',[PostController::class, 'latestComment']);


    Route::post('postLike/isLiked',[PostLikeController::class,'isLiked']);
    Route::post('postComment/commentOnThePost',[PostCommentController::class,'commentOnThePost']);
    Route::post('postComment/allComments',[PostCommentController::class, 'allComments']);

    Route::post('postInteraction/commented',[PostInteractionController::class, 'commentInThePost'])->name('post.comment');

    Route::post('toggleSavePost',[SavePostController::class, 'toggleSave'])->name('post.save');


    Route::get('showProfile/{username}',[ShowProfileController::class, 'showProfile'])->name('showProfile');
    Route::get('showProfile/{id}',[ShowProfileController::class, 'showProfileById'])->name('showProfileById');

    route::get('/my-network', [ConnectionController::class, 'myNetwork'])->name('myNetwork');

    route::get('/savedPosts', [SavePostController::class, 'index'])->name('savedPosts');
});

Route::middleware('auth')->group(function () {
    Route::get('/profileSetting', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profileSetting', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profileSetting', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::patch('updateSkills/{id}',[ProfileController::class,'updateSkills'])->name('updateSkills');

    // Route::get('chat', [ChatController::class, 'index'])->name('chat');

    // Route::get('/fetchChats/{friendId}', [ChatController::class, 'fetchChats']);

    // Route::post('sendChat', [ChatController::class, 'sendChat'])->name('chat.send');

    Route::post('note', [NoteController::class, 'store'])->name('note.store');

    Route::delete('/chat/note/{note:id}', [NoteController::class, 'destroy'])->name('note.destroy');

    Route::get('events', [EventController::class,'index'])->name('event.index');

    Route::get('events/create', [EventController::class,'create'])->name('event.create');
    Route::post('events/store', [EventController::class,'store'])->name('event.store');
    Route::get('event-detail/{event:title}', [EventController::class,'eventDetail'])->name('event.detail');
    Route::get('events/edit/{event:title}', [EventController::class,'edit'])->name('event.edit');
    Route::patch('events/update/{event:title}', [EventController::class,'update'])->name('event.update');
    Route::get('events/join/{event:title}', [EventController::class,'join'])->name('event.join');
    Route::post('events/register/{event:title}', [EventController::class,'register'])->name('event.register');

    Route::get('recommendation/by-skills', [RecommendationController::class,'getRecommendedPostsBySkills'])->name('recommended.bySkills');



    Route::get('/chatss',[SanjalController::class, 'index'])->name('chatss');
    Route::get('chatss/sanjal/{id:friendId}', [SanjalController::class, 'startChat'])->name('chatss.start');

    Route::get('/fetchChats/{friendId}', [SanjalController::class, 'fetchChats']);

    Route::post('/sendChat', [SanjalController::class, 'sendChat'])->name('chatss.send');

    Route::get('send-email',[EventController::class, 'sendMail']);

});
Route::get('students/verify',[StudentVerificationController::class,'index'])->name('student.verify');
Route::get('students/verify/uploads',[StudentVerificationController::class, 'create'])->name('student.verify.uploads');
Route::post('students/verify/uploads',[StudentVerificationController::class, 'store'])->name('student.verify.store');

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
