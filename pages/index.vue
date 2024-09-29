<script setup lang="ts">
// Add any necessary imports
</script>

<template>
  <div class="min-h-screen bg-background">
    <main class="container mx-auto px-4 py-8 sm:py-16 lg:pt-56">
      <section class="mb-12 text-center sm:mb-16">
        <h1 class="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          Master the Art of Beekeeping
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Join our comprehensive course and become a skilled beekeeper
        </p>
      </section>

      <section class="mb-12 grid gap-8 sm:mb-16 sm:gap-12 md:grid-cols-2">
        <div>
          <h2 class="mb-4 text-xl font-semibold text-foreground sm:text-2xl">
            Why Choose Our Course?
          </h2>
          <ul class="space-y-3">
            <li class="flex items-center">
              <Icon name="heroicons:check-circle" class="mr-3 size-5 flex-shrink-0 text-primary" />
              <span class="text-muted-foreground">Expert-led instruction</span>
            </li>
            <li class="flex items-center">
              <Icon name="heroicons:check-circle" class="mr-3 size-5 flex-shrink-0 text-primary" />
              <span class="text-muted-foreground">Hands-on practical experience</span>
            </li>
            <li class="flex items-center">
              <Icon name="heroicons:check-circle" class="mr-3 size-5 flex-shrink-0 text-primary" />
              <span class="text-muted-foreground">Sustainable beekeeping practices</span>
            </li>
            <li class="flex items-center">
              <Icon name="heroicons:check-circle" class="mr-3 size-5 flex-shrink-0 text-primary" />
              <span class="text-muted-foreground">Small class sizes for personalized attention</span>
            </li>
          </ul>
        </div>
        <div class="rounded-lg bg-card p-6 shadow-sm">
          <h2 class="mb-4 text-xl font-semibold text-card-foreground sm:text-2xl">
            Course Details
          </h2>
          <p class="mb-3 text-muted-foreground">
            Duration: 8 weeks
          </p>
          <p class="mb-3 text-muted-foreground">
            Location: Our apiary and classroom
          </p>
          <p class="mb-6 text-muted-foreground">
            Price: $599
          </p>
          <UiButton class="w-full">
            Enroll Now
          </UiButton>
        </div>
      </section>

      <section class="mb-12 sm:mb-16">
        <h2 class="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          What You'll Learn
        </h2>
        <div class="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <h3 class="mb-2 font-semibold text-card-foreground">
              Bee Biology
            </h3>
            <p class="text-muted-foreground">
              Understand the fascinating world of bees and their crucial role in our ecosystem.
            </p>
          </div>
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <h3 class="mb-2 font-semibold text-card-foreground">
              Hive Management
            </h3>
            <p class="text-muted-foreground">
              Learn to set up and maintain healthy, productive hives year-round.
            </p>
          </div>
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <h3 class="mb-2 font-semibold text-card-foreground">
              Honey Harvesting
            </h3>
            <p class="text-muted-foreground">
              Master the techniques for harvesting and processing high-quality honey.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          Ready to Begin Your Beekeeping Journey?
        </h2>
        <div class="text-center">
          <UiButton variant="default" size="lg">
            Sign Up for Our Next Course
          </UiButton>
        </div>
      </section>

      <section class="mb-12 mt-36 sm:mb-16">
        <h2 class="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          What You'll Learn
        </h2>
        <div class="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <h3 class="mb-2 font-semibold text-card-foreground">
              Bee Biology
            </h3>
            <p class="text-muted-foreground">
              Understand the fascinating world of bees and their crucial role in our ecosystem.
            </p>
          </div>
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <h3 class="mb-2 font-semibold text-card-foreground">
              Hive Management
            </h3>
            <p class="text-muted-foreground">
              Learn to set up and maintain healthy, productive hives year-round.
            </p>
          </div>
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <h3 class="mb-2 font-semibold text-card-foreground">
              Honey Harvesting
            </h3>
            <p class="text-muted-foreground">
              Master the techniques for harvesting and processing high-quality honey.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          Ready to Begin Your Beekeeping Journey?
        </h2>
        <div class="text-center">
          <UiButton variant="default" size="lg">
            Sign Up for Our Next Course
          </UiButton>
        </div>
      </section>
    </main>
  </div>
</template>
