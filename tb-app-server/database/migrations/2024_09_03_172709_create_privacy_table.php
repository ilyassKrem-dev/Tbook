<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('privacy', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user");
            $table->foreign("user")->references("id")->on("users")->onDelete("cascade");
            $table->enum("posts",["friends","public","me"])->default("public");
            $table->enum("search",["friends","anywhere","friends_of"])->default("anywhere");
            $table->enum("notification",["all","messages","posts"])->default("all");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('privacy');
    }
};
