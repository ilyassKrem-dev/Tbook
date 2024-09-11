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
            $table->enum("search",["all","fff","me"])->default("all");
            $table->enum("notification",["all","requests","posts"])->default("all");
            $table->enum("requests",["all","fff"])->default("all");
            $table->enum("friends",["all","fff","friends","me"])->default("all");
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
