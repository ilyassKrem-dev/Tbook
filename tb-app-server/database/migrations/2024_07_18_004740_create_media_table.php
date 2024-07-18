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
        Schema::create('medias', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->enum('type', ['image', 'video',"audio"]);
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->refernces("id")->on("users");
            $table->unsignedBigInteger("post_id");
            $table->foreign('post_id')->refernces("id")->on("posts");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
