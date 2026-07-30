<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('carparks', function () {
        return Inertia::render('carparks/carparks');
    })->name('carparks');
    Route::get('events', function () {
        return Inertia::render('events/events');
    })->name('events.list');
    Route::get('weather', function () {
        return Inertia::render('weather/weather');
    })->name('weather.list');
    Route::get('travel-planner', function () {
        return Inertia::render('travel-planner/travel-planner');
    })->name('travel-planner.list');
    Route::get('settings', function () {
        return Inertia::render('settings/settings');
    })->name('settings.list');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
