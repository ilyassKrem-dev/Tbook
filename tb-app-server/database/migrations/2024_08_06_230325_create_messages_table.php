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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("convo_id");
            $table->foreign("convo_id")->references("id")->on("convos");
            $table->unsignedBigInteger("sender");
            $table->foreign("sender")->references("id")->on("users");
            $table->unsignedBigInteger("receiver");
            $table->foreign("receiver")->references("id")->on("users");
            $table->string("content")->nullable();
            $table->string("reaction")->nullable();
            $table->boolean('seen')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
