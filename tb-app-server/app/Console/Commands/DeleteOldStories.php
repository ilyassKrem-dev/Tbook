<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\stories\Stories;
use Carbon\Carbon;

class DeleteOldStories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stories:delete-old';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete stories older than 24 hours';


    /**
     * Execute the console command.
     */
    public function handle()
    {
        $oldStoriesCount = Stories::where("created_at","<",Carbon::nom()->subHours(24))->delete();
        $this->info("$oldStoriesCount old stories deleted.");
    }
}
