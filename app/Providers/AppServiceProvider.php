<?php

namespace App\Providers;

use App\Enums\AttendanceStatusEnum;
use App\Enums\CourseModalityEnum;
use App\Enums\DocumentTypeEnum;
use App\Enums\GenderEnum;
use App\Enums\JobTypeEnum;
use App\Enums\MaritalStatusEnum;
use App\Enums\ReferenceStatusEnum;
use App\Enums\RelatedReferenceEnum;
use App\Enums\RequestStatusEnum;
use App\Enums\StatusEnum;
use App\Enums\UserStatusEnum;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('enums', function () {
            return [
                'userStatus' => UserStatusEnum::toArray(),
                'requestStatus' => RequestStatusEnum::toArray(),
                'attendanceStatus' => AttendanceStatusEnum::toArray(),
                'documentType' => DocumentTypeEnum::toArray(),
                'gender' => GenderEnum::toArray(),
                'maritalStatus' => MaritalStatusEnum::toArray(),
                'courseModality' => CourseModalityEnum::toArray(),
                'statusEnum' => StatusEnum::toArray(),
                'referenceStatus' =>  ReferenceStatusEnum::toArray(),
                'relatedReference' => RelatedReferenceEnum::toArray(),
                'jobType' =>  JobTypeEnum::toArray(),
            ];
        });
    }
}
