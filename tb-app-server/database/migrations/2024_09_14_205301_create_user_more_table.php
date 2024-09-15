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
        Schema::create('user_more', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user");
            $table->foreign("user")->references("id")->on("users")->onDelete("cascade");
            $table->string("work")->nullable();
            $table->string("school")->nullable();
            $table->string("city")->nullable();
            $table->string("website")->nullable();
            $table->string("language")->nullable();
            $table->string("country")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_more');
    }
};
