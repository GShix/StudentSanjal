<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\ConnectionCircle;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    /**
     * Toggle follow/unfollow action.
     *
     * @param int $requestedId The ID of the user to be followed/unfollowed.
     * @return \Illuminate\Http\JsonResponse
     */
    // public function toggleFollow($requestedId)
    // {
    //     $authUser = Auth::user();
    //     // dd($requestedId);

    //     // Check if the authenticated user is already following the requested user
    //     $isFollowing = $authUser->following()->where('connected_user_id', $requestedId)->exists();

    //     dd($isFollowing);
    //     if ($isFollowing) {
    //         // If already following, unfollow (delete the relationship)
    //         ConnectionCircle::where('user_id', $authUser->id)
    //             ->where('connected_user_id', $requestedId)
    //             ->delete();

    //         // Optionally, remove the 'followers' entry for symmetry
    //         ConnectionCircle::where('user_id', $requestedId)
    //             ->where('followers', $authUser->id)
    //             ->delete();

    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Unfollowed successfully',
    //             'isFollowing' => false,
    //         ]);
    //     } else {
    //         // If not following, create a follow relationship
    //         ConnectionCircle::create([
    //             'user_id' => $authUser->id,
    //             'connected_user_id' => $requestedId,
    //         ]);

    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Followed successfully',
    //             'isFollowing' => true,
    //         ]);
    //     }
    // }
    public function toggleFollow($requestedId)
    {
        $authUser = Auth::user();

        if (!$authUser) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Check if the authenticated user is already following the requested user
        $existingRecord = ConnectionCircle::withTrashed()
            ->where('user_id', $authUser->id)
            ->where('connected_user_id', $requestedId)
            ->first();

        if ($existingRecord) {
            if ($existingRecord->trashed()) {
                // If the record is soft-deleted, restore it
                $existingRecord->restore();

                return response()->json([
                    'success' => true,
                    'message' => 'Followed successfully (restored)',
                    'isFollowing' => true,
                ]);
            } else {
                // If already following, unfollow (delete the relationship)
                $existingRecord->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Unfollowed successfully',
                    'isFollowing' => false,
                ]);
            }
        } else {
            // If no record exists, create a follow relationship
            ConnectionCircle::create([
                'user_id' => $authUser->id,
                'connected_user_id' => $requestedId,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Followed successfully',
                'isFollowing' => true,
            ]);
        }
    }

    /**
     * Check if the authenticated user is following a specific user.
     *
     * @param int $id The ID of the user to check follow status for.
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkFollowStatus($id)
    {
        $authUser = Auth::user();

        // Check if the authenticated user is following the user with the given ID
        $isFollowing = $authUser->following()->where('connected_user_id', $id)->exists();

        return response()->json([
            'isFollowing' => $isFollowing
        ]);
    }

    // Other default resource methods can be left as is, but if not needed, you can remove them.

    // public function index() {}
    // public function create() {}
    // public function store(Request $request) {}
    // public function show(Follow $follow) {}
    // public function edit(Follow $follow) {}
    // public function update(Request $request, Follow $follow) {}
    // public function destroy(Follow $follow) {}
}
