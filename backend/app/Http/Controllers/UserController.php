<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Crypt;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show($id)
    {
        $user = User::find($id);

        if(!$user) {
            return response()->json([
                "message" => "id {$id} not found.",
            ], 404);
        }

        return $user;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            "password" => "required",
            "email" => "required",
        ]);

        $user = $request->all();

        $hashedPassword = app("hash")->make($user["password"]);
        $createdUser = User::create([
            "email" => $user["email"],
            "password" => $hashedPassword,
        ]);

        return $createdUser;
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            "email" => "required",
            "password" => "required",
        ]);

        $user = $request->all();
        $hashedPassword = app("hash")->make($user["password"]);
        $updated = User::where("id", $id)->update([
            "email" => $user["email"],
            "password" => $hashedPassword,
        ]);

        if ($updated) {
            return response()->json([
                "message" => "user {$id} was updated.",
            ], 200);
        }

        return response()->json([
            "error" => "error on updating user id {$id}.",
        ], 403);
    }

    public function delete($id)
    {
        $user = User::whereId($id)->first();

        if(!$user) {
            return response()->json([
                "error" => "user not found.",
            ], 404);
        }

        $user->delete();
        return $user;
    }

    public function search(Request $request) {
        $queryUserEmail = $request->get('searchEmail');

        $result = User::query()->where('email', 'like', "{$queryUserEmail}%")->get();

        return $result;
    }
}
