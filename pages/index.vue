<script setup lang="ts">
import { ref } from 'vue'
import { useMotion } from '@vueuse/motion'

const isHovered = ref(false)

const hubFeatures = [
  'Comprehensive beekeeping knowledge base',
  'Curated video tutorials from expert beekeepers',
  'Active community forums for peer support',
  'Up-to-date research and best practices',
  'Sustainable beekeeping guides',
  'Equipment reviews and recommendations',
]

const resourceCategories = [
  {
    title: 'Expert Articles',
    description: 'In-depth articles covering all aspects of beekeeping, from beginner to advanced topics.',
    icon: 'lucide:book-open',
  },
  {
    title: 'Video Library',
    description: 'Curated collection of instructional videos, demonstrations, and expert interviews.',
    icon: 'lucide:video',
  },
  {
    title: 'Community Forums',
    description: 'Connect with fellow beekeepers, share experiences, and get answers to your questions.',
    icon: 'lucide:users',
  },
  {
    title: 'Research Digest',
    description: 'Stay updated with the latest scientific findings and advancements in apiculture.',
    icon: 'lucide:microscope',
  },
  {
    title: 'Equipment Guide',
    description: 'Comprehensive reviews and comparisons of beekeeping tools and equipment.',
    icon: 'lucide:tool',
  },
  {
    title: 'Seasonal Calendar',
    description: 'Month-by-month guides for managing your hives throughout the year.',
    icon: 'lucide:calendar',
  },
]

const howItWorksSteps = [
  {
    title: 'Sign Up',
    description: 'Create your account and start with a 7-day free trial to explore all our resources.',
    icon: 'lucide:user-plus',
  },
  {
    title: 'Explore Content',
    description: 'Access our vast library of articles, videos, and forums tailored to your beekeeping level.',
    icon: 'lucide:search',
  },
  {
    title: 'Learn & Implement',
    description: 'Apply the knowledge and techniques youve learned to improve your beekeeping practices.',
    icon: 'lucide:lightbulb',
  },
  {
    title: 'Connect & Share',
    description: 'Engage with our community, ask questions, and share your own experiences and insights.',
    icon: 'lucide:message-circle',
  },
]

const teamMembers = [
  {
    name: 'Dr. Emily Chen',
    role: 'Founder & Lead Apiculturist',
    bio: 'With over 20 years of experience in beekeeping and a Ph.D. in Entomology, Dr. Chen is passionate about promoting sustainable beekeeping practices.',
    image: '/images/emily-chen.jpg',
  },
  {
    name: 'Mark Johnson',
    role: 'Head of Content',
    bio: 'A veteran beekeeper and talented writer, Mark ensures our resources are both informative and engaging for beekeepers of all levels.',
    image: '/images/mark-johnson.jpg',
  },
  {
    name: 'Sarah Thompson',
    role: 'Community Manager',
    bio: 'Sarahs expertise in fostering online communities helps create a supportive and collaborative environment for our members.',
    image: '/images/sarah-thompson.jpg',
  },
]

const sectionMotion = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  transition: { duration: 500 },
}

const divMotion = {
  initial: { opacity: 0, x: -20 },
  enter: { opacity: 1, x: 0 },
  transition: { duration: 500 },
}

