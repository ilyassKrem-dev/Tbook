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
        Schema::create('stories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user");
            $table->foreign("user")->references("id")->on("users")->onDelete("cascade");
            $table->unsignedBigInteger("parentId")->nullable();
            $table->string("text")->nullable();
            $table->string("media")->nullable();
            $table->string("type")->nullable();
            $table->string("bgColor")->nullable();
            $table->enum("visibility",["friends","all"])->default("all");
            $table->string("mediaClass")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stories');
    }
};
