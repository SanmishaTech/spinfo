<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Profile;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Services\ProfileNumberService;
use App\Http\Resources\ProfileResource;
use App\Http\Controllers\Api\BaseController;

     /**
      * @group Payment Management
      *  `
      */

class PaymentController extends BaseController
{
     /**
     *  Show Payment
     */
    public function payment(string $id): JsonResponse
    {
        // Update profiles table with registration_date, expiry_date (registration_date + 1 year - 1 day) and profile_no

        $profile = Profile::find($id);
        if (!$profile) {
            return $this->sendError('Profile not found.', ['error'=>'Profile not found']);
         }

        //  $user = Auth::user();
        //  if($user || $user->profile->id !== $profile->id){
        //     return $this->sendError('Unauthorized', ['error'=>'You are not allowed to Pay']);
        //   }
        $profile->registration_date = Carbon::now()->format('Y-m-d');
        $profile->expiry_date = Carbon::parse($profile->registration_date)
            ->addYear()
            ->subDay()
            ->format('Y-m-d');

        $profile->profile_no = ProfileNumberService::generateProfileNumber();
        $profile->save();

        $refProfile = Profile::find($profile->ref_id);
        $refProfile->direct_count = $refProfile->direct_count + 1;
        $refProfile->save();

        $parentId = $profile->parent_id;

        $directCommision = 100;
        $commision = 50;

        if($parentId) {
            $parentProfile1 = Profile::find($parentId);
            $parentProfile1->level_1 = $parentProfile1->level_1 + 1;
            $parentProfile1->save();

            // if($profile->parent_id == $profile->ref_id){
            //   Transaction::insertDeposit($parentId, $directCommision);
            // }else{
            //     Transaction::insertDeposit($parentId, $commision);
            // }

            if($profile->ref_id == $parentProfile1->id){
            Transaction::insertDeposit($parentId, $directCommision);
            }else{
                Transaction::insertDeposit($parentId, $commision);
            }

           
            // Transaction::insertDeposit($parentId, 100);
            Profile::updateWalletBalance($parentProfile1->id);
            $parentId = $parentProfile1->parent_id;
        }

        if($parentId) {
            $parentProfile2 = Profile::find($parentId);
            $parentProfile2->level_2 = $parentProfile2->level_2 + 1;
            $parentProfile2->save();
            
            if($profile->ref_id == $parentProfile2->id){
                Transaction::insertDeposit($parentId, $directCommision);
                }else{
                    Transaction::insertDeposit($parentId, $commision);
                }

          //  Transaction::insertDeposit($parentId, 100);
            Profile::updateWalletBalance($parentProfile2->id);
            $parentId = $parentProfile2->parent_id;
        }

        if($parentId){
            $parentProfile3 = Profile::find($parentProfile2->parent_id);
            $parentProfile3->level_3 = $parentProfile3->level_3 + 1;
            $parentProfile3->save();

            if($profile->ref_id == $parentProfile3->id){
                Transaction::insertDeposit($parentId, $directCommision);
                }else{
                    Transaction::insertDeposit($parentId, $commision);
                }
            // Transaction::insertDeposit($parentId, 100);
            Profile::updateWalletBalance($parentProfile3->id);
            $parentId = $parentProfile3->parent_id;
        }

        if($parentId){
            $parentProfile4 = Profile::find($parentProfile3->parent_id);
            $parentProfile4->level_4 = $parentProfile4->level_4 + 1;
            $parentProfile4->save();

            if($profile->ref_id == $parentProfile4->id){
                Transaction::insertDeposit($parentId, $directCommision);
                }else{
                    Transaction::insertDeposit($parentId, $commision);
                }
            // Transaction::insertDeposit($parentId, 100);
            Profile::updateWalletBalance($parentProfile4->id);
            $parentId = $parentProfile4->parent_id;
        }

        if($parentId){
            $parentProfile5 = Profile::find($parentProfile4->parent_id);
            $parentProfile5->level_5 = $parentProfile5->level_5 + 1;
            $parentProfile5->save();

            if($profile->ref_id == $parentProfile5->id){
                Transaction::insertDeposit($parentId, $directCommision);
                }else{
                    Transaction::insertDeposit($parentId, $commision);
                }

            // Transaction::insertDeposit($parentId, 100);
            Profile::updateWalletBalance($parentProfile5->id);
            $parentId = $parentProfile5->parent_id;
        }

        if($parentId){
            $parentProfile6 = Profile::find($parentProfile5->parent_id);
            $parentProfile6->level_6 = $parentProfile6->level_6 + 1;
            $parentProfile6->save();

            if($profile->ref_id == $parentProfile6->id){
                Transaction::insertDeposit($parentId, $directCommision);
                }else{
                    Transaction::insertDeposit($parentId, $commision);
                }
            // Transaction::insertDeposit($parentId, 100);
            Profile::updateWalletBalance($parentProfile6->id);
            $parentId = $parentProfile6->parent_id;
        }

        if($parentId){
            $parentProfile7 = Profile::find($parentProfile6->parent_id);
            $parentProfile7->level_7 = $parentProfile7->level_7 + 1;
            $parentProfile7->save();

           
            if($profile->ref_id == $parentProfile7->id){
                Transaction::insertDeposit($parentId, $directCommision);
                }else{
                    Transaction::insertDeposit($parentId, $commision);
                }
            // Transaction::insertDeposit($parentId, 100);
            Profile::updateWalletBalance($parentProfile7->id);
            $parentId = $parentProfile7->parent_id;
        }

        if($parentId){
            $parentProfile8 = Profile::find($parentProfile7->parent_id);
            $parentProfile8->level_8 = $parentProfile8->level_8 + 1;
            $parentProfile8->save();

            if($profile->ref_id == $parentProfile8->id){
                Transaction::insertDeposit($parentId, $directCommision);
                }else{
                    Transaction::insertDeposit($parentId, $commision);
                }

            // Transaction::insertDeposit($parentId, 100);
            Profile::updateWalletBalance($parentProfile8->id);
        }

        /**
         * Add wallet_balance decimal (12,2) default 0 field in profiles table at the end done
         * Add transactions table id, profile_id, t_date, deposite, withdrawal columns  done
         * Add Rs. 100 entry in transactions table done
         * create updateWalletBalance function in Profile.php
         * In seed add Admin User with admin role and top@spinfo with profile with member role
         * While registerting user is always a member
         */
            $user = User::find($profile->user_id);
            $user->load('profile');
        return $this->sendResponse(['user'=>new UserResource($user)], 'Payment done Successly.');
    }

}