const liMotion = {
  initial: { opacity: 0, x: -20 },
  enter: { opacity: 1, x: 0 },
  transition: { duration: 500 },
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-background to-accent">
    <main class="container mx-auto px-4 py-8 sm:py-16 lg:py-24">
      <section
        v-motion="sectionMotion"
        class="mb-12 text-center sm:mb-16"
      >
        <h1 class="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          Your Ultimate Beekeeping Information Hub
        </h1>
        <p class="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
          Discover the world's most comprehensive resource for beekeepers of all levels. We've gathered the best information, books, videos, and community insights to help you thrive in your beekeeping journey.
        </p>
      </section>

      <section class="mb-12 grid gap-8 sm:mb-16 sm:gap-12 md:grid-cols-2">
        <div
          v-motion="{
            ...divMotion,
            transition: { duration: 500, delay: 200 },
          }"
        >
          <h2 class="mb-4 text-xl font-semibold text-foreground sm:text-2xl">
            Why Choose Our Beekeeping Hub?
          </h2>
          <ul class="space-y-3">
            <li
              v-for="(item, index) in hubFeatures"
              :key="index"
              v-motion="{
                ...liMotion,
                transition: { duration: 500, delay: 300 + index * 100 },
              }"
              class="flex items-center"
            >
              <CheckCircle class="mr-3 size-5 flex-shrink-0 text-primary" />
              <span class="text-muted-foreground">{{ item }}</span>
            </li>
          </ul>
        </div>
        <div
          v-motion="{
            ...divMotion,
            initial: { opacity: 0, x: 20 },
            transition: { duration: 500, delay: 200 },
          }"
        >
          <div class="rounded-lg bg-card p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-semibold text-card-foreground sm:text-2xl">
              Join Our Community
            </h2>
            <p class="mb-3 text-muted-foreground">
              Get unlimited access to our entire knowledge base, video library, and community forums.
            </p>
            <p class="mb-3 text-muted-foreground">
              Perfect for beginners and experienced beekeepers alike.
            </p>
            <p class="mb-6 text-muted-foreground">
              Monthly subscription: $9.99 <span class="text-sm">(cancel anytime)</span>
            </p>
            <button
              class="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
              @mouseenter="isHovered = true"
              @mouseleave="isHovered = false"
            >
              Start Your Free Trial
              <motion-div
                :animate="{ x: isHovered ? 5 : 0 }"
                :transition="{ duration: 200 }"
              >
                <ChevronRight class="ml-2 size-4" />
              </motion-div>
            </button>
          </div>
        </div>
      </section>

      <section
        v-motion="{
          ...sectionMotion,
          transition: { duration: 500, delay: 400 },
        }"
        class="mb-12 sm:mb-16"
      >
        <h2 class="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          Explore Our Comprehensive Resources
        </h2>
        <div class="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, index) in resourceCategories"
            :key="index"
            v-motion="{
              ...divMotion,
              initial: { opacity: 0, y: 20 },
              transition: { duration: 500, delay: 500 + index * 100 },
            }"
          >
            <div class="h-full rounded-lg bg-card p-6 shadow-sm">
              <Icon :name="item.icon" class="mb-2 size-8 text-primary" />
              <h3 class="mb-2 font-semibold text-card-foreground">
                {{ item.title }}
              </h3>
              <p class="text-muted-foreground">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        v-motion="{
          ...sectionMotion,
          transition: { duration: 500, delay: 600 },
        }"
        class="mb-12 sm:mb-16"
      >
        <h2 class="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          Your Journey to Beekeeping Mastery Starts Here
        </h2>
        <p class="mx-auto mb-8 max-w-3xl text-center text-muted-foreground">
          Whether you're just starting out or looking to expand your apiary, our information hub provides everything you need to succeed. From basic hive management to advanced breeding techniques, we've got you covered.
        </p>
        <div class="text-center">
          <button
            class="mx-auto flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
          >
            Explore Our Resources
            <motion-div
              :animate="{ x: isHovered ? 5 : 0 }"
              :transition="{ duration: 200 }"
            >
              <ChevronRight class="ml-2 size-4" />
            </motion-div>
          </button>
        </div>
      </section>

      <section
        v-motion="{
          ...sectionMotion,
          transition: { duration: 500, delay: 700 },
        }"
        class="mb-12 sm:mb-16"
      >
        <h2 class="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          What Our Members Are Saying
        </h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(testimonial, index) in [
              { name: 'Sarah M.', text: 'This hub has been invaluable for my beekeeping journey. The resources are top-notch and always up-to-date.' },
              { name: 'John D.', text: 'I love the community forums. Its great to connect with other beekeepers and get advice on tricky situations.' },
              { name: 'Emma L.', text: 'The video library is fantastic. Being able to see techniques demonstrated has really improved my skills.' },
            ]"
            :key="index"
            class="rounded-lg bg-card p-6 shadow-sm"
          >
            <p class="mb-4 text-muted-foreground">
              {{ testimonial.text }}
            </p>
            <p class="font-semibold text-card-foreground">
              {{ testimonial.name }}
            </p>
          </div>
        </div>
      </section>

      <section
        v-motion="{
          ...sectionMotion,
          transition: { duration: 500, delay: 800 },
        }"
      >
        <h2 class="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          Ready to Elevate Your Beekeeping Skills?
        </h2>
        <p class="mx-auto mb-8 max-w-3xl text-center text-muted-foreground">
          Join thousands of satisfied beekeepers who have transformed their apiaries with our comprehensive resources. Start your free trial today and experience the difference that expert knowledge can make.
        </p>
        <div class="text-center">
          <button
            class="mx-auto flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
          >
            Start Your Free 7-Day Trial
            <motion-div
              :animate="{ x: isHovered ? 5 : 0 }"
              :transition="{ duration: 200 }"
            >
              <ChevronRight class="ml-2 size-4" />
            </motion-div>
          </button>
        </div>
      </section>

      <section
        v-motion="{
          ...sectionMotion,
          transition: { duration: 500, delay: 900 },
        }"
        class="mb-12 sm:mb-16"
      >
        <h2 class="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          How It Works
        </h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(step, index) in howItWorksSteps"
            :key="index"
            class="flex flex-col items-center text-center"
          >
            <div class="mb-4 rounded-full bg-primary p-4">
              <Icon :name="step.icon" class="size-8 text-primary-foreground" />
            </div>
            <h3 class="mb-2 text-lg font-semibold text-foreground">
              {{ step.title }}
            </h3>
            <p class="text-muted-foreground">
              {{ step.description }}
            </p>
          </div>
        </div>
      </section>

      <section
        v-motion="{
          ...sectionMotion,
          transition: { duration: 500, delay: 1000 },
        }"
        class="mb-12 sm:mb-16"
      >
        <h2 class="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          About Us
        </h2>
        <p class="mx-auto mb-8 max-w-3xl text-center text-muted-foreground">
          We're a team of passionate beekeepers, researchers, and educators dedicated to promoting sustainable beekeeping practices and supporting beekeepers worldwide.
        </p>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(member, index) in teamMembers"
            :key="index"
            class="flex flex-col items-center text-center"
          >
            <img :src="member.image" :alt="member.name" class="mb-4 size-32 rounded-full object-cover">
            <h3 class="mb-1 text-lg font-semibold text-foreground">
              {{ member.name }}
            </h3>
            <p class="mb-2 text-sm text-primary">
              {{ member.role }}
            </p>
            <p class="text-muted-foreground">
              {{ member.bio }}
            </p>
          </div>
        </div>
      </section>

      <section
        v-motion="{
          ...sectionMotion,
          transition: { duration: 500, delay: 1100 },
        }"
        class="mb-12 sm:mb-16"
      >
        <h2 class="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          Our Mission
        </h2>
        <p class="mx-auto mb-8 max-w-3xl text-center text-muted-foreground">
          At the Beekeeping Information Hub, our mission is to empower beekeepers worldwide with knowledge, tools, and community support. We strive to promote sustainable beekeeping practices, contribute to the preservation of bee populations, and foster a global network of informed and passionate beekeepers.
        </p>
        <div class="flex justify-center">
          <button class="rounded-md bg-primary px-6 py-3 text-lg text-primary-foreground transition-colors duration-200 hover:bg-primary/90">
            Learn More About Our Vision
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>
