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
        Schema::create('convos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user1");
            $table->unsignedBigInteger("user2");
            $table->foreign("user1")->references("id")->on("users");
            $table->foreign("user2")->references("id")->on("users");
            $table->string("status")->nullable();
            $table->unsignedBigInteger("status_by")->nullable();
            $table->foreign("status_by")->references("id")->on("users");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('convos');
    }
};
