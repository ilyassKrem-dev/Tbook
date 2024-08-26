<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidName implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    protected $validTypes = ['username', 'name'];
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        in_array($value,$this->validTypes);
        $fail("The name is forbidden");
    }
}
