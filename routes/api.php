<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::group(['middleware'=>['auth:sanctum']], function(){
    Route::post('/logout', [UserController::class, 'logout']);
    Route::resource('profiles', ProfileController::class);
    Route::get('profiles/{parent_id}/get_profiles', [ProfileController::class, 'getProfiles']); 
    Route::get('payment/{profile_id}', [PaymentController::class, 'payment']);  //this must be get
    Route::get('current_month_count', [ProfileController::class, 'getCurrentMonthCount']); 
    Route::get('/generate_invoice', [InvoiceController::class, 'generateInvoice']); 
});

Route::get('profiles/{profile_no}/get_ref_profile', [ProfileController::class, 'getProfileByProfileNo'])->where('profile_no', '[A-Za-z0-9]+');  //this must be get


